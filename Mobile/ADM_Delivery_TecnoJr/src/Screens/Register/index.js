import React, { useState } from "react"

import { 
    KeyboardAvoidingView, 
    View, 
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    StatusBar 
} from "react-native"

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default function NewUser({ navigation }){

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errorRegister, setErrorRegister] = useState("")
    const [showPassword, setShowPassword] = useState(true) 
   
    const url = `https://auth-api-user.herokuapp.com/user/signup`
  
 
    const SignUp = () => {
      fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,       
            email: email,
            password: password,
        })
      }).then(res => res.json())
            .then(data => {
                if(data) {
                    navigation.replace("ProdutosCadastrados")
                }else{
                    alert('Parece que algo deu errado...')
                }
                          
            }).catch(err => {})
    }

    return(
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}

            style={styles.container}
        >
            <StatusBar backgroundColor="#2B3942" barStyle="ligth-content" />

            <FontAwesome name="users" size={80} color="#465363"/>

            <Text style={styles.textSignUp}>Criar Conta</Text>

            <TextInput
                style={styles.input}
                placeholder="nome"
                placeholderTextColor="#ffffff"
                type="text"
                onChangeText={(text) => setName(text)}
                value={name}
            />

            <TextInput
                style={styles.input}
                placeholder="e-mail"
                placeholderTextColor="#ffffff"
                type="text"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />

            <View style={{flexDirection: "row"}}>
                <TextInput            
                    style={styles.input}
                    secureTextEntry={showPassword ? true : false}         
                    placeholder="senha"
                    placeholderTextColor="#ffffff"
                    type="text"
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                />
                <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)} 
                    style={styles.showPassword}
                >                    
                    {showPassword ? 
                        <Feather
                            name="eye-off"
                            color="#ffffff"
                            size={25}
                        />
                        :
                        <Feather
                            name="eye"
                            color="#ffffff"
                            size={25}
                        />
                    }                            
                </TouchableOpacity>
            </View>

            <View style={{flexDirection: "row"}}>
                <TextInput            
                    style={styles.input}  
                    secureTextEntry={showPassword ? true : false}          
                    placeholder="confirmar senha"
                    placeholderTextColor="#ffffff"
                    type="text"
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword} 
                />
                
                <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)} 
                    style={styles.showPassword} 
                >
                    
                    {showPassword ? 
                        
                        <Feather
                            name="eye-off"
                            color="#ffffff"
                            size={25}
                        />
                        :
                        
                        <Feather
                            name="eye"
                            color="#ffffff"
                            size={25}
                        />
                    }                            
                </TouchableOpacity>
            </View>

            {errorRegister === true 
            ?
                
                <View style={styles.contentAlert}>
                    <MaterialCommunityIcons
                        name="alert-circle"
                        size={24}
                        color="#bdbdbd"
                    />
                    <Text style={styles.warningAlert}>emial ou senha inválidos</Text> 
                </View> 
            :
                <View/>     
            }
            
            {email === "" || password === "" || confirmPassword === "" || name === "" ||  password != confirmPassword
            ?
               
                <TouchableOpacity 
                    disabled={true}
                    style={styles.buttonRegister}
                >
                    <Text style={styles.textButtonRegister}>Registrar</Text>
                </TouchableOpacity>
            :
                
                <TouchableOpacity
                    style={styles.buttonRegister}
                    onPress={SignUp}
                >
                    <Text style={styles.textButtonRegister}>Registrar</Text>
                </TouchableOpacity>
            }
            
            <Text style={styles.login}>
                já é registrado ?
                <Text 
                    style={styles.linkLogin}
                    onPress={() => navigation.navigate("Login")}
                >
                    Logar...
                </Text>
            </Text>
            <View style={{height:0}}/> 
        </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2B3942',
        alignItems: 'center',
        justifyContent: 'flex-start',        
        paddingTop: Platform.OS == "ios"? 0 : 20,
    },
    input: {
        width: "90%",
        marginTop:10,
        padding:10,
        height:50,
        borderBottomWidth: 1,
        backgroundColor: "#465363",
        borderRadius: 10,
        borderBottomColor:"#ff6f00",
        marginLeft:"auto",
        marginRight:"auto",
        color: "#ffffffff",
    },
    buttonRegister: {
        width: "90%", 
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#ff6f00",
        borderRadius: 50,
        marginTop: 30
    },
    textButtonRegister: {
        color: "#ffffff",
        fontSize: 15
    },
    contentAlert: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    warningAlert: {
        paddingLeft: 10,
        color: "#bdbdbd",
        fontSize: 16,
    },
    login: {
        marginTop: 20,
        color: "#ff6f00"
    },
    linkLogin: {
        color: "#ffffff",
        fontSize: 16
    },
    showPassword: {
        position: "absolute",
        marginLeft: "80%",
        marginTop: 20
    },
    textSignUp: {
        fontSize: 20, 
        color: "#ffffff"
    }
});