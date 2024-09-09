import { Pressable, View, Text } from 'react-native';
import { db } from '../../firebaseConnection'
import { doc, setDoc } from "firebase/firestore";

import { useRoute, useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';

export default function PutAgenda() {

  const { params: rota } = useRoute()
  const navigation = useNavigation()

  const [dirigente, setDirigente] = useState('')
  const [pregador, setPregador] = useState('')
  const [eventos, setEventos] = useState([])

  useEffect(() => {

    setDirigente(rota?.dirigente)
    setPregador(rota?.pregador)

  },[rota])

  // Inicializando o Firestore

  // Função para enviar dados para uma coleção específica
  async function enviarDadosParaColecao(dados) {
    
    try {
      const docRef = doc(db, "agenda", rota?.dia.toString());

      await setDoc(docRef, dados);
      navigation.goBack()

      console.log("Dados enviados com sucesso!");
    } catch (e) {
      console.error("Erro ao enviar dados: ", e);
    }
  }


  return (
    <View>

      <TextInput onChangeText={setDirigente} value={dirigente} />
      <TextInput onChangeText={setPregador} value={pregador} />

      <Pressable onPress={() => enviarDadosParaColecao({
        dirigente,
        pregador,
        eventos: [],
      })} style={{ height:60, justifyContent:"center", alignItems:"center", borderRadius:12}}>
        <Text>Salvar</Text>
      </Pressable>

    </View>
  );
}