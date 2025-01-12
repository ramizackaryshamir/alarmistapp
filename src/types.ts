//TODO 08292024: Need to create Navigation and Route types

export interface NavigationProps {
  navigation: any;
}
export interface NewAlarm {
  newAlarmId: string;
  newAlarmWeekday: string;
  newAlarmDate: string;
  newAlarmTime: string;
  newAlarmRepeat: Array<string>;
  newAlarmName: string;
  newAlarmSound: string;
  isNewAlarmSnoozed: boolean;
  //isNewAlarmActive?: boolean;
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
  onEdit: () => void;
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
