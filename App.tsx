import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen  from './src/screens/HomeScreen';
import RestaurantScreen from './src/screens/RestaurantScreen';
import OrderDeliveryScreen from './src/screens/OrderDeliveryScreen';
import Tabs from './src/navigation/Tabs';

const Stack = createStackNavigator();



const App = () => {
  return (
    <NavigationContainer>{/* Rest of your app code */}
        <Stack.Navigator
            screenOptions={{
                 headerShown: false
            }}
            initialRouteName={"HomeScreen"}
        >
            <Stack.Screen name="HomeScreen" component={Tabs} />
            <Stack.Screen name="RestaurantScreen" component={RestaurantScreen} />
            <Stack.Screen name="OrderDeliveryScreen" component={OrderDeliveryScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
