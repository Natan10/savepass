import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import { Home } from '../screens/Home'
import { RegisterSecret } from '../screens/RegisterSecret'

export const AppRoutes = () => {
  return(
    <Navigator screenOptions={{headerShown: false}}>
      <Screen 
        name='Home' 
        component={Home}
      />
      <Screen 
        name='RegisterSavePass' 
        component={RegisterSecret}
      />
    </Navigator>
  )
}


/*
  @react-navigation/native
  @react-navigation/stack
  react-native-screens
  react-native-safe-area-context
  react-native-gesture-handler
*/