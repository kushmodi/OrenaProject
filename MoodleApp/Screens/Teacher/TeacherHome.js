import React,{useEffect,useState} from 'react';
import { SafeAreaView,ScrollView,View,Text, Image, TouchableOpacity,  BackHandler, Alert} from 'react-native';
import { Button,  IconButton, } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import { clear } from 'react-native-shared-preferences';
import { openDatabase } from 'react-native-sqlite-storage';


var db = openDatabase({ name: 'UserDatabase.db' });

const TeacherHome = ({ navigation }) => {
  const [value, setValue] = useState('')

  let [flatListItems, setFlatListItems] = useState([]);
  
  useEffect(() => {
    getData()
  }, [])
useEffect(
      React.useCallback(() => {
        const onBackPress = () => {
          Alert.alert("", "Are you sure you want to Exit?", [
            {
              text: "No",
              onPress: () => null,
              style: "cancel"
            },
            { text: "YES", onPress: () => BackHandler.exitApp()
           }
          ]);
          return true;
        };
        // Add Event Listener for hardwareBackPress
        BackHandler.addEventListener(
          'hardwareBackPress',
          onBackPress
        );
        return () => {
          // Once the Screen gets blur Remove Event Listener
          BackHandler.removeEventListener(
            'hardwareBackPress',
            onBackPress
          );
        };
      }, []),
    );
    
      db.transaction((tx) => {
        tx.executeSql('SELECT * FROM table_users where user_id=?', [value], (tx, results) => {
          var len = results.rows.length;
    
      if (len > 0) {
        setFlatListItems(results.rows.item(0));
       
        
      } 
        });
       
      
      });
    
    const getData = async () => {
      try {
        const userid = await AsyncStorage.getItem('userid')
        console.log("user id is" +userid)
            setValue(userid)
          
      } catch(e) {
         //error reading value
      }
    }
 
    const exit=()=>{
      Alert.alert("", "Are you sure you want to Log out?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: clearAll 
        
        }
        ]);
    }
    const clearAll = async () => {
      try {
        await AsyncStorage.clear()
        
      } catch(e) {
        // clear error
      }
      navigation.navigate('Login')
      console.log('Done.')
    }
    return (
        <View style={{ flex: 1, }}>
            <View style={{ flex: 3, flexDirection: 'column', backgroundColor: '#E8ADAA', }}>
                <View style={{ flex: 3, backgroundColor: 'white', borderBottomLeftRadius: 211 }}>
                    <View style={{ flex: 1, marginTop: 20  ,justifyContent:'center' }}>
                        <View style={{ flexDirection: 'row', backgroundColor: 'white', }}>
                            <TouchableOpacity style={{ flex: 1, color: '#E8ADAA' }} onPress={() => navigation.navigate("Tprofile")}>
                                <Text style={{ flex: 1, marginLeft: 20, color: '#E8ADAA', marginTop: 25, marginBottom: 0, fontSize: 20, fontWeight: 'bold' }}>Hi {flatListItems.user_name}!</Text>
                            </TouchableOpacity>
                            <IconButton icon="bell-outline" size={30} onPress={()=> navigation.navigate("teacherNotification")} style={{ marginTop: 20, }}/>
                            <IconButton icon="logout" size={30} onPress={exit} style={{ marginTop: 20, marginLeft: -10 }}/>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white', }}>

<Text style={{ marginLeft: 20, color: '#000080', marginTop: -20, marginBottom: 0, fontSize: 20, fontWeight: 'bold' }}>Welcome</Text>
</View>
                    </View>
                    <View style={{ flex: 2  }}>
                    <View style={{ flexDirection: 'row', marginTop: 0, justifyContent: 'center'  }}>
                            <TouchableOpacity style={{ borderWidth: 2, borderRadius: 10, height: 120, width: 120, alignItems: 'center'  ,backgroundColor:'white'}}  onPress={()=>{navigation.navigate("teacherassignment")}}>
                            <Image style={{ marginLeft: 0, marginTop: 10, width: 75, height: 75 }} source={require('./photos-teacher/task.png')} />
                            <Text style={{ textAlign: 'center', color: '#228B22', marginTop: 0, marginBottom: 15, fontSize: 15, fontWeight: 'bold', color: '#E8ADAA' }}>Give Assignment</Text>
                            </TouchableOpacity >
                            <TouchableOpacity style={{ borderWidth: 2, borderRadius: 10, height: 120, width: 120, marginLeft: 30, alignItems: 'center',backgroundColor:'white'}}   onPress={()=>{navigation.navigate("teacherassignmentView")}}>
                            <Icon name='file-eye-outline' size={70} style={{ alignSelf: 'center',marginTop:0 }}/> 
                            <Text style={{ textAlign: 'center', color: '#228B22', marginTop: 0, marginBottom: 15, fontSize: 15, fontWeight: 'bold', color: '#E8ADAA' }}>View Assignment</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'center'  }}>
                            <TouchableOpacity style={{ borderWidth: 2, borderRadius: 10, height: 120, width: 120, alignItems: 'center'  ,backgroundColor:'white'}} onPress={()=>navigation.navigate("teacherQuery")}>
                            <Image style={{ marginLeft: 0, marginTop: 10, width: 75, height: 75 }} source={require('./photos-teacher/question.png')} />
                            <Text style={{ textAlign: 'center', color: '#228B22', marginTop: 0, marginBottom: 15, fontSize: 15, fontWeight: 'bold', color: '#E8ADAA' }}> Queries</Text>
                            </TouchableOpacity >
                            <TouchableOpacity style={{ borderWidth: 2, borderRadius: 10, height: 120, width: 120, marginLeft: 30, alignItems: 'center',backgroundColor:'white' }}  onPress={()=>navigation.navigate("Addteacherevents")}>
                            <Image style={{ marginLeft: 0, marginTop: 10, width: 75, height: 75 }} source={require('./photos-teacher/event.png')}onPress={()=> navigation.navigate("Addteacherevents")}/>
                            <Text style={{ textAlign: 'center', color: '#228B22', marginTop: 0, marginBottom: 15, fontSize: 15, fontWeight: 'bold', color: '#E8ADAA' }}>Add Event</Text>
                            </TouchableOpacity>
                        </View>
						<View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'center'  }}>
                            <TouchableOpacity style={{ borderWidth: 2, borderRadius: 10, height: 120, width: 120, alignItems: 'center'  ,backgroundColor:'white'}} onPress={()=>navigation.navigate("AddQuiz")}>
                            <Image style={{ marginLeft: 0, marginTop: 10, width: 75, height: 75 }} source={require('./photos-teacher/test.png')} />
                            <Text style={{ textAlign: 'center', color: '#228B22', marginTop: 0, marginBottom: 15, fontSize: 15, fontWeight: 'bold', color: '#E8ADAA' }}>Add Quiz</Text>
                            </TouchableOpacity >
                            <TouchableOpacity style={{ borderWidth: 2, borderRadius: 10, height: 120, width: 120, marginLeft: 30, alignItems: 'center',backgroundColor:'white' }}  onPress={()=>navigation.navigate("AddGrade")}>
                            <Image style={{ marginLeft: 0, marginTop: 10, width: 75, height: 75 }} source={require('./photos-teacher/grades.png')}onPress={()=> navigation.navigate("AddGrade")}/>
                            <Text style={{ textAlign: 'center', color: '#228B22', marginTop: 0, marginBottom: 15, fontSize: 15, fontWeight: 'bold', color: '#E8ADAA' }}>Add Grade</Text>
                            </TouchableOpacity>
                        </View>
                     </View>
                     </View>
            </View>
            <View style={{ flex: 0, backgroundColor: 'white', }}>
                <View style={{ flex: 0, backgroundColor: '#E8ADAA', borderTopEndRadius: 250, }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>

                    </View>

                    <Text style={{ textAlign: 'center', color: '#000080', marginTop: "auto", marginBottom: 10, fontSize: 15, fontWeight: 'bold', alignSelf: 'auto' }}>© Orena Solutions 2020</Text>
                </View>
            </View>

        </View>
    )
}
export default TeacherHome;