import React from 'react';
import { View, StatusBar, Text, TextInput, TouchableOpacity, StyleSheet
} from 'react-native';

export default function Login({ navigation }) {
    
    const [nameProduct, setNameProduct] = React.useState('')
    const [value, setValue] = React.useState(Number)
    const [description, setDescription] = React.useState('')
    const [imageURL, setImageURL] = React.useState('')
    const [available, setAvailable] = React.useState(true)

    const url = 'https://auth-api-user.herokuapp.com/product/newProduct'

    const newProduct = () => {

        if (nameProduct == '' || description == '' || imageURL === '' || value == 0) {
            alert("Ops algum campo está vazio!")
        } else {
            fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({     
                nameProduct: nameProduct,
                value: value,
                description: description,
                imageURL: imageURL,
                available: available,
            })
            }).then(res => res.json())
                .then(data => {
                    navigation.navigate("ProdutosCadastrados")
                }).catch(err => {
                    console.log("error", err);
                })
        }
    }

    function input(name, typeInput, func) {
        return (
            <TextInput
                style={styles.input}
                placeholder={name}
                type={typeInput}
                placeholderTextColor="#ffffff"
                onChangeText={func}
            />
        )
    }

    return (
        <View style={{backgroundColor: "#ff6f00", flex: 1}}>
            <StatusBar backgroundColor="#ff6f00" barStyle="ligth-content" />
            <View style={{ alignItems: 'center'}}>                
                <Text style={styles.titlePage}>CADASTRAR PRODUTO</Text>          
            </View>
            <View style={styles.containerIntern}>
                {input("NOME", "text", (text) => setNameProduct(text))}
                {input("VALOR", "number", (number) => setValue(Number(number)))}
                {input("DESCRIÇÃO", "text",  (text) => setDescription(text))}
                {input("URL IMAGEM", "text", (text) => setImageURL(text))}
                <TouchableOpacity onPress={newProduct} style={styles.botton}>
                    <Text style={{color: '#ffffff'}}>CADASTRAR</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 40,
      alignItems: "center"
    },
     botton: {
        backgroundColor: '#ff6f00', 
        height: 40, 
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: '95%'
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
     containerIntern: {
        borderRadius: 12,
        marginTop: 10,
        alignItems: 'center', 
        backgroundColor: '#ffffff',
        height: '90%',
        marginHorizontal: 24
     }, 
     titlePage: {
        color: '#ffffff', 
        fontFamily: "Poppins-Bold", 
        fontSize: 20,
        marginTop: 10
     }
  });