import React from 'react'
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default function HorizontalFoodCar({ item, onPress }){

    const [status, setStatus] = React.useState("white")

    const colorStatus = () => {
        if (item.status === 'Pendente') setStatus("red")
        else if (item.status === 'Preparando') setStatus("blue")
        else setStatus("green")
    }

    React.useEffect(() => {
        colorStatus()
    })

    return (
        <TouchableOpacity onPress={onPress} style={styles.containerOpacity}>
            <Image source={{ uri: item.url }} style={styles.image}/>
            <View style={{ flex: 1 }}>
                <View style={styles.lineOneContainer}>
                    <View style={styles.containerTwo}>
                        <Text style={styles.qtd}>{item.theAmount}</Text>
                        <Text style={styles.nameOrder}>{item.nameOrder}</Text>
                    </View>
                    <Text style={[styles.status, {color: status}]}>{item.status}</Text>
                </View>
                <Text style={styles.description}>{item.description}</Text>
                <View style={styles.containerLineTree}>
                    <Text style={styles.total}>
                        Total {Number.isInteger(item.subtotal) == true ? `R$ ${item.subtotal}.00` : `R$ ${item.subtotal}`}
                    </Text> 
                    <FontAwesome name="map-marker" size={20} color="#000" />                 
                </View>            
            </View>            
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    containerOpacity: {
        flexDirection: 'row',
        borderRadius: 12,
        backgroundColor: '#F5F5F8',
        height: 130,
        alignItems: 'center',
        marginHorizontal: 24,
        marginBotton: 12,
        marginTop: 10
    },
    image: {
        marginTop: 20, 
        height: 100, 
        width: 100
    },
    lineOneContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between'
    },
    containerTwo: {
        flexDirection: 'row', 
        alignItems: 'center'
    },
    qtd: {
        fontFamily: "Poppins-SemiBold", 
        fontSize: 17, 
        margin: 3, 
        color: 'red'
    }, 
    nameOrder: {
        fontFamily: 'Bold', 
        fontSize: 17, 
        color: '#000'
    },
    status: {
        fontFamily: "Poppins-SemiBold", 
        fontSize: 15, 
        margin: 10
    },
    description: {
        color: "#757D85", 
        fontFamily: "Poppins-Regular", 
        fontSize: 14, 
        lineHeight: 22
    },
    containerLineTree: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        width: '90%'
    },
    total: {
        marginTop: 8, 
        fontFamily: "Bold", 
        fontSize: 17, 
        lineHeight: 30, 
        color: '#000'
    }
  });
