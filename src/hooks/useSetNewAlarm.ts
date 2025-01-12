import {useState} from 'react';

interface NewAlarm {
  time: string;
  repeat: Array<string>;
  name: string;
  sound: Array<string>;
  isSnoozed: boolean;
}

export const useSetNewAlarm = () => {
  const [newAlarm, setNewAlarm] = useState<NewAlarm>({
    time: new Date().toString(),
    repeat: [],
    name: 'Alarm',
    sound: [],
    isSnoozed: false,
  });

  return {
    newAlarm,
  };
};
