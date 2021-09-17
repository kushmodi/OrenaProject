import React , { useState, useEffect }from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text, BackHandler,
  StatusBar, Image, TouchableOpacity, VirtualizedList,Alert
} from 'react-native';


import {useFocusEffect} from '@react-navigation/native';
import { Button, TextInput , IconButton, Colors} from "react-native-paper";
import AsyncStorage from '@react-native-community/async-storage';
import { openDatabase } from 'react-native-sqlite-storage';


var db = openDatabase({ name: 'UserDatabase.db' });
const LoginScreen = ({navigation}) => {

 
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
          BackHandler.exitApp();
        return true;
        };

      // Add Event Listener for hardwareBackPress
      BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => {
        // Once the Screen gets blur Remove Event Listener
        BackHandler.removeEventListener(
          'hardwareBackPress',
          onBackPress
        );
      };
    }, []),
  );

  
  let [inputUserpass, setInputUserpass] = useState('');
  let [inputUserName, setInputUserName] = useState('');
  let [userData, setUserData] = useState({});
  
console.log("user type is"+userData.user_utype)
  var SharedPreferences = require('react-native-shared-preferences');
  //SharedPreferences.setItem("key",userid);
  //SharedPreferences.getItem("key", function(value){
    //console.log(value);
   // setspvalue(value)
  //});
  //console.log(spvalue)
 const getvalue =()=>{
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM table_users where (user_name,password) =(?,?)',
      [inputUserName,inputUserpass],
      (tx, results) => {
        var len = results.rows.length;
        
        if (len > 0) {
          setUserData(results.rows.item(0));
          verify();
        } else {
          alert('Please enter valid Data');
        } 
      })
    ;})
 }
const Storedata=()=>{
 
    if (!inputUserName && !inputUserpass ) {
      Alert.alert('Please enter  Email Address and Password');
      return;
    }
    if (!inputUserName) {
      Alert.alert('Please enter Email Address');
      return;
    }
    if (!inputUserpass) {
      Alert.alert('Please enter Password');
      return;
    }
    if(inputUserName==="admin" && inputUserpass==="Exam@123")
    {
      navigation.navigate("Admin")
     //SharedPreferences.setItem("usertype",'Admin');
     setInputUserName('')
   setInputUserpass('')
   setUserData('')
    }
    else{
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM table_users where (user_name,password) =(?,?)',
          [inputUserName,inputUserpass],
          (tx, results) => {
            var len = results.rows.length;
            
            if (len > 0) {
              setUserData(results.rows.item(0));
              verify();
            } else {
              alert('Please enter valid Data');
            } 
          })
        ;})  
    if(inputUserName == userData.user_name && inputUserpass == userData.password)
    {
      
      if(userData.user_utype == 1)
      {
        navigation.navigate("Teacher")
         saveData()
         setInputUserName('')
         setInputUserpass('')
         setUserData('')
     
       }
        else{
         if(userData.user_utype == 2)
         {
           navigation.navigate("Elearning" )
          saveData() 
          setInputUserName('')
          setInputUserpass('')
          setUserData('')
        }
        }
      
        }
      }
     
  }
 const  verify=()=>{
 

    
   if(userData.user_utype == 1)
   {
     navigation.navigate("Teacher")
      saveData()
      setInputUserName('')
      setInputUserpass('')
      setUserData('')
  
    }
     else{
      if(userData.user_utype == 2)
      {
        navigation.navigate("Elearning" )
       saveData() 
       setInputUserName('')
       setInputUserpass('')
       setUserData('')
     }
     }
   console.log(userData)
  
   
  
}
const saveData = async () => {

    try {
      const userid = JSON.stringify(userData.user_id)
      await AsyncStorage.setItem('userid', userid)
      const usertype = JSON.stringify(userData.user_utype)
      await AsyncStorage.setItem('usertype', usertype)
      console.log("saving the value" + jsonValue)
    } catch (e) {
      console.log('failed to send data')
    }
  
  
}
  return (
    <View style={{ flex: 1}}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1, height: 100, backgroundColor: '#000080', borderBottomLeftRadius: 185 ,alignItems:'center',ali:'center',justifyContent:'center'}} >
          <Image style={{  width: 210, height: 160 }} source={require('./photos/OrenaLogo.png')} />
        </View>
      </View>
      <View style={{ flex: 2, height: 100, backgroundColor: '#000080',alignSelf:'auto'}} testID="login_form">
        <View style={{ flex: 2, height: 100, backgroundColor: 'white', borderTopRightRadius:190}} >
          <Text style={{ marginLeft: 22, color: '#FFA500', marginTop: 10, fontSize: 15, fontWeight: 'bold' }}>Welcome Back!</Text>
          <Text style={{ marginLeft: 22, color: '#000080', marginTop: 2, fontSize: 15, fontWeight: 'bold' }}>Login to gain access to the portal.</Text>
          <View>
            <TextInput placeholder="User name" placeholderColor="Black" style={styles.textinput} onChangeText={(value) => setInputUserName(value)} 
              left={<TextInput.Icon name="card-account-details-outline" />} />
          </View>
          <TextInput placeholder="Password" placeholderColor="black" fontWeight='bold' style={styles.textinputpass} secureTextEntry={true}onChangeText={ (value) => setInputUserpass(value)} left={<TextInput.Icon name="lock-outline"  />} />
          <Button mode="contained" onPress={Storedata} style={styles.loginButton}>Login</Button>
         <View style={{ flex: 1, height: 100, backgroundColor: 'white',textAlign: 'center' ,justifyContent:'flex-start',}}>
            <Text style={{ textAlign: 'center', color: '#228B22', marginTop: 20,  fontSize: 15, fontWeight: 'bold' }} onPress={() =>navigation.navigate("Forgetpassword")}>Did You Forget You Password?</Text>
            </View>
        <TouchableOpacity>
            <Text style={styles.registerstyle} onPress={() =>navigation.navigate("Register")}>Don't Have Account ? Register </Text>
            </TouchableOpacity>
        <Text style={{ textAlign: 'center', color: '#000080', alignSelf:'auto', fontSize: 15, fontWeight: 'bold' }}>© Orena Solutions 2020 </Text>
       
        </View>
      </View>
     
    </View>
   
  
  );
}
const styles = StyleSheet.create({
  textinput: {
    height: 43,
    fontSize: 14,
    borderRadius: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginLeft: 20,
    marginRight: 20
    , marginBottom: 5,
    marginTop: 25,
    textDecorationColor: 'black',
    fontSize: 20, fontWeight: 'normal'
  },
  textinputpass: {
    height: 43,
    fontSize: 14,
    borderRadius: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5
    , marginTop: 10,
    fontSize: 20,
    
  },
  loginButton: {
    marginTop: 12,
    alignSelf:'center',
    width: "auto",
    height: "auto",
    backgroundColor: '#228B22', 
    borderRadius: 15,
   
    
  },
  registerstyle:{textAlign: 'center', color: '#000080', alignSelf:'center',marginTop: 10, marginBottom: 10, fontSize: 15, fontWeight: 'bold',justifyContent:'center' }
})
export default LoginScreen;