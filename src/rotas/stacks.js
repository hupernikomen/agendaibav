const Stack = createNativeStackNavigator()

import Agenda from '../paginas/agenda';
import PutAgenda from '../paginas/putAgenda';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function RotasStack() {
  return (
    <Stack.Navigator
    initialRouteName={'Agenda'}
    screenOptions={{
        orientation: 'portrait',
        headerTitleStyle: { fontSize: 18, fontFamily: 'Roboto-Medium' },
        headerShown: false,
    }}>
      <Stack.Screen name='Agenda' component={Agenda} />
      <Stack.Screen name='PutAgenda' component={PutAgenda} />
    </Stack.Navigator>
  )
}