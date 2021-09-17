import React, { useState } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text, Alert,
     TouchableOpacity,
} from 'react-native';

import { Button, TextInput , IconButton, Colors} from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });


const AddTeacherScreen = ({navigation}) => {
    
    const [textInputuname, setTextInputuname] = useState('');
  const [textInputfname, setTextInputfname] = useState('');
  const [textInputsname, setTextInputsname] = useState('');
  const [textInputEmail, setTextInputEmail] = useState('');
  const [textInputphone, setTextInputPhone] = useState('');
  const [textInputaddress, setTextInputaddress] = useState('');
  
  const [textInputPass, setTextInputPass] = useState('');

   const  add_user = () => {
    console.log('in add course')
        db.transaction(function (tx) {
          tx.executeSql('INSERT INTO table_users (user_name, user_Fname, user_Lname,  user_utype, user_email, user_contact, user_address, password)  VALUES(?,?,?,?,?,?,?,?) ',
            [textInputuname, textInputfname,textInputsname,"1",textInputEmail,textInputphone,textInputaddress,textInputPass],
    
            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                Alert.alert(
                  'Success',
                  'Teacher Added Succesfully',
                  [
                    {
                      text: 'Ok',
                      onPress: () => navigation.navigate('Admin'),
                    },
                  ],
                  { cancelable: false }
                );
              } else alert('Unable to add course');
            }
          );
        });
        
      };
    return (
        <View style={{ flex: 1 }}>
    
    <View style={{ backgroundColor: 'white', flexDirection: 'row' ,marginTop:10}}>
                     <Icon name='chevron-left' size={50} style={{ alignSelf: 'center',marginTop:0 }} onPress={() =>navigation.navigate("Admin")}></Icon>
                     <Text style={{ color: '#000080', marginTop: 10, marginBottom: 0, fontSize: 20, fontWeight: 'bold',textAlign:'center' }}>Add Teacher</Text>
                </View>
          <View style={{ flex: 5, backgroundColor: "#F0B27A" }}>
    
            <View style={{ flex: 5, backgroundColor: "white", borderBottomLeftRadius: 100,  }}>
              <ScrollView>
            <TextInput placeholder="User Name" placeholderColor="Black" style={styles.textinput} onChangeText={(textinputuname) => setTextInputuname(textinputuname)} maxLength={20} />
              <TextInput placeholder="First Name" placeholderColor="Black" style={styles.textinput} onChangeText={(textInputfname) => setTextInputfname(textInputfname)}maxLength={20}  />
              <TextInput placeholder="Surname" placeholderColor="Black" style={styles.textinput} onChangeText={(textInputsname) => setTextInputsname(textInputsname)}  maxLength={20}/>
              <TextInput placeholder="E-mail " placeholderColor="Black" style={styles.textinput} onChangeText={(textInputEmail) => setTextInputEmail(textInputEmail)} maxLength={25} />
              <TextInput placeholder="Phone Number" placeholderColor="Black" style={styles.textinput} onChangeText={(textInputphone) => setTextInputPhone(textInputphone)} maxLength={10}  keyboardType="numeric"/>
              <TextInput placeholder="Address" placeholderColor="Black" style={styles.textinput} onChangeText={(textInputaddress) => setTextInputaddress(textInputaddress)}maxLength={225}  />
             
              <TextInput placeholder="Password" placeholderColor="Black" style={styles.textinput} onChangeText={(textinputpass) => setTextInputPass(textinputpass)} maxLength={20}/>
              <Button mode="contained" onPress={add_user} style={styles.registerbutton}>
            Add Teacher
        </Button>
        </ScrollView>
            </View>
          </View>
          <View style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ flex: 1, backgroundColor: "#F0B27A", borderTopEndRadius: 100 }}>
          
            </View>
          </View>
        </View>
      );
    }
    
   
    const styles = StyleSheet.create({
      text: {
        fontWeight: 'bold',
        marginLeft: 10,
        marginRight: 10,
        borderColor: '#050505',
        color: '#050505',
        backgroundColor: 'transparent',
        padding: 2,
        fontSize: 13,
      },
    
      button: {
        color: 'black',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        marginTop:5,
      },
    
      panelButton: {
        width: 80,
        height: 40,
        padding: 1,
        borderRadius: 13,
        borderColor:'red',
        borderWidth:1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        marginLeft: 120,
        marginRight: 20,
        marginTop: 5,
        marginBottom: 5,
        fontSize: 10,
        fontWeight: 'bold',
      },
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
        marginLeft:20,
        marginRight:20,
         marginBottom: 5,
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
      },
    })
export default AddTeacherScreen;