import React from 'react';
import { FlatList, View, StatusBar, Text, StyleSheet } from 'react-native';
import HorizontalFoodCar from './horizontalFoodCard'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {    

    const [orders, setOrders] = React.useState([])
    const [idUser, setIdUser] = React.useState([])

    const url = 'https://auth-api-user.herokuapp.com/order/myOrder'
    

    const getData = async () => {
        try {

          const value = await AsyncStorage.getItem('@storage_Key')
          if(value !== null) {
            setIdUser(`${value}`)      
            
          }else{
            setIdUser(`0`)
          }
        } catch(e) { }
    }

    getData()

    const listOders = () => {
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({            
              idUser: idUser
          })
        }).then(res => res.json())
            .then(order => {
                setOrders(order.orders)
            }).catch(err => {
                console.log("error", err);
            })
    }
    
    React.useEffect(() => {
        listOders()
    }, [])      

    return (
        <View style={{backgroundColor: "#ff6f00", flex: 1}}>
            <StatusBar backgroundColor="#ff6f00" barStyle="ligth-content" />
            <View style={{alignItems: 'center'}}>
                <Text style={{color: '#ffffff', fontSize: 30}}>MEUS PEDIDOS</Text>
            </View>
            <FlatList
                data={orders}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => {
                    return (
                        <HorizontalFoodCar
                            containerStyle={styles.containerOrder}
                            imageStyle={styles.imageContainerOrder}
                            item={item}
                        />
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    containerOrder: {
        height: 130,
        alignItems: 'center',
        marginHorizontal: 24,
        marginBotton: 12,
        marginTop: 10,
        flexDirection: 'row',
        borderRadius: 12,
        backgroundColor: '#F5F5F8',
    },
    imageContainerOrder: {
        marginTop: 20,
        height: 110,
        width: 110
    }
});