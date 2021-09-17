import React, { useState, useEffect ,useRef } from 'react';
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
import DatePicker from 'react-native-datepicker'
import { openDatabase } from 'react-native-sqlite-storage';
import Moment from 'moment';
var db = openDatabase({ name: 'UserDatabase.db' });


const AddQuizScreen = ({navigation}) => {
    const [quiztitle, setquiztitle] = useState('');
    const [quizdesc,setquizdesc ] = useState('');
    const[quizfile,setquizfile] = useState('');
    const[quizlink,setquizlink] = useState('');
    const [date,setdate ] = useState('');
    const [value, setValue] = useState('');
    const [items, setItems] = useState([]);
    const [userid, setuserid] = useState('');
    const [course, setcourse] = useState('');
    console.log(course)
    console.log(value)
console.log(date)
const controller = useRef(null);
const onDateChange = (date, type) => {
    setdate(Moment(date).format("YYYY-MM-DD"))

  };
  
   const  add_Course = () => {

        db.transaction(function (tx) {
          tx.executeSql(
            'INSERT INTO table_Quiz (Q_title, Q_desc, Q_date , Q_upload ,Q_link, co_id) VALUES (?,?,?,?,?,?)',
            [quiztitle,quizdesc,date,quizlink,quizfile,value],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                Alert.alert(
                  'Success',
                  'Quiz uploaded succesfully',
                  [
                    {
                      text: 'Ok',
                     
                    },
                  ],
                  { cancelable: false }
                  
                );
               
                  db.transaction((tx) => {
                    tx.executeSql('SELECT * FROM table_Quiz', [], (tx, results) => {
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
    
    
     
    return (
        <View style={{ flex: 1 }}>
    
    <View style={{ backgroundColor: 'white', flexDirection: 'row' ,marginTop:10}}>
                     <Icon name='chevron-left' size={50} style={{ alignSelf: 'center',marginTop:0 }} onPress={() =>navigation.navigate("Teacher")}></Icon>
                     <Text style={{ color: '#000080', marginTop: 10, marginBottom: 0, fontSize: 20, fontWeight: 'bold',textAlign:'center' }}>Add Quiz</Text>
                </View>
          <View style={{ flex: 5, backgroundColor: "#F0B27A" }}>
    
            <View style={{ flex: 5, backgroundColor: "white", borderBottomLeftRadius: 100,  }}>
            <TextInput placeholder="Quiz Title" placeholderColor="Black" style={styles.textinput} onChangeText={(quiztitle) => setquiztitle(quiztitle)}  /> 
              <TextInput placeholder="Quiz description" placeholderColor="Black" style={styles.textinput} onChangeText={(quizdesc) => setquizdesc(quizdesc)} maxLength={225}
                numberOfLines={5}
                multiline={true} />
                <DropDownPicker
                     containerStyle={{width: 'auto', height: 50}}
                       placeholder="Please Select Course"
                       dropDownMaxHeight={'auto'}
                        items={items}
                        controller={instance => controller.current = instance}
                        onChangeList={(items, callback) => {
                            Promise.resolve(setItems(items))
                                .then(() => callback());
                        }}
                        defaultValue={value}
                        onChangeItem={item => setValue(item.value)}/>
                <TextInput placeholder="Quiz File" placeholderColor="Black" style={styles.textinput} onChangeText={(quizfile) => setquizfile(quizfile)} maxLength={225}
                numberOfLines={5}
                multiline={true} />
                   <TextInput placeholder="Upload Link" placeholderColor="Black" style={styles.textinput} onChangeText={(quizlink) => setquizlink(quizlink)} maxLength={225}
                numberOfLines={5}
                multiline={true} />
               <DatePicker
        style={styles.selectdate}
        date={date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="1901-01-01"
          maxDate="3000-01-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {
            setDate(date);
		}}
      />
              <Button mode="contained" onPress={add_Course} style={styles.registerbutton}>Add Quiz</Button>
             
          
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
      selectdate: {
        height: 43,
        width:'auto',
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
    })
export default AddQuizScreen;