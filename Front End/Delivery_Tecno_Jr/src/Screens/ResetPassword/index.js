import React from "react"
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, 
    Platform, StyleSheet, StatusBar, Alert
} from "react-native"

import Fontisto from 'react-native-vector-icons/Fontisto'

export default function Reset({ navigation }){
    const [email, setEmail] = React.useState("")

    const url = 'https://auth-api-user.herokuapp.com/user/recover'

    const resetPassword = () => {
        fetch(url, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({            
                email: email,
            })
          }).then(res => res.json())
            .then(data => {
                navigation.navigate("Login")
            }).catch(err => {
                console.log("error", err);
            })
    }
    
    return(
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"} 
            style={styles.container}
        >
            <StatusBar backgroundColor="#2B3942" barStyle="ligth-content" />
            <Fontisto name="unlocked" size={80} color="#465363" />
            <TextInput
                style={styles.input}
                placeholder="e-mail"
                placeholderTextColor="#ffffff"
                type="text"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            {email === ""
            ?
                <TouchableOpacity 
                    disabled={true}
                    style={styles.buttonResetPassword}
                >
                    <Text style={styles.textButtonResetPassword}>Redefinir senha</Text> 
                </TouchableOpacity>
            :
                <TouchableOpacity
                    style={styles.buttonResetPassword}
                    onPress={resetPassword}
                >
                    <Text style={styles.textButtonResetPassword}>Redefinir senha</Text>
                </TouchableOpacity>

            }
            <View style={{height:100}}/>
       </KeyboardAvoidingView>
    );
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
        marginTop:30,
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
    buttonResetPassword: {
        width: "90%", 
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#ff6f00",
        borderRadius: 50,
        marginTop: 30
    },
    textButtonResetPassword: {
        color: "#ffffff",
        fontSize: 15
    },

});