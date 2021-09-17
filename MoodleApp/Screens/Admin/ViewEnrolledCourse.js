import React, { useState, useEffect ,useRef} from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text, Alert,
     TouchableOpacity,FlatList,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button, TextInput , IconButton, Colors} from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });


const ViewEnrolledCourse = ({navigation}) => {
  
    const [value, setValue] = useState('');
    const [items, setItems] = useState([]);
const controller = useRef(null);
console.log(value)  
      let [flatListItems, setFlatListItems] = useState([]);
      
      const get=() => {
        db.transaction((tx) => {
          tx.executeSql('SELECT * FROM table_users where co_id=?', [value], (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
            setFlatListItems(temp);
          });
        });
      } 
      db.transaction((tx) => {
        tx.executeSql('SELECT * FROM table_users where co_id=?', [value], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
        });
      });
    
      let listViewItemSeparator = () => {
        return (
          <View
            style={{ height: 0.2, width: '100%', backgroundColor: '#808080' }}
          />
        );
      };
   
      useEffect(() => {
        db.transaction((tx) => {
          tx.executeSql('SELECT * FROM table_courses', [], (tx, results) => {
            var len = results.rows.length;

            var temp = [];
            for (let i = 0; i < len; i++) {
                 let row = results.rows.item(i);
                 temp.push({label: row.co_name ,value: row.co_id});
                 setItems(temp)
             }
          });
        });
      }, []);
     
      
      let listItemView = (item) => {
        return (
          <View
            key={item.co_id}
            style={{ flexDirection: 'column',marginLeft:10, borderColor: '#050505', borderWidth: 2, marginBottom: 5,marginBottom:10, backgroundColor: 'white',alignContent:'center',alignSelf:'auto',justifyContent:'center',marginleft:10,marginRight:10,marginTop:5}}>
          
            <Text style={styles.text} >user Id: {item.user_id}</Text>
            <Text style={styles.text}>User Name: {item.user_name}</Text>
            <Text style={styles.text}>course id: {item.co_id}</Text>
          
   
            </View>
        );
      };
    return (
        <View style={{ flex: 1 }}>
    
    <View style={{ backgroundColor: 'white', flexDirection: 'row' ,marginTop:10}}>
                     <Icon name='chevron-left' size={50} style={{ alignSelf: 'center',marginTop:0 }} onPress={() =>navigation.navigate("Admin")}></Icon>
                     <Text style={{ color: '#000080', marginTop: 10, marginBottom: 0, fontSize: 20, fontWeight: 'bold',textAlign:'center' }}>Courses Enrolled</Text>
                </View>
          <View style={{ flex: 5, backgroundColor: "#F0B27A" }}>
          
            <View style={{ flex: 5, backgroundColor: "white", borderBottomLeftRadius: 100,  }}>
            <DropDownPicker
                     containerStyle={{width: 'auto', height: 50}}
                       placeholder="Please Select Course"
                       //dropDownMaxHeight={'auto'}
                        items={items}
                        controller={instance => controller.current = instance}
                        onChangeList={(items, callback) => {
                            Promise.resolve(setItems(items))
                                .then(() => callback());
                        }}
                        defaultValue={value}
                        onChangeItem={item => setValue(item.value)}/>
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
export default ViewEnrolledCourse;