import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity, BackHandler, Alert } from 'react-native';
import { Button, IconButton, } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomSheet from 'reanimated-bottom-sheet';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';


const AdminHome = ({ navigation }) => {
    var SharedPreferences = require('react-native-shared-preferences');
   //SharedPreferences.getItem("Tokens", function (value) {
    //  console.log(value);
  // });
    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                Alert.alert("", "Are you sure you want to Exit?", [
                    {
                        text: "No",
                        onPress: () => null,
                        style: "cancel"
                    },
                    {
                        text: "YES", onPress: () => BackHandler.exitApp()
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


    const exit = () => {
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

    return (
        <View style={{ flex: 1, }}>


            <View style={{ flex: 4, flexDirection: 'column', backgroundColor: '#E8ADAA', }}>
                <View style={{ flex: 5, backgroundColor: 'white', borderBottomLeftRadius: 60 }}>
                    <View style={{ flex: 0 }}>
                        <View style={{ flexDirection: 'row', backgroundColor: 'white', }}>
                            <TouchableOpacity style={{ flex: 1, color: '#E8ADAA' }} >
                                <Text style={{ flex: 1, marginLeft: 20, color: '#E8ADAA', marginTop: 15, marginBottom: 0, fontSize: 20, fontWeight: 'bold' }}>Hi Admin!</Text>
                            </TouchableOpacity>
                           
                            <IconButton icon="logout" size={30} onPress={exit} style={{ marginTop: 10, marginLeft: -10 }} />
                        </View>
                    </View>

                    <View style={{ flex: 4, marginTop: 20  ,justifyContent:'center'}}>
                        <ScrollView style={marginTop=0 ,justifyContent='center'}>
                            <View style={{ flexDirection: 'row', marginTop: 0, justifyContent: 'center' }}>
                                <TouchableOpacity style={{ borderWidth: 2, borderRadius: 10, height: 120, width: 120, alignItems: 'center', backgroundColor: 'white' }} onPress={() => navigation.navigate("Addteacher")}>
                                    <Image style={{ marginLeft: 0, marginTop: 10, width: 75, height: 75, }} source={require('./photos-admin/female.png')} />
                                    <Text style={{ textAlign: 'center', color: '#228B22', marginTop: 0, marginBottom: 15, fontSize: 15, fontWeight: 'bold', color: '#E8ADAA' }}>Add Teacher</Text>
                                </TouchableOpacity >
                                <TouchableOpacity style={{ borderWidth: 2, borderRadius: 10, height: 120, width: 120, marginLeft: 30, alignItems: 'center', backgroundColor: 'white' }} onPress={() => navigation.navigate("addcourse")}>
                                    <Image style={{ marginLeft: 0, marginTop: 10, width: 75, height: 75, }} source={require('./photos-admin/course1.png')} />
                                    <Text style={{ textAlign: 'center', color: '#228B22', marginTop: 0, marginBottom: 15, fontSize: 15, fontWeight: 'bold', color: '#E8ADAA' }}>Add Course</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'center' }}>
                                <TouchableOpacity style={{ borderWidth: 2, borderRadius: 10, height: 120, width: 120, alignItems: 'center', backgroundColor: 'white' }} onPress={() => navigation.navigate("Viewusers")}>
                                    <Image style={{ marginLeft: 0, marginTop: 10, width: 75, height: 75 }} source={require('./photos-admin/management.png')} />
                                    <Text style={{ textAlign: 'center', color: '#228B22', marginTop: 0, marginBottom: 15, fontSize: 15, fontWeight: 'bold', color: '#E8ADAA' }}> Manage Users</Text>
                                </TouchableOpacity >
                                <TouchableOpacity style={{ borderWidth: 2, borderRadius: 10, height: 120, width: 120, marginLeft: 30, alignItems: 'center', backgroundColor: 'white' }} onPress={() => navigation.navigate("updatecourse")}>
                                    <Image style={{ marginLeft: 0, marginTop: 10, width: 75, height: 75 }} source={require('./photos-admin/online-course.png')} />
                                    <Text style={{ textAlign: 'center', color: '#228B22', marginTop: 0, marginBottom: 15, fontSize: 15, fontWeight: 'bold', color: '#E8ADAA' }}>Update Course</Text>
                                
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'center' }}>
                                <TouchableOpacity style={{ borderWidth: 2, borderRadius: 10, height: 120, width: 120, alignItems: 'center', backgroundColor: 'white' }} onPress={() => navigation.navigate("courseEnrolled")}>
                                    <Image style={{ marginLeft: 0, marginTop: 10, width: 75, height: 75 }} source={require('./photos-admin/online-course.png')} />
                                    <Text style={{ textAlign: 'center', color: '#228B22', marginTop: 0, marginBottom: 15, fontSize: 15, fontWeight: 'bold', color: '#E8ADAA' }}>Courses Enrolled</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ borderWidth: 2, borderRadius: 10, height: 120, width: 120, marginLeft: 30, alignItems: 'center', backgroundColor: 'white' }} onPress={() => navigation.navigate("Addevents")}>
                                    <Image style={{ marginLeft: 0, marginTop: 10, width: 75, height: 75 }} source={require('./photos-admin/calendar1.png')} />
                                    <Text style={{ textAlign: 'center', color: '#228B22', marginTop: 0, marginBottom: 15, fontSize: 15, fontWeight: 'bold', color: '#E8ADAA'}}>Add Events</Text>
                                </TouchableOpacity>
                            </View>
                            

                        </ScrollView>
                    </View>


                </View>
            </View>
            <View style={{ flex: 0, backgroundColor: 'white', }}>
                <View style={{ flex: 0, backgroundColor: '#E8ADAA', borderTopEndRadius: 50, }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>

                    </View>

                    <Text style={{ textAlign: 'center', color: '#000080', marginTop: "auto", marginBottom: 10, fontSize: 15, fontWeight: 'bold', alignSelf: 'auto' }}>© Orena Solutions 2020</Text>
                </View>
            </View>

        </View>
    )
}
export default AdminHome;