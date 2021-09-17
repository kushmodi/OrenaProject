import React ,{useEffect,useState}from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
     TouchableOpacity,FlatList,Linking
} from 'react-native';


import { Button, TextInput , IconButton, Colors} from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });


const QuizScreen = ({navigation}) => {
  let [flatListItems, setFlatListItems] = useState([]);
  const[coid,setcoid] =useState([]);
  const[usersid,setusersid] =useState('');
  console.log("course  co id is"+ coid.co_id)
   
  const get=() => {
   
         db.transaction((tx) => {
      tx.executeSql(
        'SELECT co_id FROM table_users where user_id = ? ',
        [usersid],
        (tx, results) => {
          var len = results.rows.length;
          
          if (len > 0) {
            setcoid(results.rows.item(0));
           
          } 
        })
    });
  
 
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM table_Quiz where co_id =? ', [coid.co_id], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setFlatListItems(temp);
      });
    });
   
    
  }
  
  useEffect(()=>{
    getData();
  })
  const getData = async () => {
    try {
      const userid = await AsyncStorage.getItem('userid')
      const usertype = await AsyncStorage.getItem('usertype')
      console.log("user id is" +userid)
     console.log("user type is "+usertype)
setusersid(userid)
    get()
    } catch(e) {
       //error reading value;
    }
  }
  
       
      
    
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
            style={{ flexDirection: 'column',marginLeft:10, borderColor: '#050505', borderWidth: 2, marginBottom: 5,marginBottom:10, backgroundColor: 'white',alignContent:'center',alignSelf:'auto',justifyContent:'center',marginleft:10,marginRight:10,marginTop:5}}>
            <Text style={styles.text}>Name: {item.q_title}</Text>
            <Text style={styles.text}>Description: {item.q_desc}</Text>
            <Text style={styles.text}>last Submission Date: {item.q_date}</Text>            
            <Button mode="contained"  style={styles.stylebutton} onPress={() => Linking.openURL('https://www.google.com/intl/en_in/drive/')}>View Quiz</Button>
            <Button mode="contained"  style={styles.stylebutton} onPress={() => Linking.openURL('https://www.google.com/intl/en_in/drive/')}>Submit Quiz</Button>
                      
                      
     
          </View>
        );
      };
    return (
        <View style={{ flex: 1 }}>
    
    <View style={{ backgroundColor: 'white', flexDirection: 'row' ,marginTop:10}}>
                     <Icon name='chevron-left' size={50} style={{ alignSelf: 'center',marginTop:0 }} onPress={() =>navigation.navigate("Elearning")}></Icon>
                     <Text style={{ color: '#000080', marginTop: 10, marginBottom: 0, fontSize: 20, fontWeight: 'bold',textAlign:'center' }}>Quiz</Text>
                </View>
          <View style={{ flex: 5, backgroundColor: "#F0B27A" }}>
    
            <View style={{ flex: 5, backgroundColor: "white", borderBottomLeftRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ flex: 5, backgroundColor: "transparent", borderColor: "transparent", borderWidth: 2, borderRadius: 10, height: 200, marginTop: 10, marginLeft: 10, marginRight: 10,width:300 }}>
               
              <FlatList
            data={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
              </View>
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
      stylebutton: {
        marginTop: 10,
        marginBottom:10,
        alignSelf:'center',
        width: "auto",
        height: "auto",
        backgroundColor: '#228B22', 
      
      },
    })
export default QuizScreen;