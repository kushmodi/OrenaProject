/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format;
 * @flow strict-local
 */
import 'react-native-gesture-handler';
 import React ,{useEffect,useState}from 'react';
 


 import LoginScreen from "./Screens/LoginScreen";
 import ElearningScreen from "./Screens/ElearningScreen";
 import CoursesScreen from "./Screens/CoursesScreen";
 import AssignmentScreen from "./Screens/AssignmentScreen";
 import CalenderScreen from "./Screens/CalenderScreen";
 import NotificationScreen from "./Screens/NotificationScreen";
 import PlacementScreen from "./Screens/PlacementScreen";
  import ForumScreen from "./Screens/ForumScreen";
 import QuizScreen from "./Screens/QuizScreen";
 import GradeScreen from "./Screens/GradeScreen";

 import  { createStackNavigator}  from '@react-navigation/stack';
 import { NavigationContainer } from '@react-navigation/native';
 import QuestionsScreen from './Screens/QuestionsScreen';
 import ForgetPasswordScreen from './Screens/ForgetPasswordScreen';
 import RegisterScreen from "./Screens/RegisterScreen";
 import ProfileScreen from "./Screens/ProfileScreen";
 import TrainingScreen from "./Screens/TrainingScreen";
 import InterviewScreen from "./Screens/InterviewScreen";
 import updateProfile from "./Screens/updateProfile";
 import TeacherHome from "./Screens/Teacher/TeacherHome";
 import AddTeacherEventScreen from "./Screens/Teacher/AddTeacherEventScreen";
 import AdminHome from "./Screens/Admin/AdminHome";
 import AddCourseScreen from "./Screens/Admin/AddCourseScreen";
 import ViewEnrolledCourse from "./Screens/Admin/ViewEnrolledCourse";

 import ViewCourseScreen from "./Screens/Admin/ViewCourseScreen";
 import UpdateCourseScreen from "./Screens/Admin/UpdateCourseScreen";
 import AddTeacherScreen from "./Screens/Admin/AddTeacherScreen";
 import AddViewAssignmentsScreen from "./Screens/Teacher/AddViewAssignmentsScreen";
 import AddQuizScreen from "./Screens/Teacher/AddQuizScreen";
 import AddGradeScreen from "./Screens/Teacher/AddGradeScreen";
 import ViewUsersScreen from "./Screens/Admin/ViewUsersScreen";
 import TeacherViewAssignments from "./Screens/Teacher/TeacherViewAssignments";
 import upload from "./Screens/upload";
 import { ImageBackground, View } from 'react-native';

 import { openDatabase } from 'react-native-sqlite-storage';
import AddEventsScreen from './Screens/Admin/AddEventsScreen';
import TeacherProfile from './Screens/Teacher/TeacherProfile';
import TeacherUpdate from './Screens/Teacher/TeacherUpdate';

import TeacherNotification from './Screens/Teacher/TeacherNotification';
import TeacherQreplyscreen from './Screens/Teacher/TeacherQreplyscreen';
import AsyncStorage from '@react-native-community/async-storage';
 var Stack = createStackNavigator();
 const db = openDatabase({ name: 'UserDatabase.db'  });

 function SplashScreen({navigation}) {
 
   useEffect(() => { 
    db.transaction(function (txn) {
    
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_users'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_users', []);
            txn.executeSql(
             'CREATE TABLE IF NOT EXISTS table_users(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_Fname VARCHAR(20), user_Lname VARCHAR(20), user_utype INT(5), user_email VARCHAR(25), user_contact VARCHAR(10), user_address VARCHAR(255),password varchar(20),co_id VARCHAR(5))',
              [],
              console.log("table_users created")
              
              );
            }
            else{
              console.log("Table table_users exist")
            }
        }
      );
    });
   }, []);
   useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_courses'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_courses', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_courses(co_id INTEGER PRIMARY KEY AUTOINCREMENT, co_name VARCHAR(20), co_desc VARCHAR(255))',
              [],
              console.log("table_courses created")
              
              );
            }
            else{
              console.log("Table table_courses exist")
            }
        }
      );
    });
  
  }, []); 
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_questions'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_questions', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_questions(q_id INTEGER PRIMARY KEY AUTOINCREMENT, q_subject VARCHAR(20), q_desc VARCHAR(255), answer VARCHAR(255) , user_id VARCHAR(10))',
              [],
              console.log("table_questions created")
              
              );
            }
            else{
              console.log("table_questions exists")
            }
        }
      );
    });
  
  }, []); 
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_calevent'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_calevent', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_calevent(cal_id INTEGER PRIMARY KEY AUTOINCREMENT, cal_date VARCHAR(20), cal_desc VARCHAR(255))',
              [],
              console.log("table_calevent created")
              
              );
            }
            else{
              console.log("Table table_calevent exist")
            }
        }
      );
    });
  }, []);
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_assignment'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_assignment', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_assignment(a_id INTEGER PRIMARY KEY AUTOINCREMENT, a_title VARCHAR(20), a_desc VARCHAR(255),  a_date VARCHAR(10) , a_upload varchar(400), a_link varchar (400),co_id VARCHAR(5))',
              [],
              console.log("table_assignment created")
              
              );
            }
            else{
              console.log("Table table_assignment exist")
            }
        }
      );
    });
  }, []);
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_Quiz'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_Quiz', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_Quiz(Q_id INTEGER PRIMARY KEY AUTOINCREMENT, Q_title VARCHAR(20), Q_desc VARCHAR(255),  Q_date VARCHAR(10) , Q_upload varchar(400), Q_link varchar (400),co_id VARCHAR(5))',
              [],
              console.log("table_Quiz created")
              
              );
            }
            else{
              console.log("Table table_Quiz exist")
            }
        }
      );
    });
  }, []);
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_Grade'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_Grade', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_assignment(g_id INTEGER PRIMARY KEY AUTOINCREMENT, g_title VARCHAR(20), g_date VARCHAR(10) , g_upload varchar(400),co_id VARCHAR(5))',
              [],
              console.log("table_Grade created")
              
              );
            }
            else{
              console.log("Table table_Grade exist")
            }
        }
      );
    });
  }, []);
      
    
   setTimeout( async ()=>{
    const userid = await AsyncStorage.getItem('userid')
    const usertype = await AsyncStorage.getItem('usertype')
    const Admin = await AsyncStorage.getItem('Admin')
    console.log("user id is" +userid)
    console.log("user type is "+usertype)
    console.log("Admin is "+Admin)
   
   
    if(usertype == 2)
    { 
      navigation.navigate("Elearning")
    }
    if(usertype == 1)
    { 
      navigation.navigate("Teacher")
    }
    else{
      if(usertype == 2)
      { 
        navigation.navigate("Elearning")
      }
      else{
        navigation.navigate("Login")
    }
    } 
   
   },2000
   )
   ;
   
   return(
     <View style={{flex:1,backgroundColor:'#000080',justifyContent:'center',alignItems:'center' }}>
     <ImageBackground style={{resizeMode:'cover',justifyContent:'center',width: 210, height: 160 }} source={require('./Screens/photos/OrenaLogo.png')}>
 
     </ImageBackground>
     </View>
   )
 }
 const App =()=>{
  
   return( <NavigationContainer >
   <Stack.Navigator initialRouteName="Splash" 
   >
     <Stack.Screen name="Splash" component={SplashScreen}  options={{
         headerShown:false
       }} />
       <Stack.Screen name="Login" component={LoginScreen}  options={{
         headerShown:false
       }} />
      <Stack.Screen name="Elearning" component={ElearningScreen} options={{
         headerShown:false}} />
           <Stack.Screen name="Placement" component={PlacementScreen} options={{
         headerShown:false}} />
		   <Stack.Screen name="Forum" component={ForumScreen} options={{
         headerShown:false}} />
		 <Stack.Screen name="Quiz" component={QuizScreen} options={{
         headerShown:false}} />
		 <Stack.Screen name="Grade" component={GradeScreen} options={{
         headerShown:false}} />
         <Stack.Screen name="Assignment" component={AssignmentScreen} options={{
         headerShown:false}}/>
         <Stack.Screen name="Calender" component={CalenderScreen} options={{
         headerShown:false}} />
         <Stack.Screen name="Courses" component={CoursesScreen} options={{
         headerShown:false}} />
        
       <Stack.Screen name="Questions" component={QuestionsScreen} options={{
         headerShown:false}} />
         <Stack.Screen name="Forgetpassword" component={ForgetPasswordScreen} options={{
         headerShown:false}} />
         <Stack.Screen name="Register" component={RegisterScreen} options={{
         headerShown:false}} />
         <Stack.Screen name="Profile" component={ProfileScreen} options={{
         headerShown:false}} />
         <Stack.Screen name="Notification" component={NotificationScreen} options={{
         headerShown:false}} />
          <Stack.Screen name="Updatedata" component={updateProfile} options={{
         headerShown:false}} />
           <Stack.Screen name="Interview" component={InterviewScreen} options={{
         headerShown:false}} />
    <Stack.Screen name="Training" component={TrainingScreen} options={{
         headerShown:false}} />
         <Stack.Screen name="go" component={upload} options={{
         headerShown:false}} />
         <Stack.Screen name="Admin" component={AdminHome} options={{
         headerShown:false}} />
         <Stack.Screen name="Teacher" component={TeacherHome} options={{
         headerShown:false}} />
         <Stack.Screen name="addcourse" component={AddCourseScreen} options={{
         headerShown:false}} />
         <Stack.Screen name="viewcourse" component={ViewCourseScreen} options={{
         headerShown:false}} />
          <Stack.Screen name="updatecourse" component={UpdateCourseScreen} options={{
         headerShown:false}} />
          <Stack.Screen name="Addteacher" component={AddTeacherScreen} options={{
         headerShown:false}} />
            <Stack.Screen name="Viewusers" component={ViewUsersScreen} options={{
         headerShown:false}} />
         <Stack.Screen name="Addevents" component={AddEventsScreen} options={{
         headerShown:false}} />
           <Stack.Screen name="Addteacherevents" component={AddTeacherEventScreen} options={{
         headerShown:false}} />
         <Stack.Screen name="teacherNotification" component={TeacherNotification} options={{
         headerShown:false}} />
          <Stack.Screen name="teacherQuery" component={TeacherQreplyscreen} options={{
         headerShown:false}} />
           <Stack.Screen name="teacherassignment" component={AddViewAssignmentsScreen} options={{
         headerShown:false}} />
		 <Stack.Screen name="AddQuiz" component={AddQuizScreen} options={{
         headerShown:false}} />
		 <Stack.Screen name="AddGrade" component={AddGradeScreen} options={{
         headerShown:false}} />
                <Stack.Screen name="teacherassignmentView" component={TeacherViewAssignments} options={{
         headerShown:false}} />
           <Stack.Screen name="Tupdate" component={TeacherUpdate} options={{
         headerShown:false}} />
           <Stack.Screen name="Tprofile" component={TeacherProfile} options={{
         headerShown:false}} />
            <Stack.Screen name="courseEnrolled" component={ViewEnrolledCourse} options={{
         headerShown:false}} />
		 <Stack.Screen name="AddQuiz" component={AddQuizScreen} options={{
         headerShown:false}} />
		 <Stack.Screen name="AddGrade" component={AddGradeScreen} options={{
         headerShown:false}} />
		 <Stack.Screen name="Quiz" component={QuizScreen} options={{
         headerShown:false}} />
		 <Stack.Screen name="Grade" component={GradeScreen} options={{
         headerShown:false}} />
     </Stack.Navigator>
     </NavigationContainer>
   )
 }
 export default App;
 