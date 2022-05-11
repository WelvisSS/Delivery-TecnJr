import React from 'react';

import { 
    StyleSheet, 
    StatusBar, 
    TouchableOpacity, 
    KeyboardAvoidingView, 
    TextInput,
    Text, 
    View, 
} from 'react-native';

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from './loadingLogin'

export default function Login({ navigation }) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorLogin, setErrorLogin] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(true);
    const [animatedLoading, setAnimatedLoading] = React.useState(false);

    const url = `https://auth-api-user.herokuapp.com/user/login`

    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('@storage_Key', value)
        } catch (e) {
            console.log(e)
        }
    }

    const SignIn = () => {
      fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({            
            email: email,
            password: password,
        })
      }).then(res => res.json())
        .then(data => {            
            if(data.token != undefined){ 
                storeData(data.user._id)
                setErrorLogin(false)
                setAnimatedLoading(false)     
                navigation.replace("Home", [data])
                
            }else{
                setErrorLogin(true)
                setAnimatedLoading(false)
            }
            
        }).catch(err => {
            setErrorLogin(true)
        })
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <StatusBar backgroundColor="#2B3942" barStyle="ligth-content" />
            <FontAwesome name="user-circle-o" size={100} color="#ff6f00" />
            <Text style={styles.textSignIn}>Entrar</Text>
            <TextInput
                style={styles.input}
                placeholder="e-mail"
                type="text"
                placeholderTextColor="#ffffff"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <View style={{flexDirection: "row"}}>
                <TextInput            
                    style={styles.input}
                    secureTextEntry={showPassword ? true : false}       
                    placeholder="senha"
                    type="number"
                    placeholderTextColor="#ffffff"
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
            {errorLogin === true 
                ?
                <View style={styles.contentAlert}>
                    <MaterialCommunityIcons
                        name="alert-circle"
                        size={24}
                        color="#bdbdbd"
                    />
                    <Text style={styles.warningAlert}>Senha ou email inválido</Text>
                </View> 
                :
                <View/>     
            }
            {email === "" || password === ""
            ?
                <TouchableOpacity 
                    disabled={true}
                    style={styles.buttonLogin}    
                >
                    <Text style={styles.textButtonLogin}>Entrar</Text>
                </TouchableOpacity>
            :
                <TouchableOpacity
                    style={styles.buttonLogin}
                    onPress={() => {
                        SignIn()
                        setAnimatedLoading(true)                  
                    }}
                >
                    {animatedLoading === true ? 
                        <View 
                            style={styles.animation}
                        >
                            <Loading/>  
                        </View>
                    : 
                        <Text style={styles.textButtonLogin}>Login</Text>}

                </TouchableOpacity>

            }
            <Text
                style={styles.textRedefinePassword}
                onPress={() => navigation.navigate("Reset")}
            > Esqueci minha senha. </Text>
            
            <Text style={styles.registration}>
                ainda não tem uma conta? 
                <Text 
                    style={styles.linkSubscribe}
                    onPress={() => navigation.navigate("Registrar")}
                >
                    criar uma conta...
                </Text>
            </Text>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2B3942',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Platform.OS == "ios"? 0 : 50,
    },
    input: {
        width: "90%",
        marginTop:10,
        padding:10,
        height:50,
        borderRadius: 10,
        backgroundColor: "#465363",
        borderBottomWidth: 1,
        borderBottomColor:"#ff6f00",
        marginLeft:"auto",
        marginRight:"auto",
        color: "#fff"
    },
    buttonLogin: {
        width: "90%", 
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#ff6f00",
        borderRadius: 50,
        marginTop: 30
    },
    textButtonLogin: {
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
    registration: {
        marginTop: 20,
        color: "#ff6f00"
    },
    linkSubscribe: {
        color: "#1877f2",
        fontSize: 16
    },
    textRedefinePassword: {
        marginTop: 20,
        color: "#ffffff",
        fontSize: 16
    },
    showPassword: {
        position: "absolute",
        marginLeft: "80%",
        marginTop: 20
    },
    textSignIn: {
        fontSize: 20, 
        color: "#ffffff"
    },
    animation: {
        height: 50, 
        width: 50, 
        alignItems: 'center', 
        justifyContent: 'center'
    }
});