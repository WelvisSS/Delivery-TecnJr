import React from 'react';
import { FlatList, View, StatusBar, Text} from 'react-native';
import HorizontalFoodCar from './horizontalFoodCard'

export default function Login({ navigation }) {

    const [product, setProduct] = React.useState([])
    const url = 'https://auth-api-user.herokuapp.com/order/allOrders'

    const ListProducts = () => {
        fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
            .then(listProducts => {
                setProduct(listProducts)                
            }).catch(err => {
                console.log("error", err);
            })
    }
    React.useEffect(() => {
        ListProducts()
    })   

    return (
        <View style={{backgroundColor: "#ff6f00", flex: 1}}>
            <StatusBar backgroundColor="#ff6f00" barStyle="ligth-content" />
            <View style={{alignItems: 'center'}}>
                <Text style={{color: '#ffffff', fontFamily: "Poppins-Bold", fontSize: 20}}>
                    MINHAS ENTRGAS
                </Text>          
            </View>
            <FlatList
                data={product}
                keyExtractor={(item) => `${item._id}`}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => {
                    return (
                        <HorizontalFoodCar
                            item={item}
                            onPress={() => navigation.navigate("UpdateOrder", [item])}
                        />
                    )
                }}
            />
        </View>
    )
}