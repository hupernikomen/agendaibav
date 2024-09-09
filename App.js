import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Rotas from './src/rotas';

function App() {
  return (
    <NavigationContainer>
      <Rotas />
    </NavigationContainer>
  )
}

export default App