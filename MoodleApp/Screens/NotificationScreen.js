import React ,{ useState,useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    
    View,
    Text,
    StatusBar, Image, TouchableOpacity, VirtualizedList, RecyclerViewBackedScrollView,FlatList
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });



const NotificationScreen = ({ navigation }) => {

   const [isLoading, setLoading] = useState(true);
   const [data, setData] = useState([]);
   console.log(data);
 useEffect(() => {
 //fetch('https:stage.moodle.orena.solutions/webservice/rest/server.php?wstoken=f13ea38ba5b9f6e04aa566104960157f&moodlewsrestformat=json&wsfunction=core_course_get_courses')
   //.then((response) => response.json())
   //.then((json) => setData(json))
   //.catch((error) => console.error(error))
   //.finally(() => setLoading(false));
 }, []);
let [flatListItems, setFlatListItems] = useState([]);

useEffect(() => {
  db.transaction((tx) => {
    tx.executeSql('SELECT * FROM table_calevent', [], (tx, results) => {
      var temp = [];
      for (let i = 0; i < results.rows.length; ++i)
        temp.push(results.rows.item(i));
      setFlatListItems(temp);
    });
  });
}, []);



let listItemView = (item) => {
  return (
    <View
      key={item.co_id}
      style={{ flexDirection: 'column',marginLeft:10, borderColor: '#050505', borderWidth: 2, marginBottom: 5,marginBottom:10, backgroundColor: 'white',alignContent:'center',alignSelf:'auto',justifyContent:'center',marginleft:10,marginRight:10,marginTop:5}}>
     
      <Text style={styles.text}>Event Date: {item.cal_date}</Text>
      <Text style={styles.text}>Event Description: {item.cal_desc}</Text>
     
    
    </View>
  );
};

    return(
      <View style={{ flex: 1 }}>
    
      <View style={{ backgroundColor: 'white', flexDirection: 'row' ,marginTop:10}}>
                       <Icon name='chevron-left' size={50} style={{ alignSelf: 'center',marginTop:0}}onPress={()=>navigation.navigate('Elearning')} ></Icon>
                       <Text style={{ color: '#000080', marginTop: 10, marginBottom: 0, fontSize: 20, fontWeight: 'bold',textAlign:'center' }}>Notifications</Text>
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
export default NotificationScreen;
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