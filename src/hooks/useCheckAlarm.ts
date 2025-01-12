import {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {NewAlarm} from '../types';

export const useCheckAlarm = (alarms: Array<NewAlarm>) => {
  const [alarmIsEnabled, setAlarmIsEnabled] = useState<{
    [key: string]: boolean;
  }>({});

  // Synchronize alarm state with the current alarms array
  useEffect(() => {
    setAlarmIsEnabled(prevState => {
      const newState = alarms.reduce((acc, alarm) => {
        acc[alarm.id] = prevState[alarm.id] ?? false; // Preserve existing state or default to false
        return acc;
      }, {} as {[key: string]: boolean});
      return newState;
    });
  }, [alarms]);

  // Function to toggle the enabled state of a specific alarm
  const toggleEnable = (id: string) => {
    setAlarmIsEnabled(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  // Check alarms at regular intervals
  useEffect(() => {
    const checkAlarms = setInterval(() => {
      const currentTime = new Date();
      const currentHours = currentTime.getHours().toString().padStart(2, '0');
      const currentMinutes = currentTime
        .getMinutes()
        .toString()
        .padStart(2, '0');

      alarms.forEach(alarm => {
        if (
          alarmIsEnabled[alarm.id] &&
          alarm.time === `${currentHours}:${currentMinutes}`
        ) {
          Alert.alert('Alarm', `${alarm.name} is ringing!`);
          toggleEnable(alarm.id); // Automatically disable the alarm after it rings
        }
      });
    }, 1000);

    return () => clearInterval(checkAlarms); // Cleanup the interval on unmount
  }, [alarms, alarmIsEnabled]);

  return {alarmIsEnabled, toggleEnable};
};
