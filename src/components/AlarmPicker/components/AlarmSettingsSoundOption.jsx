import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {useStyles} from './useStyles';

const AlarmSettingsSoundOption = ({ringtone}) => {
  const styles = useStyles();

  return (
    <TouchableWithoutFeedback onPress={() => alert('clicked')}>
      <View style={styles.alarmSettingsRepeatOption}>
        <Text style={styles.bottomSheetText}>Every {ringtone}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AlarmSettingsSoundOption;
