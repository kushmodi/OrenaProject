import React, {useState, useEffect } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text, Alert,
     TouchableOpacity,FlatList,
} from 'react-native';

import { Button, TextInput , IconButton, Colors} from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });


const UpdateCourseScreen = ({navigation}) => {
    let [inputcourseId, setInputcourseId] = useState('');
    let [inputcoursename, setTextInputcoursename] = useState('');
    let [inputcoursedesc, setTextInputcoursedesc] = useState('');
    
  
    let updateAllStates = (name, description ) => {
        setTextInputcoursename(name);
        setTextInputcoursedesc(description);
    
    };
    console.log(inputcoursename,inputcoursedesc)
    let searchUser = () => {
        console.log(inputcourseId);
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT * FROM table_courses where co_id = ?',
            [inputcourseId],
            (tx, results) => {
              var len = results.rows.length;
              if (len > 0) {
                console.log("len fun");
                let res = results.rows.item(0);
                updateAllStates(res.co_name, res.co_desc);
              } else {
                alert('No user found');
                updateAllStates('', '');
              }
            }
          );
        });
      };
      let updateUser = () => {

    
        db.transaction((tx) => {
          tx.executeSql(
            'UPDATE table_courses set co_name=?, co_desc=? where co_id=?',
            [inputcoursename, inputcoursedesc, inputcourseId],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                Alert.alert(
                  'Success',
                  'User updated successfully',
                  [
                    {
                      text: 'Ok',
                      onPress: () => navigation.navigate('Admin'),
                    },
                  ],
                  { cancelable: false }
                );
              } else alert('Updation Failed');
            }
          );
        });
      };
    
  
    return (
        <View style={{ flex: 1 }}>
    
    <View style={{ backgroundColor: 'white', flexDirection: 'row' ,marginTop:10}}>
                     <Icon name='chevron-left' size={50} style={{ alignSelf: 'center',marginTop:0 }} onPress={() =>navigation.navigate("Admin")}></Icon>
                     <Text style={{ color: '#000080', marginTop: 10, marginBottom: 0, fontSize: 20, fontWeight: 'bold',textAlign:'center' }}>update course</Text>
                </View>
          <View style={{ flex: 5, backgroundColor: "#F0B27A" }}>
    
            <View style={{ flex: 5, backgroundColor: "white", borderBottomLeftRadius: 100,  }}>
            <TextInput placeholder="Enter Course name" placeholderColor="Black" style={styles.textinput} onChangeText={(inputcourseId) => setInputcourseId(inputcourseId)}  />
            <Button mode="contained" onPress={searchUser} style={styles.registerbutton}>search course</Button>

            <TextInput placeholder="Course Name" placeholderColor="Black" style={styles.textinput} onChangeText={(inputcoursename) => setTextInputcoursename(inputcoursename)} value={inputcoursename} />
              <TextInput placeholder="Course description" placeholderColor="Black" style={styles.textinputdesc} onChangeText={(inputcoursedesc) => setTextInputcoursedesc(inputcoursedesc)} maxLength={225} value={inputcoursedesc}
                numberOfLines={5}
                multiline={true} />
                 <Button mode="contained" onPress={updateUser} style={styles.registerbutton}>update course</Button>
            </View>
          </View>
          <View style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ flex: 1, backgroundColor: "#F0B27A", borderTopEndRadius: 100 }}></View>
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
        marginLeft:10,marginRight:10,
         marginBottom: 5,
        marginTop: 10,
        textDecorationColor: 'black',
        fontSize: 20, fontWeight: 'normal',
        textAlign:'center'
      },
      textinputdesc: {
        height: 100,
        fontSize: 14,
        borderRadius: 10,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: '#fafafa',
        paddingLeft: 10,
        marginLeft:10,marginRight:10,
         marginBottom: 5,
        marginTop: 10,
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
export default UpdateCourseScreen;