import React , { useState }from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar, Image, TouchableOpacity, VirtualizedList,Alert
} from 'react-native';
import Animated from 'react-native-reanimated';
import { openDatabase } from "react-native-sqlite-storage";

import { Button, TextInput , IconButton, Colors} from "react-native-paper";
import { State } from 'react-native-gesture-handler';

var db = openDatabase({ name: 'UserDatabase.db' });
const RegisterScreen = ({navigation}) => {
 

  const [textInputuname, setTextInputuname] = useState('');
  const [textInputfname, setTextInputfname] = useState('');
  const [textInputsname, setTextInputsname] = useState('');
  const [textInputEmail, setTextInputEmail] = useState('');
  const [textInputphone, setTextInputPhone] = useState('');
  const [textInputaddress, setTextInputaddress] = useState('');
  
  const [textInputPass, setTextInputPass] = useState('');
const Storedata=()=>{
  if (!textInputEmail && !textInputPass && !textInputuname && !textInputfname && !textInputsname&& !textInputphone && !textInputaddress ) {
    alert('Please enter all details');
    return;
  }
  if (!textInputEmail) {
    alert('Please enter email');
    return;
  }
  if (!textInputPass) {
    alert('Please enter password');
    return;
  }
  if (!textInputuname) {
    alert('Please enter User Name');
    return;
  }
  if (!textInputfname) {
    alert('Please enter First Name');
    return;
  }
  if (!textInputsname) {
    alert('Please enter Surname');
    return;
  }
  if (!textInputphone) {
    alert('Please enter Phone Number');
    return;
  }
  if (!textInputaddress) {
    alert('Please enter City');
    return;
  }
  if (!textInputPass) {
    alert('Please enter Password');
    return;
  }

  console.log('in add course')
        db.transaction(function (tx) {
          tx.executeSql(
            'INSERT INTO table_users (user_name, user_Fname, user_Lname,  user_utype, user_email, user_contact, user_address, password,co_id)  VALUES(?,?,?,?,?,?,?,?,?) ',
            [textInputuname, textInputfname,textInputsname,'2',textInputEmail,textInputphone,textInputaddress,textInputPass,0],
    
            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                Alert.alert(
                  'Success',
                  'Registered Succesfully',
                  [
                    {
                      text: 'Ok',
                      onPress: () => navigation.navigate('Login'),
                    },
                  ],
                  { cancelable: false }
                );
              } else alert('Unable to register user');
            }
          );
        });
  
  
}
  return(
    
    <View style={{ flex: 1,}}>
     
        <View style={{ flex: 1,  backgroundColor: '#000080',alignItems:'center',justifyContent:'center'}} >
        <Image style={{  width:130, height: 100 ,alignSelf:'center'}} source={require('./photos/OrenaLogo.png')} />
        
      </View>
      <View style={{ flex: 4, height: 100, backgroundColor: '#000080'}}>
          <View style={{ flex: 4, height: 100, backgroundColor: 'white' ,borderTopLeftRadius:30,borderTopRightRadius:30 }}>
          <Text style={{ marginLeft: 22, color: '#FFA500', marginTop: 5, fontSize: 20, fontWeight: 'bold',alignSelf:'center',marginBottom:0}}>Create Account !</Text>
            <ScrollView style={{marginTop:5,marginBottom:10}}>
              <TouchableOpacity>
            <TextInput placeholder="User Name" placeholderColor="Black" style={styles.textinput} onChangeText={(textinputuname) => setTextInputuname(textinputuname)}  />
              <TextInput placeholder="First Name" placeholderColor="Black" style={styles.textinput} onChangeText={(textInputfname) => setTextInputfname(textInputfname)}  />
              <TextInput placeholder="Surname" placeholderColor="Black" style={styles.textinput} onChangeText={(textInputsname) => setTextInputsname(textInputsname)}  />
              <TextInput placeholder="E-mail " placeholderColor="Black" style={styles.textinput} onChangeText={(textInputEmail) => setTextInputEmail(textInputEmail)}  />
              <TextInput placeholder="Phone Number" placeholderColor="Black" style={styles.textinput} onChangeText={(textInputphone) => setTextInputPhone(textInputphone)} keyboardType={'numeric'} />
              <TextInput placeholder="Address" placeholderColor="Black" style={styles.textinput} onChangeText={(textInputaddress) => setTextInputaddress(textInputaddress)}  />
             
              <TextInput placeholder="Password" placeholderColor="Black" style={styles.textinput} onChangeText={(textinputpass) => setTextInputPass(textinputpass)} />
              <Button mode="contained" onPress={Storedata} style={styles.registerbutton}>
            Register
        </Button>
        </TouchableOpacity>
       </ScrollView>
       </View>
       </View>
      <View style={{ flex: 0, backgroundColor: 'white', alignItems:'center' ,justifyContent:'flex-end'}}>
      <Text style={{ textAlign: 'center', color: '#000080', alignSelf:'auto', fontSize: 15, fontWeight: 'bold' }}>© Orena Solutions 2020</Text>
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
    marginLeft: 30,
    marginRight: 30
    , marginBottom: 5,
    marginTop: 5,
    textDecorationColor: 'black',
    fontSize: 20, fontWeight: 'normal',
    textAlign:'center'
  },
  
  registerbutton: {
    marginTop: 0,
    marginBottom:10,
    alignSelf:'center',
    width: "auto",
    height: "auto",
    backgroundColor: '#228B22', 
    borderRadius: 15,
  }
})
export default RegisterScreen;