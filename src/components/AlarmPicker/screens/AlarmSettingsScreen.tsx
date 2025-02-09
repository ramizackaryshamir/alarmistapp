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

  // Get existing alarm values if editing, otherwise set defaults
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

  /** Pseudocode:
   * - When user clicks Save, pass updated alarm data back to HomeScreen
   * - Ensure HomeScreen updates the alarm list accordingly
   */
  const handleSaveAndGoBack = () => {
    const updatedAlarm = {
      newAlarmId: currentAlarm.newAlarmId || Math.random().toString(),
      newAlarmTime: newAlarmTime_ISO8601.toISOString(),
      newAlarmWeekday: newAlarmTime_ISO8601.toString().slice(0, 3),
      newAlarmDate: newAlarmTime_ISO8601.toString().slice(4, 15),
      newAlarmHour: newAlarmTime_ISO8601.toString().slice(16, 18),
      newAlarmMinute: newAlarmTime_ISO8601.toString().slice(19, 21),
      newAlarmSecond: newAlarmTime_ISO8601.toString().slice(22, 24),
      newAlarmGMTTime: newAlarmTime_ISO8601.toString().slice(25, 33),
      newAlarmRepeat,
      newAlarmName,
      newAlarmSound,
      isNewAlarmSnoozed,
    };
    route.params?.onGoBack(updatedAlarm);
    navigation.goBack();
  };

  useEffect(() => {
    /** Pseudocode:
     * - Set the header's right button as the Save button.
     * - When pressed, `handleSaveAndGoBack` is called.
     */
    navigation.setOptions({
      headerRight: (): React.JSX.Element => (
        <TouchableOpacity onPress={handleSaveAndGoBack}>
          <Text style={styles.bottomSheetText}>Save</Text>
        </TouchableOpacity>
      ),
    });
  }, [
    navigation,
    newAlarmTime_ISO8601,
    newAlarmRepeat,
    newAlarmName,
    newAlarmSound,
    isNewAlarmSnoozed,
    handleSaveAndGoBack,
    styles.bottomSheetText,
  ]);

  return (
    <View style={styles.bottomSheetContainer}>
      <TimePicker
        newAlarmTime_ISO8601={newAlarmTime_ISO8601}
        onChange={handleAlarmTimeChange}
      />

      <View style={styles.bottomSheetSettings}>
        {/* Repeat Option */}
        <TouchableOpacity
          style={styles.bottomSheetRowView}
          onPress={() =>
            navigation.navigate('Repeat', {
              onGoBack: (selectedDays: Array<string>) =>
                setNewAlarmRepeat(selectedDays),
            })
          }>
          <Text style={styles.bottomSheetText}>Repeat</Text>
          <Text style={styles.bottomSheetText}>
            {newAlarmRepeat.join(', ') || 'None'}
          </Text>
        </TouchableOpacity>

        {/* Alarm Name Input */}
        <View style={styles.bottomSheetRowView}>
          <Text style={styles.bottomSheetText}>Label</Text>
          <TextInput
            style={theme === 'dark' ? styles.bottomSheetRowView : null}
            placeholder="Alarm"
            placeholderTextColor={
              theme === 'dark' ? Colors.white : Colors.blackPurple1
            }
            onChangeText={setNewAlarmName}
            value={newAlarmName}
          />
        </View>

        {/* Sound Selection */}
        <TouchableOpacity
          style={styles.bottomSheetRowView}
          onPress={() =>
            navigation.navigate('Sound', {
              onGoBack: (selectedSound: string) =>
                setNewAlarmSound(selectedSound),
            })
          }>
          <Text style={styles.bottomSheetText}>Sound</Text>
          <Text style={styles.bottomSheetText}>
            {newAlarmSound || 'Default Sound'}
          </Text>
        </TouchableOpacity>

        {/* Snooze Toggle */}
        <AlarmSettingsSnoozeOption
          option={{label: 'Snooze', value: isNewAlarmSnoozed}}
          onToggle={handleToggleSwitch}
        />
      </View>
    </View>
  );
};

export default AlarmSettingsScreen;
