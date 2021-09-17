import React ,{ useState,useEffect,useRef} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar, Image, TouchableOpacity, VirtualizedList, RecyclerViewBackedScrollView,FlatList, TabBarIOSItem,Alert
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Button, TextInput, IconButton, Colors } from "react-native-paper";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';

import { openDatabase } from 'react-native-sqlite-storage';
import { Value } from 'react-native-reanimated';

var db = openDatabase({ name: 'UserDatabase.db' });

const TeacherQreplyscreen = ({ navigation }) => {
  
  const [value, setValue] = useState('');
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState('');
  console.log(value)

  const controller = useRef(null);
    const [textInputid, setTextInputid] = useState('');
    const [TextInputanswer, setTextInputanswer] = useState('');
    const [country, setcountry] = useState({})
	
   
    const [ditems, setditems] = useState()

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
const updatereply = () => {

    
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE table_questions set answer=? where q_id=?',
        [TextInputanswer,textInputid],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
           
            db.transaction((tx) => {
                tx.executeSql('SELECT * FROM table_questions', [], (tx, results) => {
                  var temp = [];
                  for (let i = 0; i < results.rows.length; ++i)
                    temp.push(results.rows.item(i));
                  setFlatListItems(temp);
                });
              });
          } else alert('Updation Failed');
        }
      );
    });
  };

      const [flatListItems, setFlatListItems] = useState([]);
      useEffect(() => {
        
     
          console.log("value is not null")
          db.transaction((tx) => {
            tx.executeSql('SELECT * FROM table_questions where q_subject = ?', [value], (tx, results) => {
              var temp = [];
              for (let i = 0; i < results.rows.length; ++i)
                temp.push(results.rows.item(i));
              setFlatListItems(temp);
            });
        });
        
    
        
      }, []);
      db.transaction((tx) => {
        tx.executeSql('SELECT * FROM table_questions where q_subject = ?', [value], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
        });
    });
    
         console.log("value is null")
         db.transaction((tx) => {
           tx.executeSql('SELECT * FROM table_questions ', [], (tx, results) => {
             var temp = [];
             for (let i = 0; i < results.rows.length; ++i)
               temp.push(results.rows.item(i));
             setFlatListItems(temp);
           });
         });
      
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
     
    
      const listViewItemSeparator = () => {
        return (
          <View
            style={{ height: 0.2, width: '100%', backgroundColor: '#808080' }}
          />
        );
      };
    
      const listItemView = (item) => {
        return (
          <View
            key={item.co_id}
            style={{ flexDirection: 'column',marginLeft:10, borderColor: '#050505', borderWidth: 2, marginBottom: 5,marginBottom:10, backgroundColor: 'white',alignContent:'center',alignSelf:'auto',justifyContent:'center',marginleft:10,marginRight:10,marginTop:5 ,borderRadius:10}}>
<Text style={{ marginLeft: 10 ,marginRight:10, color: '#000080', marginTop: 0, marginBottom: 0, fontSize: 15, fontWeight: 'bold', }}>Question Id:{item.q_id}</Text>
                        <Text style={{ marginLeft: 10 ,marginRight:10, color: '#000080', marginTop: 0, marginBottom: 0, fontSize: 15, fontWeight: 'bold', }}>Question Subject:{item.q_subject}</Text>
                        <Text style={{ marginLeft: 10 ,marginRight:10, color: 'green', marginTop: 0, marginBottom: 5, fontSize: 15, fontWeight: 'bold', }}> Description: {item.q_desc}</Text>
                        <Text style={{ marginLeft: 10 ,marginRight:10, color: 'green', marginTop: 0, marginBottom: 5, fontSize: 15, fontWeight: 'bold', }}> User Id: {item.user_id}</Text>
                        <Text style={{ marginLeft: 10 ,marginRight:10, color: 'green', marginTop: 0, marginBottom: 5, fontSize: 15, fontWeight: 'bold', }}> Answer: {item.answer}</Text>
                        
                      
           
          </View>
        );
      };
      
     
      
    return(
  
            <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: 'white', flexDirection: 'row' ,marginTop:10}}>
                     <Icon name='chevron-left' size={50} style={{ alignSelf: 'center',marginTop:0 }} onPress={() =>navigation.navigate("Teacher")}></Icon>
                     <Text style={{ color: '#000080', marginTop: 10, marginBottom: 0, fontSize: 20, fontWeight: 'bold',textAlign:'center' }}>Queries</Text>
                </View>
              
                <View style={{ flex: 6, backgroundColor: '#000080', }}>
                  
                    <View style={{ flex: 6, backgroundColor: 'white', borderBottomLeftRadius: 250 }}>
                    <DropDownPicker
                     containerStyle={{width: 390, height: 50 , paddingLeft:20, backgroundColor: 'white',zIndex: 1000, elevation: 1000,}}
                       placeholder="Filter By course"
                        items={items}
						open={open}
						setOpen={setOpen}
                        controller={instance => controller.current = instance}
                        onChangeList={(items, callback) => {
                            Promise.resolve(setItems(items))
                                .then(() => callback());
                        }}

                        defaultValue={value}
                        onChangeItem={item => setValue(item.value)}/>
                        <Text style={{ marginLeft: 20, color: '#000080', marginTop: 10, marginBottom: 5, fontSize: 15, fontWeight: 'bold', alignItems: 'center' }}>Send your doubts or request and we will answer it as soon as possible</Text>
                        <View style={{flex:6,borderColor:"blue",borderWidth:2,marginLeft:20,marginRight:20,borderRadius:20,backgroundColor:"white",}}>
                     
                        <Text style={{ marginLeft: 10 , color: '#000080', marginTop: 10, marginBottom: 5, fontSize: 15, fontWeight: 'bold', alignItems: 'center' }}>Queries:</Text>
                        
                        <FlatList
                         data={flatListItems}
                         ItemSeparatorComponent={listViewItemSeparator}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => listItemView(item)}/>
                        <TextInput placeholder="Query Id" placeholderColor="Black" style={styles.textinputSub}  onChangeText={(value) => setTextInputid(value)}/>
                        <TextInput placeholder="Answer" placeholderColor="Black" multiline={true} style={styles.textinputdesc} onChangeText={(value) => setTextInputanswer(value)}  />
                      
                        
                        </View>
                    </View>

                </View>
                <View style={{ flex: 1, backgroundColor: 'white', }}>
                    <View style={{ flex: 1, backgroundColor: '#000080', borderTopEndRadius: 85, }}>
                    <Button mode="contained" onPress={updatereply} style={styles.questionButton} > Send </Button>
                    </View>
                </View>


            </View>
        
    );
}
export default TeacherQreplyscreen;
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