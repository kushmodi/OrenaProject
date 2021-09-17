import React, { useState, useEffect } from 'react';
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


const AddCourseScreen = ({navigation}) => {
    const [textinputcoursename, setTextInputcoursename] = useState('');
    const [textinputcoursedesc,setTextInputcoursedesc ] = useState('');
console.log(textinputcoursename);
console.log(textinputcoursedesc);
const [selected, setselected] = useState('');
console.log(selected)
   const  add_Course = () => {
    console.log('in add course')
        db.transaction(function (tx) {
          tx.executeSql(
            'INSERT INTO table_courses (co_name, co_desc) VALUES (?,?)',
            [textinputcoursename,textinputcoursedesc],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                Alert.alert(
                  'Success',
                  'Course Added Succesfully',
                  [
                    {
                      text: 'Ok',
                     
                    },
                  ],
                  { cancelable: false }
                  
                );
               
                  db.transaction((tx) => {
                    tx.executeSql('SELECT * FROM table_courses', [], (tx, results) => {
                      var temp = [];
                      for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                      setFlatListItems(temp);
                    });
                  });
                
              } else alert('Unable to add course');
            }
          );
        });
        
      };
      let [flatListItems, setFlatListItems] = useState([]);
      let [getid, setid] = useState('');
      useEffect(() => {
        db.transaction((tx) => {
          tx.executeSql('SELECT * FROM table_courses', [], (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
            setFlatListItems(temp);
          });
        });
      }, []);
    
      let listViewItemSeparator = () => {
        return (
          <View
            style={{ height: 0.2, width: '100%', backgroundColor: '#808080' }}
          />
        );
      };
      const delete_user = () => {
  
        db.transaction((tx) => {
          tx.executeSql(
            'DELETE FROM  table_courses where co_id=?',
            [getid],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                Alert.alert(
                  'Success',
                  'User deleted successfully',
                  [
                    {
                      text: 'Ok',
                      onPress: () => {navigation.navigate('Admin')},
                    },
                  ],
                  { cancelable: false }
                );
                setid(null)
                
              }
              else {
               remove
              }
            }
          );
        });
      
      };
      const remove=()=>{
        if(getid!== null){
          console.log(getid)
        db.transaction((tx) => {
          tx.executeSql(
            'DELETE FROM  table_courses where co_id=?',
            [getid],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                Alert.alert(
                  'Success',
                  'Course deleted successfully',
                  [
                    {
                      text: 'Ok',
                      onPress: () => navigation.navigate('Admin'),
                      
                    
                    },
                  ],
                  { cancelable: false }
                );
                setid(null)
              } else {
                db.transaction((tx) => {
                  tx.executeSql(
                    'DELETE FROM  table_courses where co_id=?',
                    [getid],
                    (tx, results) => {
                      console.log('Results', results.rowsAffected);
                      if (results.rowsAffected > 0) {
                        Alert.alert(
                          'Success',
                          'Course deleted successfully',
                          [
                            {
                              text: 'Ok',
                              onPress: () => navigation.navigate('Admin'),
                              
                            
                            },
                          ],
                          { cancelable: false }
                        );
                        setid(null)
                      } else {
                        alert('failed to remove user')
                      }
                    }
                  );
                });
              }
            }
          );
        });
      }
      }
      let listItemView = (item) => {
        return (
          <View
            key={item.co_id}
            style={{ flexDirection: 'column',marginLeft:10, borderColor: '#050505', borderWidth: 2, marginBottom: 5,marginBottom:10, backgroundColor: 'white',alignContent:'center',alignSelf:'auto',justifyContent:'center',marginleft:10,marginRight:10,marginTop:5}}>
          
            <Text style={styles.text} >Id: {item.co_id}</Text>
            <Text style={styles.text}>Name: {item.co_name}</Text>
            <Text style={styles.text}>Description: {item.co_desc}</Text>
            <Button mode="contained" onPress={()=>{delete_user(setid(item.co_id))}} style={styles.registerbutton}>
       Delete
        </Button>
            </View>
        );
      };
    return (
        <View style={{ flex: 1 }}>
    
    <View style={{ backgroundColor: 'white', flexDirection: 'row' ,marginTop:10}}>
                     <Icon name='chevron-left' size={50} style={{ alignSelf: 'center',marginTop:0 }} onPress={() =>navigation.navigate("Admin")}></Icon>
                     <Text style={{ color: '#000080', marginTop: 10, marginBottom: 0, fontSize: 20, fontWeight: 'bold',textAlign:'center' }}>Add course</Text>
                </View>
          <View style={{ flex: 5, backgroundColor: "#F0B27A" }}>
    
            <View style={{ flex: 5, backgroundColor: "white", borderBottomLeftRadius: 100,  }}>
            <TextInput placeholder="Course Name" placeholderColor="Black" style={styles.textinput} onChangeText={(textinputcoursename) => setTextInputcoursename(textinputcoursename)}  />
              <TextInput placeholder="Course description" placeholderColor="Black" style={styles.textinput} onChangeText={(textinputcoursedesc) => setTextInputcoursedesc(textinputcoursedesc)} maxLength={225}
                numberOfLines={5}
                multiline={true} />
              <Button mode="contained" onPress={add_Course} style={styles.registerbutton}>Add New Courses</Button>
              <FlatList
            data={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
            </View>
          </View>
          <View style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ flex: 1, backgroundColor: "#F0B27A", borderTopEndRadius: 100 }}></View>
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
        marginBottom:20,
        alignSelf:'center',
        width: "auto",
        height: "auto",
        backgroundColor: '#228B22', 
        borderRadius: 15,
      },
    })
export default AddCourseScreen;