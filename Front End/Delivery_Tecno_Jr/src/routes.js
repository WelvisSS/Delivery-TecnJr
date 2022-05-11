import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './Screens/Home/index'
import Login from './Screens/Logar/index';
import Splash from './Screens/Splash/index'; 
import MyOders from './Screens/MyOrders/index'
import Registrar from './Screens/Register/index'
import NovoPedido from './Screens/novoPedido/index'
import ResetPassword from './Screens/ResetPassword/index'

const Stack = createNativeStackNavigator();

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />     
        <Stack.Screen name="Home" component={Home} />     
        <Stack.Screen name="MyOders" component={MyOders} />
        <Stack.Screen name="NovoPedido" component={NovoPedido} />
        <Stack.Screen name="Reset" component={ResetPassword} />
        <Stack.Screen name="Registrar" component={Registrar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};