import React, {useState, useLayoutEffect} from 'react';
import {StatusBar} from "expo-status-bar"
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { Button, Input, Image, Text } from 'react-native-elements';
import { auth } from "../firebase/firebase";

const Register = ({navigation}) => {
    //uselayouteffect

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle:"Back"
        })
        
    }, [navigation])

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImageUrl] = useState("");

    //register
    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then(authUser => {
            
                authUser.user.updateProfile({
                    displayName: name,
                    photoURL:image||"https://image.shutterstock.com/image-vector/person-icon-260nw-282598823.jpg"
                })
                // authUser.user.updateProfile({
                //     displayName: name,
                //     photoURL:image||
                // })
                console.log(authUser)
            
            })
        .catch(error=>alert(error.message))
        
    }

    return (
        <KeyboardAvoidingView
            style = {styles.container}
            behavior="padding">
            <StatusBar style="light" />
            
            <Text h3 style={{ margin: 50 }}>
                Create a Signal account
                </Text>
            
            <View style={styles.inputContainer}>
                <Input
                    placeholder="full name"
                    autoFocus
                    type="text"
                    value = {name}
                    onChangeText = {text=>setName(text)}
                    
                />
                <Input
                    placeholder="email"
                    value={email}
                    type="email"
                    onChangeText = {text=>setEmail(text)}
                    
                />
                <Input
                    value={password}
                    type="password"
                    secureTextEntry
                    placeholder ="password"
                    onChangeText = {text=>setPassword(text)}
                    
                />
                <Input
                    placeholder="profile pic url"
                    type="text"
                    value={image}
                    onChangeText=
                    {text => setImageUrl(text)}
                    onSubmitEditing = {register}
                />
                
            </View>
            <View style={styles.button}>
            <Button
            raised
            onPress = {register}
            title="Register" />
            </View>
           
            <View style={ {height:100}}/>
        </KeyboardAvoidingView>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor:"#fff"
    },
    button: {
        width:200,
        marginTop:10
    },
    inputContainer: {
        width:300
    }
    
})
