import React, {useLayoutEffect, useState, useEffect }from 'react'
import { StyleSheet, Text, View,TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import CustomListen from '../Components/CustomListen';
import { Avatar } from "react-native-elements";
import { auth , db} from "../firebase/firebase";
import {AntDesign , SimpleLineIcons} from "@expo/vector-icons"

const HomeScreen = ({ navigation }) => {

//create charts
const [ chats, setChats] = useState([])
useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((snapshot)=>(
        setChats(snapshot.docs.map(doc=>({id:doc.id , data:doc.data()})))
    )
    )
    return () => {
        unsubscribe
        
    }
}, [])

    const SignOut = () => {
        auth.signOut().then(() => {
            navigation.replace("Login")
        })
    }
    useLayoutEffect(() => {
       // effect
        navigation.setOptions({
            title: "Signal",
            headerStyle:{
                backgroundColor: "#fff"
            },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",            
            headerLeft: () => (<View
                style = {{ marginLeft:20 }}
            >
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress = {SignOut}
                >
                <Avatar
                rounded
                source={{
                    uri: auth.currentUser ? auth.currentUser.photoURL
                    :"https://img.freepik.com/free-photo/cheerful-curly-business-girl-wearing-glasses_176420-206.jpg?size=626&ext=jpg"
                 }}
            />
                </TouchableOpacity>
                
            </View>),
            headerRight: () => (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: 80,
                        marginRight:20
                     }}
                >
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign
                            name="camerao"
                            size={24}
                            color="black"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress = {()=>navigation.navigate("AddChart")}
                        activeOpacity={0.5}>
                    <SimpleLineIcons
                        name="pencil"
                        size={24}
                        color="black"
                    />
                </TouchableOpacity>
                    
                </View>)
            
        
        })
        return () => {
           // cleanup
        };
    }, [])

    //enter chat screen
    const enterChat = (id , chatName)=>{
        navigation.navigate("ChartScreen", {
            id:id,
            chatName:chatName
        })
    }
    return (
        <SafeAreaView>
        
            <ScrollView style = {{height:"100%"}}>
                {
                    chats.map(({id , data:{chatName}})=>(
                        <CustomListen id={id}
                        enterChat = {enterChat}
                         chatName={chatName} 
                         key={id}/>
                    ))
                }
                
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
