import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image, 
    TouchableOpacity,
    BackHandler,
    Alert,Linking
} from 'react-native';

import { Button, TextInput, IconButton, Colors } from "react-native-paper";
import { color } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';
import BottomSheet from 'reanimated-bottom-sheet';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-community/async-storage';
import { openDatabase } from 'react-native-sqlite-storage';


var db = openDatabase({ name: 'UserDatabase.db' });
const PlacementScreen = ({ navigation }) => {
    var SharedPreferences = require('react-native-shared-preferences');
    const [singleFile, setSingleFile] = useState([]);
    const [multipleFile, setMultipleFile] = useState([]);
    const[send,data] =useState('https://drive.google.com/drive/folders/1qRjqTc-7DSqBT3pkYZEKO5RoQ7VqiJfc?usp=sharing');
    const [value, setValue] = useState('')

  let [flatListItems, setFlatListItems] = useState([]);
  db.transaction((tx) => {
    tx.executeSql('SELECT * FROM table_users where user_id=?', [value], (tx, results) => {
      var len = results.rows.length;

  if (len > 0) {
    setFlatListItems(results.rows.item(0));
   
    
  } 
    });
   
  
  });
 
    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                Alert.alert("", "Are you sure you want to Exit?", [
                    {
                        text: "No",
                        onPress: () => null,
                        style: "cancel"
                    },
                    { text: "YES", onPress: () => BackHandler.exitApp() }
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
    
    const selectMultipleFile =  () => {
        //Opening Document Picker for selection of multiple file
        try {
            const results =  DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.pdf],

                //There can me more options as well find above
            });
            
            for (const res of results) {
                //Printing the log realted to the file
                console.log('res : ' + JSON.stringify(res));
                console.log('URI : ' + res.uri);
                console.log('Type : ' + res.type);
                console.log('File Name : ' + res.name);
                console.log('File Size : ' + res.size);
            }
            //Setting the state to show multiple file attributes
            setMultipleFile(results);
           
            
            Alert.alert("", "Resume Uploaded Succesfully", [
                { text: "OK", onPress: () => sheetRef.current.snapTo(0) }
            
            ]);
            return true;
        } catch (err) {
            //Handling any exception (If any)
            if (DocumentPicker.isCancel(err)) {
                //If user canceled the document selection
                alert('Canceled  Uploading Document');
            } else {
                //For Unknown Error
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    };
    const exit=()=>{
        Alert.alert("", "Are you sure you want to Log out?", [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel"
            },
            { text: "YES", onPress: clearAll }
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
    const renderContent = () => (
     
            <View
                style={{
                    backgroundColor: 'white',
                    padding: 16,
                    height: 220,
                    marginTop: 10,
                    alignItems: 'center',
                    borderTopWidth: 5,
                    borderColor: "#228B22"
                }}>
                <Icon name='minus' size={50} style={{ alignItems: 'center', marginTop: -30, }}></Icon>
                <Text style={{ marginTop: 0, fontSize: 20, fontWeight: 'bold' }}> Share Your Resume With Us</Text>
                <Button style={{ marginTop: 10, fontSize: 20, fontWeight: 'bold', width: 300, backgroundColor: "#228B22" }} mode="contained" onPress={() => Linking.openURL('https://drive.google.com/drive/folders/1qRjqTc-7DSqBT3pkYZEKO5RoQ7VqiJfc?usp=sharing')}>
                    Upload Your Resume
            </Button>
                <Text style={{ marginTop: 15, fontSize: 12, fontWeight: '100' }}>*Upload your file in .pdf or .docx format </Text>
                <Text style={{ textAlign: 'center', color: '#000080', marginTop: 20, marginBottom: 10, fontSize: 15, fontWeight: 'bold' }}>© Orena Solutions 2020</Text>

            </View>
       
    );
    const sheetRef = React.useRef(null)
    return (
       
            <View style={{ flex: 1, }}>
                <View style={{ flex: 3, backgroundColor: '#E8ADAA', }}>
                    <View style={{ flex: 3, backgroundColor: 'white', borderBottomLeftRadius: 211 }}>
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row', backgroundColor: 'white', }}>
                                <TouchableOpacity style={{ flex: 1, color: '#E8ADAA' }} onPress={() => navigation.navigate("Profile")}>
                                <Text style={{ flex: 1, marginLeft: 20, color: '#E8ADAA', marginTop: 25, marginBottom: 0, fontSize: 20, fontWeight: 'bold' }}>Hi {flatListItems.user_name}!</Text>
                                </TouchableOpacity>
                                <IconButton icon="bell-outline" size={30} onPress={() => navigation.navigate("Notification")} style={{ marginTop: 20, }} />
                                <IconButton icon="logout" size={30} onPress={exit} style={{ marginTop: 20, marginLeft: -10 }} />
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white', }}>
                                <Text style={{ marginLeft: 20, color: '#000080', marginTop: -20, marginBottom: 0, fontSize: 20, fontWeight: 'bold' }}>Welcome</Text>
                            </View>
                        </View>
                        <View style={{ flex: 2 }}>
                            <View style={{ flexDirection: 'row', marginTop: 0, justifyContent: 'center' }}>
                                <TouchableOpacity style={{ borderWidth: 2, borderRadius: 10, height: 120, width: 120 }} onPress={() => Linking.openURL('https://drive.google.com/drive/folders/1qRjqTc-7DSqBT3pkYZEKO5RoQ7VqiJfc?usp=sharing')} >
                                <Icon name='certificate' size={80} style={{ alignSelf: 'center' }}></Icon>
                                <Text style={{ textAlign: 'center', color: '#228B22', marginTop: 0, marginBottom: 15, fontSize: 15, fontWeight: 'bold', color: '#E8ADAA', backgroundColor: 'white'  }}>Resume/CV</Text>
                                </TouchableOpacity >
                                <TouchableOpacity style={{ borderWidth: 2, borderRadius: 10, height: 120, width: 120, marginLeft: 30, alignContent: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }} onPress={() => navigation.navigate("Questions")}>
                                <Image style={{ marginLeft: 0, marginTop: 10, width: 75, height: 75 }} source={require('./photos/question.png')} />
                                <Text style={{ textAlign: 'center', color: '#228B22', marginTop: 5, marginBottom: 15, fontSize: 15, fontWeight: 'bold', color: '#E8ADAA' }}>Questions</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'center' }}>
                                <TouchableOpacity style={{ borderWidth: 2, borderRadius: 10, height: 120, width: 120, alignContent: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }} onPress={() => navigation.navigate("Interview")}>
                                <Image style={{ marginLeft: 0, marginTop: 10, width: 75, height: 75 }} source={require('./photos/conference.png')} />
                                <Text style={{ textAlign: 'center', color: '#228B22', marginTop: 5, marginBottom: 15, fontSize: 15, fontWeight: 'bold', color: '#E8ADAA' }}>Interview</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ borderWidth: 2, borderRadius: 10, height: 120, width: 120, marginLeft: 30, alignItems: 'center', backgroundColor: 'white' }} onPress={() => navigation.navigate("Training")}>
                                <Image style={{ marginLeft: 0, marginTop: 10, width: 70, height: 70 }} source={require('./photos/training.png')} />
                                <Text style={{ textAlign: 'center', color: '#228B22', marginTop: 5, marginBottom: 15, fontSize: 15, fontWeight: 'bold', color: '#E8ADAA' }}>Training</Text>
                                </TouchableOpacity>
                            </View>
							<View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'center' }}>
                                <TouchableOpacity style={{ borderWidth: 2, borderRadius: 10, height: 120, width: 120, alignContent: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }} onPress={() => navigation.navigate("Forum")}>
                                <Image style={{ marginLeft: 0, marginTop: 10, width: 75, height: 75 }} source={require('./photos/conference.png')} />
                                <Text style={{ textAlign: 'center', color: '#228B22', marginTop: 5, marginBottom: 15, fontSize: 15, fontWeight: 'bold', color: '#E8ADAA' }}>Forum</Text>
                                </TouchableOpacity>
								</View>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, backgroundColor: 'white', }}>
                    <View style={{ flex: 1, backgroundColor: '#E8ADAA', borderTopEndRadius: 250, }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                            <Button mode="contained" onPress={() => navigation.navigate("Elearning")} style={{ backgroundColor: '#000080', borderTopLeftRadius: 20, borderBottomLeftRadius: 20, borderTopRightRadius: 0, borderBottomEndRadius: 0 }}>E-Learning</Button>
                            <Button mode="contained" style={{ backgroundColor: '#228B22', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderTopRightRadius: 20, borderBottomEndRadius: 20 }}>Placement</Button>
                        </View>
                        <Text style={{ textAlign: 'center', color: '#000080', marginTop: "auto", marginBottom: 10, fontSize: 15, fontWeight: 'bold', alignSelf: 'auto' }}>© Orena Solutions 2020</Text>
                    </View>
                </View>
                <BottomSheet ref={sheetRef} snapPoints={[0, 220, 0]} borderRadius={10} renderContent={renderContent}></BottomSheet>
                {/** <BottomSheet ref={sheetRefs} snapPoints={[0, 600, 0]} borderRadius={10} renderContent={renderContentNotification}></BottomSheet>*/}
            </View>
       
    );
}
export default PlacementScreen;