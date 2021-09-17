import React ,{ useState,useEffect,useRef } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar, Image, TouchableOpacity, VirtualizedList, RecyclerViewBackedScrollView,FlatList, TabBarIOSItem,Alert
} from 'react-native';

import { Button, TextInput, IconButton, Colors } from "react-native-paper";
import { color } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import BottomSheet from 'reanimated-bottom-sheet';
import { openDatabase } from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-community/async-storage';
var db = openDatabase({ name: 'UserDatabase.db' });

const QuestionsScreen = ({ navigation }) => {
    const [textInputSubject, setTextInputsubject] = useState('');
    const [textInputdescription, setTextInputdescription] = useState('');
    const [value, setValue] = useState('');
    const [items, setItems] = useState([]);
    const [userid, setuserid] = useState('');
	const [open, setOpen] = useState('');
    console.log(value)
    console.log('user id is' +userid)
    const controller = useRef(null);
    useEffect(() => {
      getData()
    }, [])
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
const getData = async () => {
  try {
    const userid = await AsyncStorage.getItem('userid')
    const usertype = await AsyncStorage.getItem('usertype')
    //console.log("user id is" +userid)
    //console.log("user type is "+usertype)
//setuserid(userid)
   
  } catch(e) {
     //error reading value
  }
}
const  add_query = () => {
    console.log('in add course')
        db.transaction(function (tx) {
          tx.executeSql(
            'INSERT INTO table_questions (q_subject, q_desc,user_id) VALUES (?,?,?)',
            [textInputSubject,textInputdescription,userid],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                Alert.alert(
                  'Success',
                  'Query Added Succesfully',
                  [
                    {
                      text: 'Ok',
                     
                    },
                  ],
                  { cancelable: false }
                  
                );
               
                
                
              } else alert('Unable to add course');
            }
          );
        });
        4
      };
      db.transaction((tx) => {
        tx.executeSql('SELECT * FROM table_questions', [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
        });
      });
      let [flatListItems, setFlatListItems] = useState([]);
      useEffect(() => {
        db.transaction((tx) => {
          tx.executeSql('SELECT * FROM table_questions where user_id = ?', [userid], (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
            setFlatListItems(temp);
          });
        });
      }, []);
      useEffect(() => {
        db.transaction((tx) => {
          tx.executeSql('SELECT * FROM table_courses', [], (tx, results) => {
            var len = results.rows.length;

            var temp = [];
            for (let i = 0; i < len; i++) {
                 let row = results.rows.item(i);
                 temp.push({label: row.co_name ,value: row.co_name});
                 setItems(temp)
             }
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
    
      let listItemView = (item) => {
        return (
          <View
            key={item.co_id}
            style={{ flexDirection: 'column',marginLeft:10, borderColor: '#050505', borderWidth: 2, marginBottom: 5,marginBottom:10, backgroundColor: 'white',alignContent:'center',alignSelf:'auto',justifyContent:'center',marginleft:10,marginRight:10,marginTop:5 ,borderRadius:10}}>

                        <Text style={{ marginLeft: 10 ,marginRight:10, color: '#000080', marginTop: 0, marginBottom: 0, fontSize: 15, fontWeight: 'bold', }}>Question Subject:{item.q_subject}</Text>
                        <Text style={{ marginLeft: 10 ,marginRight:10, color: 'green', marginTop: 0, marginBottom: 5, fontSize: 15, fontWeight: 'bold', }}> Description: {item.q_desc}</Text>
                        <Text style={{ marginLeft: 10 ,marginRight:10, color: 'green', marginTop: 0, marginBottom: 5, fontSize: 15, fontWeight: 'bold', }}> Answer: {item.answer}</Text>
                      
           
          </View>
        );
      };
    return(
      
            <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: 'white', flexDirection: 'row' ,marginTop:10}}>
                     <Icon name='chevron-left' size={50} style={{ alignSelf: 'center',marginTop:0 }} onPress={() =>navigation.navigate("Elearning")}></Icon>
                     <Text style={{ color: '#000080', marginTop: 10, marginBottom: 0, fontSize: 20, fontWeight: 'bold',textAlign:'center' }}>Questions</Text>
                </View>

                <View style={{ flex: 6, backgroundColor: '#000080', }}>
                  
                    <View style={{ flex: 6, backgroundColor: 'white', borderBottomLeftRadius: 250 }}>
                        <Text style={{ marginLeft: 20, color: '#000080', marginTop: 10, marginBottom: 5, fontSize: 15, fontWeight: 'bold', alignItems: 'center' }}>Send your doubts or request and we will answer it as soon as possible</Text>
                        <View style={{flex:6,borderColor:"blue",borderWidth:2,marginLeft:20,marginRight:20,borderRadius:20,backgroundColor:"white",}}>
                     
                        <Text style={{ marginLeft: 10 , color: '#000080', marginTop: 10, marginBottom: 5, fontSize: 15, fontWeight: 'bold', alignItems: 'center' }}>Previous Answers:</Text>
                        
                        <FlatList
                         data={flatListItems}
                         ItemSeparatorComponent={listViewItemSeparator}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => listItemView(item)}
                            />
                        
                        
                      
                        
                        
                        <DropDownPicker
                        style={{marginLeft:15,marginRight:10 ,marginbottom:5}}
                       containerStyle={{width: 340, height: 50 ,paddingBottom:100 , backgroundColor: 'white',zIndex: 1000, elevation: 1000, }}
                       placeholder="Please Select Course"
                       dropDownMaxHeight={'auto'}
                        items={items}
						open={open}
						setOpen={setOpen}
                        controller={instance => controller.current = instance}
                        onChangeList={(items, callback) => { Promise.resolve(setItems(items)).then(() => callback());
                        }}
                        defaultValue={value}
                        onChangeItem={item => setTextInputsubject(item.value)}/>
                        
                        <TextInput placeholder="Description" placeholderColor="Black" multiline={true} style={styles.textinputdesc} onChangeText={(value) => setTextInputdescription(value)}  />
                      
                        
                        </View>
                    </View>

                </View>
                <View style={{ flex: 1, backgroundColor: 'white', }}>
                    <View style={{ flex: 1, backgroundColor: '#000080', borderTopEndRadius: 85, }}>
                    <Button mode="contained" onPress={add_query} style={styles.questionButton} > Send </Button>
                    </View>
                </View>


            </View>
  
    );
}
export default QuestionsScreen;
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
          
        marginTop: 10,
        marginBottom:10,
        marginRight:15,
        alignSelf:'center',
        width: 'auto',
        height: 'auto',
        backgroundColor: '#228B22', 
        borderRadius: 15,
      },
})