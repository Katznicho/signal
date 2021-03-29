import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Screens/LoginScreen';
import Register from './Screens/Register';
import Home from "./Screens/HomeScreen";
import AddChart from "./Screens/AddChart"
import ChartScreen from './Screens/ChartScreen';

const Stack = createStackNavigator();

//screen options
const globalScreenOptions = {
  
  headerStyle: { backgroundColor: "#1c478e" },//background color
    headerTitleStyle: { color: "white" },//color text
    headerTintColor:"white"//changes icons

}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName = "Home"
        screenOptions = {globalScreenOptions}
      >
        <Stack.Screen
          name="Login"
          component = {LoginScreen}
        />
        <Stack.Screen
        options={{
          title: 'REGISTER',
          headerStyle: {
            backgroundColor: '#1c478e',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color:"#fff",
            marginLeft:30
          },
        }}
          name="Register"
          component = {Register}
        />
        

        {/*home */}
        <Stack.Screen
          name="Home"
          component= {Home}
        />
        {/*add chart */}
        <Stack.Screen
          name="AddChart"
          component = {AddChart}
        />
        <Stack.Screen
        name="ChartScreen"
        component = {ChartScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
