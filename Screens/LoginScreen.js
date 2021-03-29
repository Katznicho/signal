import React, {useState , useEffect}from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import { Button,  Input,Image } from 'react-native-elements';
import { StatusBar } from "expo-status-bar";
import { auth } from "../firebase/firebase";
const image = {
    uri:"https://ichef.bbci.co.uk/news/976/cpsprodpb/CD2A/production/_116522525_signalmessagingapp.jpg"
}


const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    //signin
    const SignIn = () => {
        auth.signInWithEmailAndPassword(email, password)
            .then(authuser => {
                console.log(authuser)
            })
            .catch(error=>alert(error.message))
    
    }
    
    useEffect(() => {
    
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (authUser) {
            console.log(authUser)
            navigation.replace("Home")
        }
        else {
            
        }
    })
    return () => {
        unsubscribe
    }
    //return unsubscribe()
    
}, [])
    return (
        <KeyboardAvoidingView
            behavior ="padding"
            style={styles.container}>
            <StatusBar style="light" />        
            <Image
                style={ styles.stretch}
            source={image}/>

            <View style = {styles.inputContainer}>
                <Input
                    
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChangeText = {text=>setEmail(text)}
                />
                    <Input
                    autoFocus
                    type="password"
                    secureTextEntry
                    value={password}
                    onChangeText={text => setPassword(text)}
                    onSubmitEditing ={SignIn}
                    placeholder="password" />
                
            </View>
            
            <View style={styles.buttonStyle}>
            <Button
            onPress = {SignIn}

            title="Login" />
            </View>
            <View style={styles.buttonStyle}>
                <Button
                    type="outline"
                    onPress = {()=>navigation.navigate("Register")}
                    title="Register" />
            </View>



        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor:"#fff"
    },
    stretch: {
        width: 100,
        height: 100,
    
    },
    inputContainer: {
        width:300
        
    },
    buttonStyle: {
        width:200,
        marginTop:10

    }
})
