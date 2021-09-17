import React ,{ useState,useEffect} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar, Image, TouchableOpacity, VirtualizedList, RecyclerViewBackedScrollView
} from 'react-native';
import { ProfilePicture } from "react-native-profile-picture";
import { Button, TextInput, IconButton, Colors } from "react-native-paper";
import { color } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import BottomSheet from 'reanimated-bottom-sheet';

import { openDatabase } from 'react-native-sqlite-storage';


var db = openDatabase({ name: 'UserDatabase.db' });
const ProfileScreen = ({ navigation }) => {
let [userdata,setuserdata] = useState({});
const [usersid,setuserid] =useState("")


useEffect(() => {
    getvalue()
   
   
    
}, [])

db.transaction((tx) => {
  tx.executeSql(
    'SELECT * FROM table_users where (user_id) =(?)',
    [usersid],
    (tx, results) => {
      var len = results.rows.length;
    
      if (len > 0) {
        setuserdata(results.rows.item(0));
       
        
      } 
      
    }
  );  
});
const getvalue = async ()=>{
  const userid = await AsyncStorage.getItem('userid')
  const value = JSON.parse(userid);
  setuserid(value)
}
    return(
     
            <View style={{ flex: 1,backgroundColor:'#00FFFF'  }}>
                <View style={{ backgroundColor: '#00FFFF', flexDirection: 'row' ,marginTop:0}}>
                     <Icon name='chevron-left' size={50} style={{ alignSelf: 'center',marginTop:0 }} onPress={() =>navigation.navigate("Elearning")}></Icon>
                     <Text style={{ color: '#000080', marginTop: 0, marginBottom: 0, fontSize: 20, fontWeight: 'bold',alignSelf:'center' }}>Profile</Text>
                </View>
                <View style={{ flex: 6, backgroundColor: '#000080', }}>
                    <View style={{ flex: 6, backgroundColor: '#00FFFF', borderBottomLeftRadius: 200 }}>
                        <ScrollView 
                        style={{backgroundColor:'white',
                        marginLeft:20,
                        marginRight:20,
                        marginBottom:2,
                        marginTop:5,
                        borderRadius:10,}}>
                   
                     <Text style={styles.userdetails}>User Name:-{userdata.user_name}</Text>
                    <Text style={styles.userdetails}>First Name:-{userdata.user_Fname}</Text>
                    <Text style={styles.userdetails}>Surname:-{userdata.user_Lname}</Text>
                    <Text style={styles.userdetails}>Email:-{userdata.user_email}</Text>
                    <Text style={styles.userdetails}>Phone:-{userdata.user_contact}</Text>
                    <Text style={styles.userdetails}>Address:-{userdata.user_address}</Text>
                    <Text style={styles.userdetails}>Password:-{userdata.password}</Text>
                 <Text style={styles.userdetails}>Enrolled course ID:-{userdata.co_id}</Text>
                    <Button mode="contained" onPress={() =>navigation.navigate("Updatedata")} style={styles.Updateprofile}> Update 
                    
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
export default ProfileScreen;
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
      Updateprofile: {
        marginTop: 12,
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