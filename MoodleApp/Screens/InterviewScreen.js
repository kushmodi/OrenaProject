import React ,{ useState,useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    FlatList,
    View,
    Text,  TouchableOpacity,Alert, Button,Linking
   
} from 'react-native';



import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//import CalendarPicker from the package we installed
import CalendarPicker from 'react-native-calendar-picker';


const IntervireScreen = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
  useEffect(() => {
   // fetch('https://stage.moodle.orena.solutions/login/token.php?username=pratik&password=Student@12&service=moodle_mobile_app')
     // .then((response) => response.json())
      //.then((json) => setData1(json))
      //.catch((error) => console.error(error))
      //.finally(() => setLoading(false));
    }, []);
    console.log(data1);
  console.log(data);
  useEffect(() => {
  //fetch('https://stage.moodle.orena.solutions/webservice/rest/server.php?wstoken=f13ea38ba5b9f6e04aa566104960157f&moodlewsrestformat=json&wsfunction=core_course_get_courses')
    //.then((response) => response.json())
    //.then((json) => setData(json))
    //.catch((error) => console.error(error))
    //.finally(() => setLoading(false));
  }, []);
  
 
    return(
            <View style={{ flex: 1  ,backgroundColor:'white'}}>
                <View style={{ flex: 7, backgroundColor: '#000080', }}>
                    <View style={{ flex: 7, backgroundColor: 'white', borderBottomLeftRadius: 100 }}>
                    <View style={{ backgroundColor: 'white', flexDirection: 'row' ,marginTop:0}}>
                     <Icon name='chevron-left' size={50} style={{ alignSelf: 'center',marginTop:0 }} onPress={() =>navigation.navigate("Placement")}></Icon>
                     <Text style={{ color: '#000080', marginTop: 0, marginBottom: 0, fontSize: 20, fontWeight: 'bold',alignSelf:'center' }}>Interview</Text>
                     </View>
                     <View style={{ flex: 6, justifyContent:'center',alignItems:'center' }}>
                    
      <Text style={styles.text1}>{data1.token}</Text>
      <Text style={styles.text1}>{data1.privatetoken}</Text>
           
      {isLoading ? <Text>Loading...</Text> : 
      (      
          <FlatList style={{falignContent:'center',alignSelf:'center'}}
          style={{marginBottom:20}}
            data={data}
            keyExtractor={({ id }, index) => id}  
            renderItem={({ item }) => (              
              <View style={{ flexDirection: 'column', borderColor: '#050505', borderWidth: 2, borderRadius: 15, marginBottom: 5, backgroundColor: 'white',alignContent:'space-between',justifyContent:'space-evenly',alignItems:'center',alignItems:'center',marginLeft:5,marginRight:5}}>
             
                <Text style={styles.text}>{item.id }</Text>
                <Text>{item.fullname }</Text>     
                <Text>{item.displayname }</Text> 
                <Text>{item.visible }</Text> 
                <Text style={styles.TextStyle} onPress={() => Linking.openURL('https://www.npmjs.com/package/react-native-calendars/')} >Click Here To Open react calender.</Text>
<Text style={styles.TextStyle} onPress={() => Linking.openURL('https://www.youtube.com/')} >Click Here To Open Youtube.</Text>
<Text style={styles.TextStyle} onPress={() => Linking.openURL('https://us04web.zoom.us/s/8612423288?pwd=WnBzb0xtajRqTlpOVzJjM1BsLytkZz09#success/')} >Click Here To Start Meeting.</Text>
   
             
                             
             
            </View>
            )}
          />       
      )}   
     </View>
   </View>
  </View>
       <View style={{ flex: 1, backgroundColor: 'white', }}>
       <View style={{ flex: 1, backgroundColor: '#000080', borderTopEndRadius: 200, }}>
        </View>
      </View>     
</View>
       
    );}
export default IntervireScreen;
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
      text1: {
        fontWeight: 'bold',
        marginLeft: 10,
        marginRight: 10,
        borderColor: '#050505',
        color: '#050505',
        backgroundColor: 'transparent',
        padding: 2,
        fontSize: 13,
        margin:10
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
        marginLeft:70,
       marginRight:50,
        borderRadius: 13,
        borderColor:'red',
        borderWidth:1,
        backgroundColor: 'transparent',
     justifyContent:'flex-end',
        marginTop: 5,
        marginBottom: 5,
        fontSize: 10,
        fontWeight: 'bold',
      },
      textStyle: {
        marginTop: 10,
        marginLeft:20,
        marginRight:20,
      },
      MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      TextStyle: {
        width:200,
        height:40,
        color: 'blue',
        textDecorationLine: 'underline',
        textShadowColor:'blue',
        textAlign:'center', 
        alignContent:'center',   
        borderRadius:10,
        borderWidth:1,
        marginLeft:50,
        marginRight:15,
        marginTop:15,
        marginBottom:15,
      }
})