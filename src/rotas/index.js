import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeStack from './stacks';
import { Dimensions } from 'react-native';

const Drawer = createDrawerNavigator()

export default function Routes() {

  const { width } = Dimensions.get('window')


  return (
    <Drawer.Navigator initialRouteName='HomeScreen'
    screenOptions={{
      headerShown: false,
      unmountOnBlur: true,
      drawerType: 'slide',
      drawerStyle: {
        width: width - 80,

      }
    }}>
      <Drawer.Screen name='HomeScreen' component={HomeStack} />
    </Drawer.Navigator>

  )
}