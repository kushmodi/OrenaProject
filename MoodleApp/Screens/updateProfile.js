import React ,{ useState,useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar, Image, TouchableOpacity, VirtualizedList, RecyclerViewBackedScrollView,Alert
} from 'react-native';
import { ProfilePicture } from "react-native-profile-picture";
import { Button, TextInput, IconButton, Colors } from "react-native-paper";
import { color } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import BottomSheet from 'reanimated-bottom-sheet';
import UpdateCourseScreen from './Admin/UpdateCourseScreen';
import AsyncStorage from '@react-native-community/async-storage';
import { openDatabase } from 'react-native-sqlite-storage';


var db = openDatabase({ name: 'UserDatabase.db' });

const updateProfile = ({ navigation }) => {

    { const [TextInputnnumber, setTextInputnnumber] = useState(' ');
     const getdetail=()=>{
         for( var i=0;i<TextInputnnumber;i++){
             return(
                 <View>
                 <TouchableOpacity style={{borderColor:'Black',borderWidth:2,marginLeft:10,marginRight:10,borderRadius:10}}>
                 <Text style={{ marginLeft: 10 ,marginRight:10, color: '#000080', marginTop: 0, marginBottom: 0, fontSize: 15, fontWeight: 'bold', }}>Question:{textInputSubject}</Text>
                 <Text style={{ marginLeft: 10 ,marginRight:10, color: 'green', marginTop: 0, marginBottom: 5, fontSize: 15, fontWeight: 'bold', }}> Answer: {textInputdescription}</Text>
                 </TouchableOpacity>
                 </View>
             )
         }
     }}
let [inputUsernm,setTextInputuname] = useState('');
let [inputUserFname,setTextInputfname] = useState('');
let [inputUserSrname,setTextInputsname] = useState('');
let [inputUseremail,setTextInputEmail] = useState('');
let [inputUserphone,setTextInputPhone] = useState('');
let [inputUseraddress,setTextInputaddress] = useState('');
let [inputUserpassword,setTextInputpassword] = useState('');
console.log(inputUsernm)
const [usersid,setuserid] =useState('')
console.log("usersidd"+ usersid)

let updateAllStates = (name, fname, lname,email,contact,address,password) => {
  setTextInputuname(name);
  setTextInputfname(fname);
  setTextInputsname(lname);
  setTextInputEmail(email);
  setTextInputPhone(contact);
  setTextInputaddress(address);
  setTextInputpassword(password);
};

useEffect(() => {
    getvalue();   
}, [])






const getvalue = async ()=>{
  const userid = await AsyncStorage.getItem('userid')
  const value = JSON.parse(userid);
  setuserid(value)

 
console.log(value)
db.transaction((tx) => {
  tx.executeSql(
    'SELECT * FROM table_users where user_id=?',
    [value],
    (tx, results) => {
      var len = results.rows.length;
     console.log(len)
      if (len > 0) {
        let res = results.rows.item(0);
        updateAllStates(res.user_name, res.user_Fname, res.user_Lname,res.user_email,res.user_contact,res.user_address,res.password);
     
      } 
    }
  );
});
}
const Updateuser=()=>{
  db.transaction((tx) => {
    tx.executeSql(
      'UPDATE table_users set user_name=?, user_Fname=?,user_Lname=?,user_email=?, user_contact=? , user_address=? , password=? where user_id=?',
      [inputUsernm, inputUserFname,inputUserSrname,inputUseremail,inputUserphone,inputUseraddress,inputUserpassword,usersid],
      (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          Alert.alert(
            'Success',
            'User updated successfully',
            [
              {
                text: 'Ok',
                onPress: () => navigation.navigate('Elearning'),
              },
            ],
            { cancelable: false }
          );
        } else alert('Updation Failed');
      }
    );
  });

}
    return(
       
            <View style={{ flex: 1,backgroundColor:'#00FFFF'  }}>
                <View style={{ backgroundColor: '#00FFFF', flexDirection: 'row' ,marginTop:0}}>
                     <Icon name='chevron-left' size={50} style={{ alignSelf: 'center',marginTop:0 }} onPress={() =>navigation.navigate("Profile")}></Icon>
                     <Text style={{ color: '#000080', marginTop: 0, marginBottom: 0, fontSize: 20, fontWeight: 'bold',alignSelf:'center' }}>Update Profile</Text>
                </View>
                <View style={{ flex: 6, backgroundColor: '#000080', }}>
                    <View style={{ flex: 6, backgroundColor: '#00FFFF', borderBottomLeftRadius: 200 }}>
                     <ScrollView 
        style={{backgroundColor:'white',
        marginLeft:20,
        marginRight:20,
        marginBottom:2,
        marginTop:5,
        borderRadius:10}}>
   
<TextInput value={inputUsernm}placeholder="User Name" placeholderColor="Black"  style={styles.textinput} onChangeText={(inputUsernm) => setTextInputuname(inputUsernm)}  />
<TextInput  value={inputUserFname}placeholder="First Name" placeholderColor="Black" style={styles.textinput} onChangeText={(inputUserFname) => setTextInputfname(inputUserFname)}  />
<TextInput value={inputUserSrname} placeholder="Surname" placeholderColor="Black" style={styles.textinput} onChangeText={(inputUserSrname) => setTextInputsname(inputUserSrname)}  />
<TextInput value={inputUseremail} placeholder="E-mail " placeholderColor="Black" style={styles.textinput} onChangeText={(inputUseremail) => setTextInputEmail(inputUseremail)}  />
<TextInput value={inputUserphone} placeholder="Phone Number" placeholderColor="Black" style={styles.textinput} onChangeText={(inputUserphone) => setTextInputPhone(inputUserphone)} />
<TextInput value={inputUseraddress} placeholder="Address" placeholderColor="Black" style={styles.textinput} onChangeText={(inputUseraddress) => setTextInputaddress(inputUseraddress)}  />

<TextInput value={inputUserpassword} placeholder="Password" placeholderColor="Black" style={styles.textinput} onChangeText={(inputUserpassword) => setTextInputpassword(inputUserpassword)} />
    <Button mode="contained" onPress={Updateuser} style={styles.Updateprofile}> Update 
    
    </Button>
    </ScrollView>
            
    
                        
                    </View>
                </View>
                <View style={{ flex: 1, backgroundColor: '#00FFFF', }}>
                    <View style={{ flex: 1, backgroundColor: '#000080', borderTopEndRadius: 200, }}>
                    </View>
                </View>
            </View>
  
    );
}
export default updateProfile;
const styles = StyleSheet.create({
    textinputSub: {
      height: 40,
      fontSize: 14,
      borderRadius: 10,
      borderTopStartRadius: 10,
      borderTopEndRadius: 10,
      borderWidth: 2,
      borderColor: 'black',
      backgroundColor: '#fafafa',
      paddingLeft: 10,
      marginLeft: 10,
      marginRight: 10
      , marginBottom: 5,
      marginTop: 10,
      textDecorationColor: 'black',
      fontSize: 20, fontWeight: 'normal'
    },
    textinputdesc: {
      
        marginLeft:10,
        marginBottom:10,
        marginRight:10,
        borderColor: 'black',
        backgroundColor: '#fafafa',
       borderWidth:2,
        fontSize: 20, fontWeight: 'normal',borderRadius:10,borderTopLeftRadius:10,
        borderTopRightRadius:10,
      },
      questionButton: {
          
        marginTop: -5,
        marginBottom:10,
        marginRight:15,
        alignSelf:'flex-end',
        width: 90,
        height: 40,
        backgroundColor: '#228B22', 
        borderRadius: 15,
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
        marginLeft: 20,
        marginRight: 20
        , marginBottom: 5,
        marginTop: 10,
        textDecorationColor: 'black',
        fontSize: 20, fontWeight: 'normal'
      },
      Updateprofile: {
        marginTop: 12,
        marginBottom:10,
        alignSelf:'center',
        width: 130,
        height: 40,
        backgroundColor: '#228B22', 
        borderRadius: 15,
      },userdetails:{
        color: '#000080',
         marginTop: 0,
          marginBottom: 5, 
          fontSize: 20,
          marginLeft:10, 
          fontWeight: 'normal',
          alignSelf:'flex-start',
          backgroundColor:'white'
      }
})