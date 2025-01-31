import React, {useState, useEffect, useCallback} from 'react';
import {View, FlatList, Alert} from 'react-native';
import Menu from '../components/Menu';
import Alarm from '../components/Alarm';
import {useStyles} from './useStyles.ts';
import {useCheckAlarm} from '../hooks/useCheckAlarm.ts';
import {NewAlarm} from '../types';
import {useConsoleColors} from '../hooks/useConsoleColors.ts';

const HomeScreen = ({navigation, route}: any) => {
  const {BgGreenConsole, BgCyanConsole} = useConsoleColors();
  const [alarms, setAlarms] = useState<Array<NewAlarm>>([]);
  const styles = useStyles();

  const {alarmIsEnabled, toggleEnable} = useCheckAlarm(alarms);

  // Handle adding a new alarm
  useEffect(() => {
    if (route.params?.newAlarmData) {
      BgGreenConsole(route.params.newAlarmData);
      setAlarms(current => [
        ...current,
        formatAlarmData(route.params.newAlarmData),
      ]);
    }
  }, [route.params?.newAlarmData]);

  const formatAlarmData = (data: any) => ({
    newAlarmId: data.newAlarmId,
    newAlarmWeekday: data.newAlarmTime.slice(0, 3), // Sun, Mon, Tue, Wed, Thu, Fri, Sat
    newAlarmDate: data.newAlarmTime.slice(4, 15), // Jan 12 2025
    newAlarmHour: data.newAlarmTime.slice(16, 18), // 19
    newAlarmMinute: data.newAlarmTime.slice(19, 21), // 35
    newAlarmSecond: data.newAlarmTime.slice(22, 24), // 43
    newAlarmGMTTime: data.newAlarmTime.slice(25, 33), // GMT-0500
    newAlarmTime: data.newAlarmTime, // Keep full date object
    newAlarmRepeat: data.newAlarmRepeat,
    newAlarmName: data.newAlarmName || 'Alarm',
    newAlarmSound: data.newAlarmSound,
    isNewAlarmSnoozed: data.isNewAlarmSnoozed,
  });

  // Handle navigation to edit an alarm
  const handleEdit = useCallback(
    (alarmId: string) => {
      const currentAlarm = alarms.find(alarm => alarm.newAlarmId === alarmId);
      if (currentAlarm) {
        try {
          // Log the date and time for debugging
          BgCyanConsole(currentAlarm.newAlarmDate);
          BgCyanConsole(currentAlarm.newAlarmTime);

          /** Pseudocode:
           * - Navigate to AlarmSettingsScreen
           * - Pass `currentAlarm` as params to populate the screen with the current alarm's data
           */
          navigation.navigate('Alarm Settings Screen', {
            currentAlarm,
          });
        } catch (error: any) {
          console.error(error.message);
          Alert.alert(
            'Error',
            'Failed to edit the alarm due to an invalid date or time.',
          );
        }
      }
    },
    [alarms, navigation],
  );

  // Render alarms in the FlatList
  const renderItem = useCallback(
    ({item}: any) => (
      <Alarm
        key={item.newAlarmId}
        id={item.newAlarmId}
        alarmWeekday={item.newAlarmWeekday}
        alarmDate={item.newAlarmDate}
        alarmHour={item.newAlarmHour}
        alarmMinute={item.newAlarmMinute}
        alarmSecond={item.newAlarmSecond}
        alarmGMTTime={item.newAlarmGMTTime}
        alarmTime={item.newAlarmTime}
        alarmRepeat={item.newAlarmRepeat}
        alarmName={item.newAlarmName}
        alarmSound={item.newAlarmSound}
        isNewAlarmSnoozed={item.isNewAlarmSnoozed}
        onToggle={() => toggleEnable(item.newAlarmId)}
        onDelete={() =>
          setAlarms(current =>
            current.filter(alarm => alarm.newAlarmId !== item.newAlarmId),
          )
        }
        onEdit={() => handleEdit(item.newAlarmId)}
        alarmIsEnabled={alarmIsEnabled[item.newAlarmId]}
      />
    ),
    [toggleEnable, alarmIsEnabled, handleEdit],
  );

  return (
    <>
      <View style={styles.homeScreenContainer}>
        <FlatList
          contentContainerStyle={styles.alarmsContainer}
          data={alarms}
          renderItem={renderItem}
          keyExtractor={item => item.newAlarmId}
        />
      </View>
      <Menu navigation={navigation} />
    </>
  );
};

export default HomeScreen;
