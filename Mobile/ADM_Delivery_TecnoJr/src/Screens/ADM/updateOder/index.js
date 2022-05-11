import React from 'react';
import { View, StatusBar, Image, Text, TextInput, TouchableOpacity, StyleSheet
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default function Login({ navigation, route }) {

    const order = route.params[0]
    const [status, setStatus] = React.useState('')
    const [idOrder, setIdOrder] = React.useState(order._id)

    const urlUpdate = 'https://auth-api-user.herokuapp.com/order/updateStatusOrder'

    const urlDelete = 'https://auth-api-user.herokuapp.com/order/finishOrder'


    const updateStatus = () => {
        if (status == '') alert("Adicione um Status!")
        else {
        fetch(urlUpdate, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({            
                id: idOrder,
                status: status
            })
        }).then(res => res.json())
            .then(data => {
                navigation.navigate("ListOrders")
                
            }).catch(err => {
                console.log("error", err);
            })
        }
    }

    const deleteOrder = () => {
        fetch(urlDelete, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({            
                id: idOrder,
            })
        }).then(res => res.json())
            .then(data => {
                navigation.navigate("ListOrders")
            }).catch(err => {
                console.log("error", err);
            })
    }

    function botton(name, color, func) {
        return (
            <TouchableOpacity 
                onPress={func}
                style={[{backgroundColor: color}, styles.botton]}
            >
                <Text style={{color: '#ffffff'}}>{name}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{backgroundColor: "#ff6f00", flex: 1}}>
            <StatusBar backgroundColor="#ff6f00" barStyle="ligth-content" />
            <View style={{alignItems: 'center'}}>                
                <Text style={styles.titlePage}>ATUALIZAR PEDIDO</Text>
            </View>
            <View style={styles.containerPrincipal}>
                <View style={styles.containerInterno}>
                    <Image source={{ uri: order.url }} style={styles.image}/>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.nameOrder}>{order.nameOrder}</Text>
                        <Text style={styles.order}>{order.description}</Text>
                        <Text style={styles.total}>
                            Total {Number.isInteger(order.subtotal) == true ? `R$ ${order.subtotal}.00` : `R$ ${order.subtotal}`}
                        </Text>                
                    </View>
                </View>

                <View style={styles.containerAdress}>
                    <FontAwesome name="map-marker" size={20} color="#000" />
                    <Text style={styles.address}>{order.address}</Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="STATUS"
                    placeholderTextColor="#ffffff"
                    onChangeText={(text) => setStatus(text)}
                    value={status}
                />

                <View style={{marginTop: "35%"}}></View>
                {botton('ATUALIZAR', 'green', updateStatus)}
                {botton('CANCELAR', 'blue', () => navigation.navigate("ListOrders"))}
                {botton('FINALIZAR', 'red', deleteOrder)}

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    titlePage: {
        color: '#ffffff', 
        fontFamily: "Poppins-Bold", 
        fontSize: 20
    },
    containerPrincipal: {
        borderRadius: 12,
        marginTop: 10,
        alignItems: 'center', 
        backgroundColor: '#ffffff',
        height: '90%',
        marginHorizontal: 24, 
    },
    containerInterno: {
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
    image: {
        marginTop: 20,
        height: 110,
        width: 110
    },
    containerAdress: {
        flexDirection: 'row', 
        marginTop: 10, 
        alignItems:'center', 
        justifyContent: 'center'
    },
    address: {
        fontSize: 20, 
        marginLeft: 10, 
        color: '#000'
    }, 
    total: {
        marginTop: 8, 
        fontFamily: "Poppins-Bold", 
        fontSize: 22, 
        lineHeight: 30, 
        color: "#000"
    },
    order: {
        color: "#757D85", 
        fontFamily: "Poppins-Regular", 
        fontSize: 14, 
        lineHeight: 22
    },
    nameOrder: {
         fontFamily: "Poppins-SemiBold", 
         fontSize: 17, 
         lineHeight: 22, 
         color: '#000'
    },
    botton: {
        height: 40, 
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 20
    }
  });