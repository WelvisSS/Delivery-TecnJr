import React from 'react'
import { TouchableOpacity, View, Text, Image } from 'react-native'

const HorizontalFoodCar = ({containerStyle, imageStyle, item, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={containerStyle}
        >
            <Image source={{ uri: item.imageURL }} style={imageStyle} /> 
            <View style={{ flex: 1 }}>
                <Text style={{fontFamily: "Poppins-SemiBold", fontSize: 17, lineHeight: 22}}>
                    {item.nameProduct}
                </Text>
                <Text style={{color: "#757D85", fontFamily: "Poppins-Regular", fontSize: 14, lineHeight: 22}}>
                    {item.description}
                </Text>
                <Text style={{marginTop: 8, fontFamily: "Poppins-Bold", fontSize: 22, lineHeight: 30}}>
                {Number.isInteger(item.value) == true ? `R$ ${item.value}.00` : `R$ ${item.value}`}
                </Text>            
            </View>
            
        </TouchableOpacity>
    )
}

export default HorizontalFoodCar