import React from 'react'
import { TouchableOpacity, View, Text, Image, Alert } from 'react-native'

import FontAwesome from 'react-native-vector-icons/FontAwesome'

const HorizontalFoodCar = ({containerStyle, imageStyle, item }) => {

    const [id, setId] = React.useState(item._id)
    const url = 'https://auth-api-user.herokuapp.com/product/deleteProduct'

    const deletProduct = () => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({            
                id: id
            })
          }).then(res => res.json())
            .then(data => {

            }).catch(err => {
              console.log("error", err);
            })
    }
    
    function handleDeletePress(){ 
        Alert.alert(
            "Atenção",
            "Você tem certeza que deseja excluir este item?",
            [
                { text: "Não", style: "cancel" },
                { text: "Sim", onPress: () => deletProduct() }
            ],
            { cancelable: false }
        );

    }


    return (
        <View style={containerStyle} >
            <Image source={{ uri: item.imageURL }} style={imageStyle} /> 
            <View style={{ flex: 1 }}>
                <Text style={{fontFamily: "Poppins-SemiBold", fontSize: 17, lineHeight: 22, color: "#000"}}>
                    {item.nameProduct}
                </Text>
                <Text style={{color: "#757D85", fontFamily: "Poppins-Regular", fontSize: 14, lineHeight: 22}}>
                    {item.description}
                </Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: 20}}>
                    
                    <Text style={{marginTop: 8, fontFamily: "Poppins-Bold", fontSize: 22, lineHeight: 30, color: "#000" }}>
                        {Number.isInteger(item.value) == true ? `R$ ${item.value}.00` : `R$ ${item.value}`}
                    </Text> 
                    <TouchableOpacity
                        onPress={handleDeletePress}
                    >
                        <FontAwesome name="trash" size={30} color="#000"/>
                    </TouchableOpacity>
                </View>                              
            
            </View>
            
        </View>
    )
}

export default HorizontalFoodCar
