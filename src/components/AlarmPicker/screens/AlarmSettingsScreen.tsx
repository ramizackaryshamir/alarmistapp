import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, TextInput, Text} from 'react-native';
import TimePicker from '../components/TimePicker';
import AlarmSettingsSnoozeOption from '../components/AlarmSettingsSnoozeOption';
import {useStyles} from './useStyles';
import {Colors} from '../../../lib/Colors';
import {useDarkMode} from '../../../hooks/useDarkMode';
import {useConsoleColors} from '../../../hooks/useConsoleColors';

const AlarmSettingsScreen = ({navigation, route}: any) => {
  const styles = useStyles();
  const {theme} = useDarkMode();
  const {BgRedConsole} = useConsoleColors();

  /** Pseudocode:
   * - If the screen is opened via editing an existing alarm, pre-populate the state values
   * - Otherwise, use default empty values
   */
  const currentAlarm = route.params?.currentAlarm || {};

  const [newAlarmTime_ISO8601, setNewAlarmTime_ISO8601] = useState<Date>(
    currentAlarm.newAlarmTime
      ? new Date(currentAlarm.newAlarmTime)
      : new Date(),
  );
  const [newAlarmRepeat, setNewAlarmRepeat] = useState<Array<string>>(
    currentAlarm.newAlarmRepeat || [],
  );
  const [newAlarmName, setNewAlarmName] = useState<string>(
    currentAlarm.newAlarmName || '',
  );
  const [newAlarmSound, setNewAlarmSound] = useState<string>(
    currentAlarm.newAlarmSound || '',
  );
  const [isNewAlarmSnoozed, setIsNewAlarmSnoozed] = useState<boolean>(
    currentAlarm.isNewAlarmSnoozed || false,
  );

  BgRedConsole(newAlarmTime_ISO8601);

  const handleToggleSwitch = () => {
    setIsNewAlarmSnoozed(prevState => !prevState);
  };

  const handleAlarmTimeChange = (value: any) => {
    setNewAlarmTime_ISO8601(value);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            route.params.onGoBack({
              newAlarmId: currentAlarm.newAlarmId || Math.random().toString(),
              newAlarmTime: newAlarmTime_ISO8601.toISOString(),
              newAlarmRepeat,
              newAlarmName,
              newAlarmSound,
              isNewAlarmSnoozed,
            });
            navigation.goBack();
          }}>
          <Text style={styles.bottomSheetText}>Save</Text>
        </TouchableOpacity>
      ),
    });
  }, [
    currentAlarm.newAlarmId,
    navigation,
    newAlarmTime_ISO8601,
    newAlarmRepeat,
    newAlarmName,
    newAlarmSound,
    isNewAlarmSnoozed,
    route.params,
    styles.bottomSheetText,
  ]);

  return (
    <View style={styles.bottomSheetContainer}>
      <TimePicker
        newAlarmTime_ISO8601={newAlarmTime_ISO8601}
        onChange={handleAlarmTimeChange}
      />
      <View style={styles.bottomSheetSettings}>
        <TouchableOpacity
          style={styles.bottomSheetRowView}
          onPress={() =>
            navigation.navigate('Repeat', {onGoBack: setNewAlarmRepeat})
          }>
          <Text style={styles.bottomSheetText}>Repeat</Text>
          <Text style={styles.bottomSheetText}>{newAlarmRepeat}</Text>
        </TouchableOpacity>
        <View style={styles.bottomSheetRowView}>
          <TextInput
            placeholder="Alarm"
            placeholderTextColor={
              theme === 'dark' ? Colors.white : Colors.blackPurple1
            }
            onChangeText={setNewAlarmName}
            value={newAlarmName}
          />
        </View>
        <AlarmSettingsSnoozeOption
          option={{label: 'Snooze', value: isNewAlarmSnoozed}}
          onToggle={handleToggleSwitch}
        />
      </View>
    </View>
  );
};

export default AlarmSettingsScreen;
