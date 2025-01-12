//TODO 08292024: Need to create Navigation and Route types

export interface NavigationProps {
  navigation: any;
}
export interface NewAlarm {
  weekday: string;
  date: string;
  time: string;
  repeat: Array<string>;
  name: string;
  sound: string;
  isSnoozed: boolean;
  id: string;
  isActive?: boolean;
}

export interface AlarmProps {
  id: string;
  alarmWeekday: string;
  alarmDate: string;
  alarmTime: string;
  alarmRepeat: Array<string>;
  alarmName: string;
  alarmSound?: string;
  onToggle: () => void;
  onDelete: () => void;
  alarmIsEnabled: boolean;
}

export interface SnoozeOptionsProps {
  option: {label: string; value: boolean};
  onToggle: any;
}

export type TimePickerProps = {
  newAlarmTime: any;
  onChange: any;
};
