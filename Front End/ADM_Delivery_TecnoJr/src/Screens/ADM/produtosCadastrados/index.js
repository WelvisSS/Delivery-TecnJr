import React from 'react';
import { 
    FlatList, 
    View, 
    StatusBar, 
    TouchableOpacity, 
    Text, 
    StyleSheet
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import HorizontalFoodCar from './horizontalFoodCard'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
    
    const [product, setProduct] = React.useState([])

    const url = 'https://auth-api-user.herokuapp.com/product/listProducts'

    const removeValue = async () => {
        try {
          await AsyncStorage.removeItem('@storage_Key')
        } catch(e) {}
    }

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
    
    const menu = () => {
        return (
            <View style={styles.containerMenu} >
                <TouchableOpacity 
                    style={{marginHorizontal: '10%'}}             
                    onPress={() => navigation.navigate("ListOrders")}
                >
                    <FontAwesome name="motorcycle" size={30} color="#000"/> 
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{marginHorizontal: '10%'}}             
                    onPress={() => navigation.navigate("NewProduct")}
                >
                    <FontAwesome name='plus-square' size={30} color="#000"/>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{marginHorizontal: '10%'}}            
                    onPress={() => {
                        navigation.replace("Login")
                        removeValue()
                    }}
                >
                    <FontAwesome name="power-off" size={30} color="#000"/>
                </TouchableOpacity>

            </View>
        )
    }

    return (
        <View style={{backgroundColor: "#ff6f00", flex: 1}}>
            <StatusBar backgroundColor="#ff6f00" barStyle="ligth-content" />
            <View style={{ alignItems: 'center' }}>
                <Text style={{ color: '#ffffff', fontFamily: "Poppins-Bold", fontSize: 20
                }}>PRODUTOS CADASTRADOS</Text> 
          
            </View>
            <FlatList
                data={product}
                keyExtractor={(item) => `${item._id}`}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => {
                    return (
                        <HorizontalFoodCar
                            containerStyle={styles.containerProduct}
                            imageStyle={styles.image}
                            item={item}
                        />
                    )
                }}
            />
            <View style={{alignItems: 'center', marginTop: 5}}>
                {menu()}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    containerMenu: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: "#fff",
        width: '100%'
    },
    image: {
        marginTop: 20,
        height: 110,
        width: 110
    }, 
    containerProduct: {
        flexDirection: 'row',
        borderRadius: 12,
        backgroundColor: '#F5F5F8',
        height: 130,
        alignItems: 'center',
        marginHorizontal: 24,
        marginBotton: 12,
        marginTop: 10
    }
  });
