import React from 'react';
import { View, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from './loading'

export default function Splash ({ navigation }){

    const getData = async () => {

        try {

          const value = await AsyncStorage.getItem('@storage_Key')

          if(value !== null) {            
            navigation.replace('ProdutosCadastrados')
          }else {
            navigation.replace('Login')
          }

        } catch(e) { }
        
    }

    setTimeout(function(){         
        getData()
    }, 3000);

    return (                
        <View 
            style={{
              backgroundColor: '#ff6f00', 
              flex: 1, 
              alignItems: 'center', 
              justifyContent: 'center'
            }}
        >
          <StatusBar backgroundColor="#ff6f00" barStyle="ligth-content" />
          
          <Loading/>
        </View>
    );
}