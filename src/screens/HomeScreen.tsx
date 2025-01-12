import React, {useState, useEffect, useCallback} from 'react';
import {View, FlatList, Alert, TouchableOpacity, Text} from 'react-native';
import Menu from '../components/Menu';
import Alarm from '../components/Alarm';
import {useStyles} from './useStyles.ts';
import {useCheckAlarm} from '../hooks/useCheckAlarm.ts';
import {NewAlarm} from '../types';
import {generateRandomColors} from '../lib/utils.js';

const HomeScreen = ({navigation, route}: any) => {
  const [newAlarm, setNewAlarm] = useState<NewAlarm>({
    weekday: '',
    date: '',
    time: '',
    repeat: [],
    name: '',
    sound: '',
    isSnoozed: false,
    id: '',
  });
  const [alarms, setAlarms] = useState<Array<NewAlarm>>([]);
  const styles = useStyles();
  const {alarmIsEnabled, toggleEnable} = useCheckAlarm(newAlarm);
  const handleDelete: any = useCallback((id: string) => {
    //const updatedAlarms = alarms.filter((alarm) => alarm.id !== id);
    setAlarms(currentAlarms => currentAlarms.filter(alarm => alarm.id !== id));
  }, []);

  console.log('newAlarm.time: ', newAlarm.time.slice(3, 5));

  const formatAlarmData = data => ({
    weekday: data.newAlarmTime.slice(0, 3),
    date: data.newAlarmTime.slice(4, 15),
    time: data.newAlarmTime.slice(16, 21),
    repeat: data.newAlarmRepeat,
    name: data.newAlarmName || 'Alarm',
    sound: data.newAlarmSound,
    isSnoozed: data.isNewAlarmSnoozed,
    id: data.newAlarmId,
  });

  const navigateToAlarmSettingsScreen = useCallback(() => {
    navigation.navigate('Alarm Settings Screen', {
      onGoBack: data => {
        setNewAlarm(formatAlarmData(data));
      },
    });
  }, [navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={navigateToAlarmSettingsScreen}>
          <Text style={styles.headerIconText}>+</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, navigateToAlarmSettingsScreen, styles.headerIconText]);

  useEffect(() => {
    if (route.params?.newAlarmTime) {
      setAlarms(alarms => [...alarms, newAlarm]);
    }
    //console.group('\x1b[40m');
    //console.log('Home route', route.params?.newAlarmTime);
    //console.groupEnd();
  }, [route.params?.newAlarmTime, newAlarm]);

  //console.group('\x1b[46m');
  //console.log('Home Screen');
  //console.log('alarms', alarms);
  //console.log('newAlarm.time:', newAlarm.time);
  //console.log('newAlarm.repeat:', newAlarm.repeat);
  //console.log('newAlarm.name:', newAlarm.name);
  //console.log('newAlarm.sound:', newAlarm.sound);
  //console.log('newAlarm.isSnoozed:', newAlarm.isSnoozed);
  //console.log('newAlarm.id:', newAlarm.id);
  //console.groupEnd();

  const renderItem = useCallback(
    ({item}) => {
      return (
        <Alarm
          key={item.id}
          id={item.id}
          alarmWeekday={item.weekday}
          alarmDate={item.date}
          alarmTime={item.time}
          alarmRepeat={item.repeat}
          alarmName={item.name}
          alarmSound={item.sound}
          onToggle={() => toggleEnable(item.id)}
          onDelete={() => handleDelete(item.id)}
          alarmIsEnabled={alarmIsEnabled[item.id]}
        />
      );
    },
    [toggleEnable, handleDelete, alarmIsEnabled],
  );

  return (
    <>
      <View style={styles.homeScreenContainer}>
        <FlatList
          contentContainerStyle={styles.alarmsContainer}
          //data renders alarms each time because javascript equates by reference and each alarms array obj is a new obj even if none of the data has changed
          data={alarms}
          //useCallback memoizes renderItem so that FlatList won't rre-render each item in the list unnecessarily
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      <Menu navigation={navigation} />
    </>
  );
};

export default HomeScreen;
