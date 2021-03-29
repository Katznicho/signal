import React , {useState, useEffect}from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar , ListItem } from 'react-native-elements';
import { db } from '../firebase/firebase';
const CustomListen = ({id , chatName , enterChat}) => {

    const [chatMessages , setChatMessages] = useState([])

    useEffect(()=>{

        // const unsubscribe = db.collection("chats").doc(id).collection("messages").onSnapshot((snapshot)=>(
        //     setChatMessages(snapshot.docs.map((doc)=>({data:doc.data()})))
        // ))
        const unsubscribe = db.collection("chats").doc(id).collection("messages").orderBy("timestamp", "desc")
        .onSnapshot(snapshot=>(
            setChatMessages(
                snapshot.docs.map(doc=>({
                    messageData:doc.data(),
                })))

            ))

        return unsubscribe;
    }, [])
    console.log(`There we go ${JSON.stringify(chatMessages)}`)
    return (
        <ListItem 
        onPress = {
            ()=>enterChat(id, chatName)
        }
        key={id} bottomDivider>
            <Avatar
                rounded
                source={{
                    uri: chatMessages.length>0? chatMessages[0].messageData.photoURL?chatMessages[0].photoURL === !null:
                    "https://img.freepik.com/free-photo/cheerful-curly-business-girl-wearing-glasses_176420-206.jpg?size=626&ext=jpg"
                    : "https://img.freepik.com/free-photo/cheerful-curly-business-girl-wearing-glasses_176420-206.jpg?size=626&ext=jpg"
                 }}
            />
            <ListItem.Content>
                <ListItem.Title style = {{ fontWeight:"800"}}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    {chatMessages.length>0?
                      (chatMessages[0].messageData.displayName):null
                    }:{
                        chatMessages.length>0?chatMessages[0].messageData.messsage:null
                    }
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    
    )
}

export default CustomListen

const styles = StyleSheet.create({})
