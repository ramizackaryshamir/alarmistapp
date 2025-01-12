import React from 'react';
import DatePicker from 'react-native-date-picker';
import {TimePickerProps} from '../../../types';
import {Colors} from '../../../lib/Colors';
import {useDarkMode} from '../../../hooks/useDarkMode';

const TimePicker = ({newAlarmTime, onChange}: TimePickerProps) => {
  const {theme} = useDarkMode();
  //TODO: NOTE: NewAlarm logic should be abstracted from TimePicker to its own component 07172024
  //TODO NOTE: Most likely to Home Screen component 07242024
  //
  //useEffect(() => {
  //  const checkAlarm = setInterval(() => {
  //    const currentTime = new Date();
  //    if (
  //      currentTime.getHours() === alarmTime.getHours() &&
  //      currentTime.getMinutes() === alarmTime.getMinutes()
  //    ) {
  //      Alert.alert('Alarm');
  //      clearInterval(checkAlarm);
  //    }
  //  }, 4000);
  //  return () => clearInterval(checkAlarm);
  //}, [alarmTime]);

  return (
    <>
      <DatePicker
        date={newAlarmTime}
        onDateChange={onChange}
        title="Alarm"
        style={{
          backgroundColor:
            theme === 'dark' ? Colors.blackPurple2 : Colors.vibrantWhite3,
        }}
        theme={theme === 'dark' ? 'dark' : 'light'}
      />
    </>
  );
};

export default TimePicker;
