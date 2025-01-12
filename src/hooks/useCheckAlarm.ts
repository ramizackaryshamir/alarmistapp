import {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {NewAlarm} from '../types';
export const useCheckAlarm = (newAlarm: NewAlarm) => {
  const [alarmIsEnabled, setAlarmIsEnabled] = useState<any>({});

  const toggleEnable = (id: string) => {
    console.log('id: ', id);
    console.log('{[id]: !alarmIsEnabled[id]}: ', {[id]: !alarmIsEnabled[id]});
    setAlarmIsEnabled({
      ...alarmIsEnabled,
      [id]: !alarmIsEnabled[id],
    });
  };

  useEffect(() => {
    const checkAlarm = setInterval(() => {
      const currentTime = new Date();
      if (
        alarmIsEnabled[newAlarm.id] === true &&
        currentTime.getHours().toString() === newAlarm.time.slice(0, 2) &&
        currentTime.getMinutes().toString() === newAlarm.time.slice(3, 5)
      ) {
        Alert.alert('Alarm');
        clearInterval(checkAlarm);
      }
    }, 1000);
    return () => clearInterval(checkAlarm);
  }, [alarmIsEnabled]);

  return {alarmIsEnabled, toggleEnable};
};
