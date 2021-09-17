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
import BottomSheet from 'reanimated-bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Button, TextInput , IconButton, Colors} from "react-native-paper";
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });
const ForgetPasswordScreen = ({navigation}) => {
  let [userData, setUserData] = useState({});
  let [userid, setUserid] = useState('');
  const [textInputEmail, setTextInputEmail] = useState('');
  const [textInputLogid, setTextInputLogid] = useState('');
  const [textInputnewpass, setTextInputnewpass] = useState('');
  const [textInputrenewpass, setTextInputrenewpass] = useState('');
  const checkvalues=()=>{
  if (!textInputEmail && !textInputLogid ) {
    Alert.alert('Please enter  Email Address and Login Id');
    return;
  }
  if (!textInputEmail) {
    Alert.alert('Please enter Email Address');
    return;
  }
  if (!textInputLogid) {
    Alert.alert('Please enter Login Id');
    return;
  }
  if(textInputEmail !== null && textInputLogid !==null){
    verifydetails()
   console.log('check values')
  }
  else{
    Alert.alert('failed to fetch') 
  }
  }
  const  verifydetails =()=>{
    console.log('check verify detaiils')
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_users where (user_name,user_email) =(?,?)',
        [textInputLogid,textInputEmail],
        (tx, results) => {
          var len = results.rows.length;
          
          if (len > 0) {
            setUserData(results.rows.item(0));
          
          } 
          
 
    else {
            alert('Please enter valid Data');
          } 
        })
      ;})
      if(textInputEmail == userData.user_email && textInputLogid ==userData.user_name)
          {
             sheetRef.current.snapTo(1)

            }
 
  }
  let updatepassword =()=>{
  
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT user_id FROM table_users where (user_name,user_email) =(?,?)',
        [textInputLogid,textInputEmail],
        (tx, results) => {
          var len = results.rows.length;
          
          if (len > 0) {
            setUserid(results.rows.item(0));
          
          } else {
            alert('Please enter valid Data');
          } 
        })
      ;})
      console.log(userid)
    if(textInputnewpass !== null){
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE table_users set password=? where user_id=?',
        [textInputnewpass,  userid.user_id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Passoword updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Login'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Updation Failed');
        }
      );
    });
    console.log('both are equal')
  }
  else{
    alert('password did not match')
  }
  }
  
   const  renderContent = () => (
   
        <View
            style={{
                backgroundColor: 'white',
                padding: 16,
                height: 350,
                marginTop: 10,

                alignItems: 'center',
                borderTopWidth: 5
                , borderColor: "#228B22"
            }}>
            <Icon name='minus' size={50} style={{ alignItems: 'center', marginTop: -30, }}></Icon>
            <Text style={{ marginTop: -10, fontSize: 20, fontWeight: 'bold' }}> Reset Password</Text>
            <TextInput placeholder="Enter New Password" placeholderColor="Black" style={styles.textinputbottomsheet} secureTextEntry={true} onChangeText={(value) => setTextInputnewpass(value)} 
              left={<TextInput.Icon name="key" />} />
       
         
         <Button style={{ marginTop: 10, fontSize: 20, fontWeight: 'bold', width: 300, backgroundColor: "#228B22" }} mode="contained" onPress={updatepassword}>
                    Update Password
            </Button>
        </View>
  
);
const sheetRef = React.useRef(null)
  return(
    <View style={{ flex: 1,}}>
      <View style={{ flex: 2, backgroundColor: 'white' }}>
        <View style={{ flex: 2, height: 100, backgroundColor: '#000080', borderBottomLeftRadius: 185 ,alignItems:'center',justifyContent:'flex-start'}} >
        <Image style={{ marginTop: 10, width: 180, height: 140 }} source={require('./photos/OrenaLogo.png')} />
        </View>
      </View>
      <View style={{ flex: 3, height: 100, backgroundColor: '#000080',  }}>       
        <View style={{ flex: 3, height: 100, backgroundColor: 'white', borderTopEndRadius:195 ,justifyContent:"center"}} >
          <Text style={{ marginLeft: 22, color: '#FFA500', marginTop: 50, fontSize: 15, fontWeight: 'bold' }}>Forget Password!</Text>
          <Text style={{ marginLeft: 22, color: '#000080', marginTop: 2, fontSize: 15, fontWeight: 'bold' }}>Try This To Reset Password.</Text>
            <TextInput placeholder="Email Address" placeholderColor="Black" style={styles.textinput} onChangeText={(value) => setTextInputEmail(value)} left={<TextInput.Icon name="email-outline" />} />
              <TextInput placeholder="Enter Login Id" placeholderColor="black" fontWeight='bold' style={styles.textinputpass} onChangeText={ (value) => setTextInputLogid(value)} left={<TextInput.Icon name="card-account-details-outline" />} />
          <Button mode="contained"  style={styles.forgetButton} onPress={checkvalues}> Reset </Button>
      </View>
      </View>
      <View style={{ flex: 1, height: 100, backgroundColor: 'white', alignItems:'center' ,justifyContent:'flex-end'}}>
      <Text style={{ textAlign: 'center', color: '#000080', alignSelf:'auto', fontSize: 15, fontWeight: 'bold' }}>© Orena Solutions 2020</Text>
      </View>
      <BottomSheet ref={sheetRef}    enabledInnerScrolling={true} snapPoints={[0, 350, 0]} borderRadius={10} renderContent={renderContent}></BottomSheet>
    </View>
  );
}
const styles = StyleSheet.create({
  textinput:{
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
    marginBottom: 5,
    marginTop: 25,
    textDecorationColor: 'black',
    fontSize: 20, fontWeight: 'normal'
  },
  textinputbottomsheet:{
    height: 43,
    width:300,
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
  textinputpass:{
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
    marginBottom: 5,
    marginTop: 10,
    fontSize: 20,
  },
  forgetButton:{
  marginTop: 12,
  alignSelf:'center',
  width: "auto",
  height: "auto",
  backgroundColor: '#228B22', 
  borderRadius: 15,
  },
})
export default ForgetPasswordScreen;