import {useState, useEffect} from 'react';
import {showLocalTime} from '../lib/utils';

export const useShowTime = () => {
  const {hour, minute, second} = showLocalTime();
  const [localTime, setLocalTime] = useState({
    hour: hour,
    minute: minute,
    second: second,
  });
  useEffect(() => {
    const time = setTimeout(() => {
      setLocalTime({
        hour: hour,
        minute: minute,
        second: second,
      });
    }, 1000);
    return () => clearTimeout(time);
  }, [second]);

  return localTime;
};
