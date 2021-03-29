import React , {useLayoutEffect, useEffect, useState}from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView ,TouchableWithoutFeedback, TextInput} from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { TouchableOpacity } from 'react-native';
import {AntDesign , FontAwesome,Ionicons} from "@expo/vector-icons"
import { SafeAreaView } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { Platform } from 'react-native';
import { ScrollView } from 'react-native';
import { Keyboard } from 'react-native';
import { db ,auth} from '../firebase/firebase';
import * as firebase from "firebase"



const ChartScreen = ({navigation, route}) => {
    const [input , setInput] = useState("")
    const {params:{id, chatName}} = route;
    useLayoutEffect(()=>{
        navigation.setOptions({
            title:"Chat",
            headerBackTitleVisible:false,
            headerTitleAlign:"left",
            headerTitle:()=>(
                <View style = {{
                    flexDirection:"row",
                    alignItems:"center"
                }}>
                    <Avatar rounded
                    source = {{
                        uri:"https://img.freepik.com/free-photo/cheerful-curly-business-girl-wearing-glasses_176420-206.jpg?size=626&ext=jpg"
                    }}
                    />
                    <Text
                    style = {{
                        color:"white",
                        marginLeft:10,
                        fontWeight:"700"
                    }}
                    >{chatName}</Text>
                </View>
            ),
            headerRight:()=>(
                <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight:20
                 }}
                >
                    <TouchableOpacity>
                        <FontAwesome
                        name="video-camera"
                        size = {24}
                        color="white"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Ionicons
                      name="call"
                      size={24}
                      color="white"
                      />
                    </TouchableOpacity>
                </View>
            ),
            headerLeft:()=>(
                <TouchableOpacity
                style = {{marginLeft:10}}
                onPress = {navigation.goBack}
                >
                    <AntDesign name="arrowleft"
                    size ={24}
                    color="#fff"
                    ></AntDesign>
                </TouchableOpacity>
            )
        })

    }, [navigation])

    //sendMessage
    const sendMessage  = ()=>{
        Keyboard.dismiss();
        console.log(`The input in send is ${input}`)
        
    //go to chat document
    if(input){
        db.collection("chats").doc(id).collection("messages").add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            messsage:input,
            displayName:auth.currentUser.displayName,
            email:auth.currentUser.email,
            photoURL:auth.currentUser.photoURL||"https://img.freepik.com/free-photo/cheerful-curly-business-girl-wearing-glasses_176420-206.jpg?size=626&ext=jpg"
        })
        setInput("")

    }
    alert("message cannot be empty")

    
  
    }


    //console.log(`The input is ${input}`)

    //reuse the layout hook 

    //store the message
    const [messages, setMessages] = useState([]);

    useLayoutEffect(()=>{
        const unsubscribe = db.collection("chats").doc(id).collection("messages")
                            .onSnapshot(snapshot=>(
                                setMessages(
                                    snapshot.docs.map(doc=>({
                                        messageData:doc.data(),
                                        messageId:doc.id
                                    })))

                                ))
                               
                             //.orderBy("timestamp", "desc").onSnapshot((snapshot)=>(
                                   // console.log(`the snapshos is ${snapshot.docs} and id is ${id}`)
                                    //  setMessages(snapshot.docs.map(doc=>({
                                    //      id:doc.id,
                                    //      data:doc.data()
                                    //  })))
                             //))

                             return unsubscribe;

    }, [id])

    
  console.log(`The messages are ${JSON.stringify(messages)}`)

    return (
        <SafeAreaView style = {{
            flex:1,
            backgroundColor:"white"
        }}>
            <StatusBar style="light"/>
            <KeyboardAvoidingView
            behavior = {
                Platform.OS =="ios"?"padding":"height"
            }
            style = {styles.container}
            keyboardVerticalOffset = {90}
            >
                <TouchableWithoutFeedback
                onPress = {Keyboard.dismiss()}>
                    <React.Fragment>
                    
                    <ScrollView contentContainerStyle = {{paddingTop:15}}>{
                        messages&&messages.map(({messageId, messageData:{messsage, email, photoURL, displayName}})=>(
                            email == auth.currentUser.email?
                                    <View key={messageId} style = {styles.receiver}>
                                        <Avatar 
                                        source = {{
                                            uri:auth.currentUser.photoURL
                                        }}
                                        size={30}
                                        containerStyle = {{
                                            position:"absolute",
                                            bottom:-15,
                                            right:-5
                                        }}
                                        position="absolute"
                                        bottom = {-15}
                                        right = {-5}
                                        rounded/>
                                        <Text style ={styles.receiverText}>
                                            {messsage}
                                        </Text>
                                    </View>
                            :
                            
                              <View key = {messageId} style ={styles.sender}>
                                        <Avatar 
                                        source = {{
                                            uri:photoURL
                                        }}
                                        size={30}
                                        containerStyle = {{
                                            position:"absolute",
                                            bottom:-15,
                                            right:-5
                                        }}
                                        position="absolute"
                                        bottom = {-15}
                                        right = {-5}
                                        rounded/>
                                        <Text style ={styles.senderText}>
                                            {messsage}
                                        </Text>
                                        <Text style = {styles.senderName}>
                                             {displayName}
                                        </Text>
                              </View>
                            
                        ))
                        }</ScrollView>
                        <View style = {styles.footer}>
                            <TextInput
                             value = {input}
                             onChangeText = {(info)=>setInput(info)}
                            placeholder="enter message"
                            onSubmitEditing = {sendMessage}
                            
                            style = {styles.textInput}
                            
                            />
                        
                       <TouchableOpacity
                       onPress = {sendMessage}
                       activeOpacity = {0.5}>
                           <Ionicons name="send" size={24}
                           color = "#2B68E6"
                           ></Ionicons>
                       </TouchableOpacity>
                       </View>
                    
                </React.Fragment>
                

                </TouchableWithoutFeedback>
                
            </KeyboardAvoidingView>
             
        </SafeAreaView>
    )
}

export default ChartScreen

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    receiver:{
        padding:15,
        backgroundColor:"#ECECEC",
        alignSelf:"flex-end",
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:"80%",
        position:"relative"
    },
    receiverText:{},
    sender:{
        padding:15,
        backgroundColor:"#2B68E6",
        alignSelf:"flex-start",
        borderRadius:20,
        margin:15,
        maxWidth:"80%",
        position:"relative"
    },
    senderText:{},
    footer:{
        flexDirection:"row",
        alignItems:"center",
        width:"100%",
        padding:15
    },
    textInput:{
        bottom:0,
        height:40,
        flex:1,
        marginRight:15,
        backgroundColor:"#ECECEC",
        padding:10,
        color:"grey",
        borderRadius:30

    },
    senderName:{
        left:10,
        paddingRight:10,
        fontSize:10,
        color:"white"

    }
})
