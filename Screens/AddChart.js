
import React, {useLayoutEffect, useEffect, useState} from 'react'
import { StyleSheet, Text, View , Button} from 'react-native';
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import {db} from "../firebase/firebase"
const AddChart = ({ navigation }) => {
    const [input ,setInput] = useState("");
    
   
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a new Chat",
            headerBackTitle:"Chats"

        })
        
    },[navigation])
    const createChat = async()=>{
        await db.collection("chats").add({
            chatName:input
        }).then(()=>{
            navigation.goBack()
        })
        .catch((error)=>alert(error.message))

    }
    return (
        <View style={styles.container}>
            <Input
                value={input}
                onChangeText = {text=>setInput(text)}
                placeholder="enter chat name"
                onSubmitEditing = {createChat}
                leftIcon={
                    <Icon
                        name="wechat"
                        type="antdesign"
                        size={24}
                        color="black"
                    />
                }
            />
            <Button
                disabled = {!input}
                title="CreateChat"
                onPress = {createChat}
            />
        </View>
    )
}

export default AddChart

const styles = StyleSheet.create({
    container: {
     backgroundColor:"white",
     padding:30,
     height:"100%"
        
    }
})
