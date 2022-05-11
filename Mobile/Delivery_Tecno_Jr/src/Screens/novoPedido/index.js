import React from 'react';
import { View, StatusBar, Image, Text, TextInput, TouchableOpacity,
    StyleSheet
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation, route }) {

    const item = route.params[0]
    
    const [idUser, setIdUser] = React.useState(undefined)
    const [theAmount, setTheAmount] = React.useState(1)
    const [status, setStatus] = React.useState('Pendente')
    const [formaPagamento, setFormaPagamento] = React.useState('')
    const [localEntrega, setLocalEntrega] = React.useState('')

    const URL = 'https://auth-api-user.herokuapp.com/order/newOrder'

    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('@storage_Key')
          if(value !== null) {
            setIdUser(`${value}`) 
          }else{
            setIdUser(`Vazio`)
          }
        } catch(e) {}
    }
    getData()



    const newOrder = () => {
        
        if (formaPagamento === '' || localEntrega === ''){

        }else{
            
            fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({            
                idUser: idUser,
                nameOrder: item.nameProduct,
                theAmount: theAmount,
                subtotal: (theAmount*Number(item.value)).toFixed(2),
                status: status,
                address: localEntrega,
                payment: formaPagamento,
                description: item.description,
                url: item.imageURL
            })
            }).then(res => res.json())
                .then(data => {      
                    navigation.replace("MyOders")              
                }).catch(err => {
                    console.log("error", err);
                })
        }
    }

    return (
        <View style={{backgroundColor: "#ff6f00", flex: 1}}>
            <StatusBar backgroundColor="#ff6f00" barStyle="ligth-content" />
            <View
                style={styles.container}
            >
                <View style={styles.dadosProd}>
                    <Image
                        source={{ uri: item.imageURL }}
                        style={{ marginTop: 20, height: 110, width: 110}}
                    />

                    <View style={{ flex: 1 }}>
                        <Text style={{fontFamily: "Poppins-SemiBold", fontSize: 17, lineHeight: 22}}>
                            {item.nameProduct}
                        </Text>
                        <Text style={{color: "#757D85", fontFamily: "Poppins-Regular", fontSize: 14, 
                        lineHeight: 22}}>
                            {item.description}
                        </Text>
                        <Text style={{marginTop: 8, fontFamily: "Poppins-Bold", fontSize: 22, 
                        lineHeight: 30}}>
                            {Number.isInteger(item.value) == true ? `R$ ${item.value}.00` : `R$ ${item.value}`}
                        </Text>
                
                    </View>
                </View>
                <View 
                    style={styles.containerIntern}
                >
                    <View style={{marginTop: "35%"}}/> 
                    <TextInput
                        style={styles.input}
                        placeholder="Quantidade"
                        keyboardType="numeric"
                        placeholderTextColor="#ffffff"
                        onChangeText={(text) => setTheAmount(Number(text))}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Forma de pagamaneto"
                        placeholderTextColor="#ffffff"
                        onChangeText={(text) => setFormaPagamento(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="local de entrega"
                        placeholderTextColor="#ffffff"
                        onChangeText={(text) => setLocalEntrega(text)}
                    />
                    <TouchableOpacity onPress={newOrder} style={styles.botton}> 
                        <Text style={styles.textBotton}>PEDIR</Text>
                    </TouchableOpacity>
                </View>
            
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        marginTop: 10,
        alignItems: 'center', 
        backgroundColor: '#ffffff',
        height: '95%',
        marginHorizontal: 24,
    },
    containerIntern: {
        marginTop: 50, 
        width: '99%', 
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dadosProd: {
        flexDirection: 'row',
        borderRadius: 12,
        width: '90%',
        height: '20%',
        alignItems: 'center',
        marginHorizontal: 24,
        marginBotton: 12,
        marginTop: 10
    },
    input: {
        width: "90%",
        marginTop:10,
        padding:10,
        height:40,
        borderRadius: 10,
        backgroundColor: "#bdbdbd",
        borderBottomWidth: 1,
        borderBottomColor:"#ff6f00",
        marginLeft:"auto",
        marginRight:"auto",
        color: "#fff"
    }, 
    botton: {
        backgroundColor: '#ff6f00', 
        height: 40, 
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 200
    },
    textBotton: {
        color: '#ffffff', 
        fontWeight: 'bold', 
        fontSize: 18
    }
});