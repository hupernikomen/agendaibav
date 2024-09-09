import { useState, useEffect } from 'react';
import { View, Text, FlatList, Dimensions, Pressable } from 'react-native';

import { useNavigation, useIsFocused } from '@react-navigation/native';

import { db } from '../../firebaseConnection'
import { collection, getDocs } from "firebase/firestore";

import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';

export default function Agenda() {

  const focus = useIsFocused()
  const navigation = useNavigation()

  const { width, height } = Dimensions.get("window")
  const [dias, setDias] = useState([])

  useEffect(() => {
    PegaDados()
  }, [focus])


  const Gerar = async () => {

    const options = {
      html: htmlDoc,
      fileName: 'CALENDARIO_IBAV_',
      height: 300
    };

    const file = await RNHTMLtoPDF.convert(options);
    const shareOptions = {
      message: 'Compartilhar PDF',
      url: `file://${file.filePath}`,
      subject: 'PDF gerado',
    };

    try {
      await Share.open(shareOptions);
    } catch (error) {
      if (error.code === 'E_SHARE_CANCELLED') {
        console.log('Usuário cancelou o compartilhamento');
      } else {
        console.log('Erro ao compartilhar PDF:', error);
      }
    }
  };

  const htmlDoc = `
  <table style="width: 100%; border-collapse: collapse;">
    <tr>
      <th style="width: 14.28%; text-align: center; border: 1px solid #ddd;">DOM</th>
      <th style="width: 14.28%; text-align: center; border: 1px solid #ddd;">SEG</th>
      <th style="width: 14.28%; text-align: center; border: 1px solid #ddd;">TER</th>
      <th style="width: 14.28%; text-align: center; border: 1px solid #ddd;">QUA</th>
      <th style="width: 14.28%; text-align: center; border: 1px solid #ddd;">QUI</th>
      <th style="width: 14.28%; text-align: center; border: 1px solid #ddd;">SEX</th>
      <th style="width: 14.28%; text-align: center; border: 1px solid #ddd;">SAB</th>
    </tr>
    
    ${dias.map((item, index) => {
      return `
        <tr>
          <td style="width: 14.28%; text-align: center; border: 1px solid #ddd; ${item ? '' : 'background-color: #f3f3f3'}">
            ${item ? item.dia : ''}
            ${item ? `<br><small>${item?.dirigente}</small><br><small>${item?.pregador}</small>` : ''}
          </td>
          ${index < 6 ? '</tr><tr>' : ''}
        </tr>
      `;
    }).join('')}
  </table>
`;


  async function PegaDados() {
    try {
      const collectionRef = collection(db, "agenda");

      const querySnapshot = await getDocs(collectionRef);

      const itens = [];

      querySnapshot.forEach((doc) => {
        itens.push({ id: doc.id, ...doc.data() });
      });


      MontaCalendario(5, 2024, itens)

    } catch (e) {
      console.error("Erro ao recuperar itens cadastrados:", e);
    }
  }





  function MontaCalendario(month, year, lista) {
    month -= 1; // Subtrair 1 do mês para que ele seja zero-based
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const days = [];
    const dayNames = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dia = lista?.find(item => item?.id === String(i));
      const dayOfWeek = dayNames[new Date(year, month, i).getDay()];
      days.push({ dia: i, ...dia, dayOfWeek });
    }

    console.log(days);

    setDias(days);
  }

  const paddding = 6

  return (
    <View>

      <FlatList
        contentContainerStyle={{ padding: paddding }}
        ListHeaderComponent={
          <View style={{ flexDirection: 'row', width: width, paddingVertical: 14 }}>
            <Text style={{ fontSize: 12, width: (width - paddding * 2) / 7, textAlign: 'center', color: '#cc3300' }}>DOM</Text>
            <Text style={{ fontSize: 12, width: (width - paddding * 2) / 7, textAlign: 'center' }}>SEG</Text>
            <Text style={{ fontSize: 12, width: (width - paddding * 2) / 7, textAlign: 'center' }}>TER</Text>
            <Text style={{ fontSize: 12, width: (width - paddding * 2) / 7, textAlign: 'center' }}>QUA</Text>
            <Text style={{ fontSize: 12, width: (width - paddding * 2) / 7, textAlign: 'center' }}>QUI</Text>
            <Text style={{ fontSize: 12, width: (width - paddding * 2) / 7, textAlign: 'center' }}>SEX</Text>
            <Text style={{ fontSize: 12, width: (width - paddding * 2) / 7, textAlign: 'center' }}>SAB</Text>
          </View>
        }
        numColumns={7}
        data={dias}
        renderItem={({ item }) => {
          return (

            <Pressable disabled={!item} onPress={() => navigation.navigate('PutAgenda', item)}
              style={{ width: (width - paddding * 2) / 7, height: 85, justifyContent: "center", alignItems: "center", borderWidth: .5, borderColor: !item ? '#f3f3f3': '#ddd', padding: 4 }}>
              <Text style={{ fontSize: 12 }}>{item?.dia}</Text>
              <View style={{ alignSelf: "flex-start", flex: 1, marginTop: 6 }}>

                <Text numberOfLines={1} style={{ fontSize: 8 }}>{item?.dirigente}</Text>
                <Text numberOfLines={1} style={{ fontSize: 8 }}>{item?.pregador}</Text>
              </View>
            </Pressable>
          )
        }}
      />

      <Pressable onPress={() => Gerar()} style={{ height:60, justifyContent:"center", alignItems:"center", borderRadius:12}}>
        <Text>Gerar</Text>
      </Pressable>
    </View>
  );
}