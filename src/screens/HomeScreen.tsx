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
  const minItemsToScroll = 8;

  // Handle adding a new alarm or updating an existing one
  useEffect(() => {
    if (route.params?.newAlarmData) {
      const updatedAlarm = formatAlarmData(route.params.newAlarmData);
      setAlarms(currentAlarms => {
        const index = currentAlarms.findIndex(
          alarm => alarm.newAlarmId === updatedAlarm.newAlarmId,
        );

        if (index !== -1) {
          // Update existing alarm
          const updatedAlarms = [...currentAlarms];
          updatedAlarms[index] = updatedAlarm;
          return updatedAlarms;
        } else {
          // Add new alarm
          return [...currentAlarms, updatedAlarm];
        }
      });
    }
  }, [route.params?.newAlarmData]);

  const formatAlarmData = (data: any) => ({
    newAlarmId: data.newAlarmId,
    newAlarmWeekday: data.newAlarmTime.slice(0, 3),
    newAlarmDate: data.newAlarmTime.slice(4, 15),
    newAlarmHour: data.newAlarmTime.slice(16, 18),
    newAlarmMinute: data.newAlarmTime.slice(19, 21),
    newAlarmSecond: data.newAlarmTime.slice(22, 24),
    newAlarmGMTTime: data.newAlarmTime.slice(25, 33),
    newAlarmTime: data.newAlarmTime,
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
          BgCyanConsole('currentAlarm.newAlamSate');
          BgCyanConsole(currentAlarm.newAlarmDate);
          // BgCyanConsole(currentAlarm.newAlarmTime);

          /** Pseudocode:
           * - Navigate to AlarmSettingsScreen
           * - Pass `currentAlarm` as params to populate the screen
           * - Provide `onGoBack` callback to update alarm in HomeScreen
           */
          navigation.navigate('Alarm Settings Screen', {
            currentAlarm,
            onGoBack: updatedAlarm => {
              navigation.setParams({newAlarmData: updatedAlarm});
            },
          });
        } catch (error: any) {
          console.error(error.message);
          Alert.alert('Error', 'Failed to edit the alarm.');
        }
      }
    },
    [alarms, navigation],
  );

  // Render alarms in the FlatList
  const renderItem = useCallback(
    ({item}: any) => {
      console.log(item.newAlarmTime);
      return (
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
      );
    },
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
          scrollEnabled={alarms.length >= minItemsToScroll}
        />
      </View>
      <Menu navigation={navigation} />
    </>
  );
};

export default HomeScreen;
