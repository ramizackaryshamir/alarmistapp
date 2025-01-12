import React from 'react';
import {View, Text, Switch} from 'react-native';
import {useStyles} from './useStyles';
import {SnoozeOptionsProps} from '../../../types';

const AlarmSettingsSnoozeOption = ({option, onToggle}: SnoozeOptionsProps) => {
  const styles = useStyles();
  //console.group('\x1b[100m');
  //console.log('Snooze Option');
  //console.log('option.value', option.value);
  //console.groupEnd();

  return (
    <>
      <View style={styles.bottomSheetRowView}>
        <Text style={styles.bottomSheetText}>{option.label}</Text>
        <Switch onValueChange={onToggle} value={option.value} />
      </View>
    </>
  );
};

export default AlarmSettingsSnoozeOption;
