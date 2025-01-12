import React from 'react';
import DatePicker from 'react-native-date-picker';
//import {TimePickerProps} from '../../../types';
import {Colors} from '../../../lib/Colors';
import {useDarkMode} from '../../../hooks/useDarkMode';
import {useConsoleColors} from '../../../hooks/useConsoleColors';

interface TimePickerProps {
  newAlarmTime_ISO8601: Date;
  onChange: any;
}
const TimePicker = ({newAlarmTime_ISO8601, onChange}: TimePickerProps) => {
  const {theme} = useDarkMode();
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
  //newAlarmTime is returned as an ISO 8601
  BgBlueConsole(newAlarmTime_ISO8601);
  BgBlueConsole(typeof newAlarmTime_ISO8601);
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
        date={newAlarmTime_ISO8601}
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
