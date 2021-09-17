import React ,{ useState,useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    
    View,
    Text,
    StatusBar, Image, TouchableOpacity, VirtualizedList, RecyclerViewBackedScrollView,FlatList
} from 'react-native';
import { Button, } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';




const TrainingScreen = ({ navigation }) => {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log(data);
useEffect(() => {
fetch('https://stage.moodle.orena.solutions/webservice/rest/server.php?wstoken=f13ea38ba5b9f6e04aa566104960157f&moodlewsrestformat=json&wsfunction=core_course_get_courses')
  .then((response) => response.json())
  .then((json) => setData(json))
}, []);
    return(
      
            <View style={{ flex: 1  ,backgroundColor:'white'}}>
                <View style={{ backgroundColor: 'white', flexDirection: 'row' ,marginTop:10}}>
                     <Icon name='chevron-left' size={50} style={{ alignSelf: 'center',marginTop:0 }} onPress={() =>navigation.navigate("Placement")}></Icon>
                     <Text style={{ color: '#000080', marginTop: 0, marginBottom: 0, fontSize: 20, fontWeight: 'bold',alignSelf:'center' }}>Training </Text>
                </View>

                <View style={{ flex: 7, backgroundColor: '#000080', }}>
                  
                    <View style={{ flex: 7, backgroundColor: 'white', borderBottomLeftRadius: 60  ,justifyContent:'center',alignItems:'center'}}>
                      
                   
                     {isLoading ? <Text style={{alignSelf:'center',justifyContent:'center',fontSize:20}}>Hold on while we get Training Course...</Text> : 
      (      
          <FlatList
          style={{marginBottom:20}}
            data={data}
            keyExtractor={({ id }, index) => id.toString()}  
            renderItem={({ item }) => (              
              <View style={{ flexDirection: 'column',marginLeft:10, borderColor: '#050505', borderWidth: 2, marginBottom: 5,marginBottom:10, backgroundColor: 'white',alignContent:'center',alignSelf:'auto',justifyContent:'center',marginleft:10,marginRight:10}}>
                <Text style={styles.text}>Course Id:- {item.id }</Text>
                <Text style={styles.text}>Full Name:- {item.fullname }</Text>     
                <Text style={styles.text}>Display Name:- {item.displayname }</Text> 
                <Text style={styles.text}>Visible:- {item.visible }</Text> 
                <Text style={styles.text}>Short Name:- {item.shortname }</Text>           
                <Text style={styles.text}>Summary Format:- {item.summaryformat }</Text> 
                <Text style={styles.text}>Format:- {item.format }</Text> 
                <Text style={styles.text}>Show Grades:- {item.showgrades }</Text> 
                <Button mode="contained" onPress={()=>console.log(item.id,item.fullname,item.displayname)} style={styles.getidButton}>enroll now</Button> 
            </View>
            )}
          />       
      )}   
             
                       
                  
                    </View>

                </View>
                <View style={{ flex: 1, backgroundColor: 'white', }}>
                    <View style={{ flex: 1, backgroundColor: '#000080', borderTopEndRadius: 200, }}>
                    </View>
                </View>


            </View>
      
    );
}
export default TrainingScreen;
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
      getidButton: {
        marginTop: 10,
        marginBottom:10,
        alignSelf:'center',
        width: "auto",
        height: "auto",
        backgroundColor: '#228B22', 
        borderRadius: 15,
        
      },
})