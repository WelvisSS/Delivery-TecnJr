import React from 'react'
import { View, Text, Image, ImageComponent } from 'react-native'

const HorizontalFoodCar = ({containerStyle, imageStyle, item}) => {
    
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
        <View style={containerStyle} >
            <Image source={{ uri: item.url }} style={imageStyle} /> 
            <View style={{ flex: 1 }}>
                <Text style={{fontFamily: "Poppins-SemiBold", fontSize: 17, lineHeight: 22}}>
                    {item.nameOrder}
                </Text>
                <Text style={{color: status, fontFamily: "Poppins-Regular", fontSize: 14, lineHeight: 22}}>
                    {item.status}
                </Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <Text style={{marginTop: 8, fontFamily: "Poppins-Bold", fontSize: 22, lineHeight: 30}}>
                        {Number.isInteger(item.subtotal) == true ? `R$ ${item.subtotal}.00` : `R$ ${item.subtotal}`}
                    </Text>
                    <Text style={{marginTop: 8, fontFamily: "Poppins-Bold", fontSize: 22, lineHeight: 30, color: "#0064C0"}}>
                        {`${item.theAmount}`}
                    </Text>
                </View>
            
            </View>
            
        </View>
    )
}

export default HorizontalFoodCar;