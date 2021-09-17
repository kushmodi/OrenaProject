import React ,{ useState ,useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar, Image, TouchableOpacity, VirtualizedList, RecyclerViewBackedScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Moment from 'moment';
import CalendarPicker from 'react-native-calendar-picker';

import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });
const CalenderScreen = ({ navigation }) => {

  const [selectedDate, setSelectedDate] = useState(null);
 
  const onDateChange = (date, type) => {
    setSelectedDate(Moment(date).format("DD/MM/YYYY"))
    console.log(selectedDate)
   
  
   getevent()
  
     }
     
    
  
  let [flatListItems, setFlatListItems] = useState({});
  
console.log("From Flatlist"+flatListItems.cal_desc)

const getevent =() => {
  console.log(selectedDate)
  db.transaction((tx) => {
    tx.executeSql('SELECT * FROM table_calevent where cal_date=?', [selectedDate], (tx, results) => {
      var len = results.rows.length;
        
      if (len > 0) {
        setFlatListItems(results.rows.item(0));
      
      }
      else{
        
        setFlatListItems({cal_desc:'Currently no event is scheduled'})
      }
    });
  });
}


    return(
    
            <View style={{ flex: 1  ,backgroundColor:'white'}}>
            
                <View style={{ flex: 6, backgroundColor: '#000080', }}>
                  
                    <View style={{ flex: 6, backgroundColor: 'white', borderBottomLeftRadius: 100 }}>
                    <View style={{ backgroundColor: 'white', flexDirection: 'row' ,marginTop:0}}>
                     <Icon name='chevron-left' size={50} style={{ alignSelf: 'center',marginTop:0 }} onPress={() =>navigation.navigate("Elearning")}></Icon>
                     <Text style={{ color: '#000080', marginTop: 0, marginBottom: 0, fontSize: 20, fontWeight: 'bold',alignSelf:'center' }}>Calendar</Text>
                </View>
        
        <CalendarPicker 
         
          startFromMonday={true}
          allowRangeSelection={false}
          minDate={new Date(Date.now()+(10 * 60 * 1000)) }
          maxDate={Moment().add(2, 'month').startOf('day')}
          weekdays={['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']}
          months={['January','Febraury','March','April','May','June','July','August','September','October','November','December',]}
          previousTitle="Previous"
          nextTitle="Next"
          todayBackgroundColor="#e6ffe6"
          selectedDayColor="#66ff33"
          selectedDayTextColor="#000000"
          scaleFactor={375}
          textStyle={{fontFamily: 'Cochin',color: '#000000',}}
          onDateChange={onDateChange}
        />
        <View style={styles.textStyle}>
          <Text style={styles.textStyle}>
            Selected Date :{selectedDate}
          </Text>
          <Text style={styles.textStyle} >
           
            {flatListItems.cal_desc}
          </Text>
          <Text style={styles.textStyle} >
           
          </Text>
        
        
        </View>
 </View>
</View>
   <View style={{ flex: 2, backgroundColor: 'white', }}>
    <View style={{ flex: 2, backgroundColor: '#000080', borderTopEndRadius: 200, }}>
    </View>
    </View>
</View>

    );
}
export default CalenderScreen;
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
      textStyle: {
        marginTop: 10,
        marginLeft:20,
        marginRight:20,
    
      },
     
})