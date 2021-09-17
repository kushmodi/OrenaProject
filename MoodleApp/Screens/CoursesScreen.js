import React ,{ useState,useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    
    View,
    Text,
    StatusBar, Image, TouchableOpacity, VirtualizedList, RecyclerViewBackedScrollView,FlatList,Alert
} from 'react-native';
import { Button, TextInput , IconButton, Colors} from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });



const CoursesScreen = ({ navigation }) => {

//   const [isLoading, setLoading] = useState(true);
//   const [data, setData] = useState([]);
//   console.log(data);
// useEffect(() => {
// fetch('https://stage.moodle.orena.solutions/webservice/rest/server.php?wstoken=f13ea38ba5b9f6e04aa566104960157f&moodlewsrestformat=json&wsfunction=core_course_get_courses')
//   .then((response) => response.json())
//   .then((json) => setData(json))
//   .catch((error) => console.error(error))
//   .finally(() => setLoading(false));
// }, []);
let [flatListItems1, setFlatListItems1] = useState([]);
let [flatListItems, setFlatListItems] = useState([]);
let [coid,setcoid] = useState();
let [usersid,setuser] = useState('');
let [id,setid] = useState('');
console.log("course id"+coid)
console.log("user id"+usersid)
console.log(flatListItems1.user_id)

const getData = async () => {
  try {
    const userid = await AsyncStorage.getItem('userid')
    const usertype = await AsyncStorage.getItem('usertype')
    console.log("user id is" +userid)
    console.log("user type is "+usertype)
setuser(userid)
   
  } catch(e) {
    // error reading value
  }
}
useEffect(() => {
  db.transaction((tx) => {
    tx.executeSql('SELECT * FROM table_users where user_id=?', [usersid], (tx, results) => {
      var temp = [];
      for (let i = 0; i < results.rows.length; ++i)
        temp.push(results.rows.item(i).co_id);
      setFlatListItems1(temp);
    });
  });
  getData()
}, []);
useEffect(() => {
  db.transaction((tx) => {
    tx.executeSql('SELECT * FROM table_courses', [], (tx, results) => {
      var temp = [];
      for (let i = 0; i < results.rows.length; ++i)
        temp.push(results.rows.item(i));
      setFlatListItems(temp);
    });
  });
  getData()

}, []);
const check =()=>{
if(coid !== null){
console.log("notNull")
enroll()
}
else{
  console.log('null')
}
}


const enroll = () => {
  if(coid !==null){
    setid(coid)
   
   console.log('infunction'+id)
   if(coid !==null){
   db.transaction((tx) => {
    tx.executeSql(
      'UPDATE table_users set co_id=? where user_id=?',
      [coid, usersid],
      (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          Alert.alert(
            'Success',
            'Course Enrolled successfully',
            [
              {
                text: 'Ok',
                onPress: () => navigation.navigate('Elearning'),
               
              },
            ], 
            { cancelable: false }
          );
        } 
        else {
          db.transaction((tx) => {
            tx.executeSql(
              'UPDATE table_users set co_id=? where user_id=?',
              [coid, usersid],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'Course Enrolled successfully',
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
            remove()
          });
        }
      }
    );
  });
   }
  }
};



let listItemView = (item) => {
  return (
    <View
      key={item.co_id}
      style={{ flexDirection: 'column',marginLeft:10, borderColor: '#050505', borderWidth: 2, marginBottom: 5,marginBottom:10, backgroundColor: 'white',alignContent:'center',alignSelf:'auto',justifyContent:'center',marginleft:10,marginRight:10,marginTop:5}}>
     
      <Text style={styles.text}>Course Name: {item.co_name}</Text>
      <Text style={styles.text}>Course Description: {item.co_desc}</Text>
      <Button mode="contained" onPress={()=>{check(setcoid(item.co_id))}} style={styles.enroll}>Enroll Now</Button>
    </View>
  );
};

    return(
      <View style={{ flex: 1 }}>
    
      <View style={{ backgroundColor: 'white', flexDirection: 'row' ,marginTop:10}}>
                       <Icon name='chevron-left' size={50} style={{ alignSelf: 'center',marginTop:0}} onPress={()=>navigation.navigate('Elearning')} ></Icon>
                       <Text style={{ color: '#000080', marginTop: 10, marginBottom: 0, fontSize: 20, fontWeight: 'bold',textAlign:'center' }}>Courses</Text>
                  </View>
            <View style={{ flex: 5, backgroundColor: "#F0B27A" }}>
      
              <View style={{ flex: 5, backgroundColor: "white", borderBottomLeftRadius: 100,  }}>
              <FlatList
              data={flatListItems}
              
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
export default CoursesScreen;
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
    
     marginBottom: 5,
    marginTop: 5,
    textDecorationColor: 'black',
    fontSize: 20, fontWeight: 'normal',
    textAlign:'center'
  },
  
  enroll: {
    marginTop: 0,
    marginBottom:10,
    alignSelf:'center',
    width: "auto",
    height: "auto",
    backgroundColor: '#228B22', 
    borderRadius: 15,
  },

})