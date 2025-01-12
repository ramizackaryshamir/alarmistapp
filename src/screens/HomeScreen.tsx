import React, {useState, useEffect, useCallback} from 'react';
import {View, FlatList, Alert} from 'react-native';
import Menu from '../components/Menu';
import Alarm from '../components/Alarm';
import {useStyles} from './useStyles.ts';
import {useCheckAlarm} from '../hooks/useCheckAlarm.ts';
import {NewAlarm} from '../types';
import {useConsoleColors} from '../hooks/useConsoleColors.ts';
import {formatISO} from 'date-fns';

const HomeScreen = ({navigation, route}: any) => {
  const {
    BgMagentaConsole,
    BgCyanConsole,
    BgWhiteConsole,
    BgGrayConsole,
    BgGreenConsole,
    BgYellowConsole,
    BgBlueConsole,
    BgRedConsole,
  } = useConsoleColors();
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
    newAlarmWeekday: data.newAlarmTime.slice(0, 3),
    newAlarmDate: data.newAlarmTime.slice(4, 15),
    newAlarmTime: data.newAlarmTime.slice(16, 21),
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
          console.log(currentAlarm.newAlarmDate);
          console.log(currentAlarm.newAlarmTime);

          // Parse date (e.g., "Wed Jan 1 2025") and time (e.g., "12:00 AM")
          const dateParts = currentAlarm.newAlarmDate.split(' '); // ["Wed", "Jan", "1", "2025"]
          const timeParts = currentAlarm.newAlarmTime.split(':'); // ["12", "00"]
          const hour = parseInt(timeParts[0], 10);
          const minute = parseInt(timeParts[1], 10);

          // Convert 12-hour to 24-hour format
          const isPM = currentAlarm.newAlarmTime.includes('PM');
          const adjustedHour =
            isPM && hour < 12 ? hour + 12 : hour === 12 && !isPM ? 0 : hour;

          // Construct the date object
          const alarmDateTime = new Date(
            `${dateParts[1]} ${dateParts[2]} ${dateParts[3]} ${adjustedHour}:${minute}:00`,
          );

          // Validate if the date is valid
          if (isNaN(alarmDateTime.getTime())) {
            throw new Error('Invalid Date Format');
          }
          navigation.navigate(
            'Alarm Settings Screen',
            {currentAlarm},
            {
              alarmData: {
                newAlarmTime: new Date(),
                // Pass ISO string
                newAlarmRepeat: currentAlarm.newAlarmRepeat,
                newAlarmName: currentAlarm.newAlarmName,
                newAlarmSound: currentAlarm.newAlarmSound,
                isNewAlarmSnoozed: currentAlarm.isNewAlarmSnoozed,
                newAlarmId: currentAlarm.newAlarmId,
              },
            },
          );
        } catch (error: any) {
          console.error(error.message);

          // Use Alert.alert instead of alert
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
        alarmTime={item.newAlarmTime}
        alarmRepeat={item.newAlarmRepeat}
        alarmName={item.newAlarmSound || 'Alarm'}
        alarmSound={item.isNewAlarmSnoozed}
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
