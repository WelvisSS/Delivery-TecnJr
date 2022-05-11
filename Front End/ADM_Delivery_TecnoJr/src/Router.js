import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Splash from './Screens/Splash';
import Login from './Screens/Logar';
import Registrar from './Screens/Register'
import Reset from './Screens/ResetPassword'
import ListOrders from './Screens/ADM/listOrders' 
import UpdateOrder from './Screens/ADM/updateOder/index'
import NewProduct from './Screens/ADM/newProduct/index'
import ProdutosCadastrados from './Screens/ADM/produtosCadastrados/index'

const Stack = createNativeStackNavigator();

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="ListOrders" component={ListOrders} /> 
        <Stack.Screen name="ProdutosCadastrados" component={ProdutosCadastrados} />  
        <Stack.Screen name="NewProduct" component={NewProduct} />      
        <Stack.Screen name="UpdateOrder" component={UpdateOrder} />
        <Stack.Screen name="Login" component={Login} />       
        <Stack.Screen name="Reset" component={Reset} />
        <Stack.Screen name="Registrar" component={Registrar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};