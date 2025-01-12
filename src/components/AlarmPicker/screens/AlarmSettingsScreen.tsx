import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, TextInput, Text} from 'react-native';
import TimePicker from '../components/TimePicker';
import AlarmSettingsSnoozeOption from '../components/AlarmSettingsSnoozeOption';
import {useStyles} from './useStyles';
import {Colors} from '../../../lib/Colors';
import {useDarkMode} from '../../../hooks/useDarkMode';
import {useConsoleColors} from '../../../hooks/useConsoleColors';

const AlarmSettingsScreen = ({navigation, route}: any) => {
  //This component sets the state for the alarm
  const styles = useStyles();
  const {theme} = useDarkMode();
  const {
    BgMagentaConsole,
    BgCyanConsole,
    BgWhiteConsole,
    BgGrayConsole,
    BgGreenConsole,
    BgYellowConsole,
    BgBlueConsole,
    BgRedConsole,
  } = useConsoleColors();
  const [newAlarmTime_ISO8601, setNewAlarmTime_ISO8601] = useState<Date>(
    new Date(),
  );
  const [newAlarmRepeat, setNewAlarmRepeat] = useState<Array<boolean>>([]);
  const [newAlarmName, setNewAlarmName] = useState<string>('');
  const [newAlarmSound, setNewAlarmSound] = useState<string>('');
  const [isNewAlarmSnoozed, setIsNewAlarmSnoozed] = useState<boolean>(false);

  //toString() changes structure of date object
  BgRedConsole(newAlarmTime_ISO8601);
  BgRedConsole(newAlarmTime_ISO8601.toString());
  BgRedConsole(
    `${newAlarmTime_ISO8601.toString()}.${newAlarmTime_ISO8601.getMilliseconds()}`,
  );
  //
  BgRedConsole(typeof newAlarmTime_ISO8601);

  const handleToggleSwitch = () => {
    setIsNewAlarmSnoozed((prevState: boolean) => !prevState);
  };

  const handleAlarmTimeChange = (value: any) => {
    setNewAlarmTime_ISO8601(value);
  };

  const navigateToRepeatOptionsScreen = () => {
    navigation.navigate('Repeat', {
      onGoBack: (data: Array<string>) => {
        //console.log(data);
        setNewAlarmRepeat(data);
      },
    });
  };

  useEffect(() => {
    const handleSaveAndGoBackToHomeScreen = () => {
      route.params.onGoBack({
        newAlarmTime: `${newAlarmTime_ISO8601.toString()}.${newAlarmTime_ISO8601.getMilliseconds()}`,
        newAlarmRepeat,
        newAlarmName,
        newAlarmSound,
        isNewAlarmSnoozed,
        newAlarmId: Math.random().toString(),
      });

      navigation.goBack();
      navigation.navigate({
        name: 'Home',
        params: {
          newAlarmTime: newAlarmTime_ISO8601.toString,
          newAlarmRepeat: newAlarmRepeat,
          newAlarmName: newAlarmName,
          newAlarmSound: newAlarmSound,
          isNewAlarmSnoozed: isNewAlarmSnoozed,
        },
        merge: true,
      });
    };

    //console.group('\x1b[41m');
    //console.log('Alarm Settings Screen');
    //console.log('newAlarmRepeat: Alarm Settings Screen', newAlarmRepeat);
    //console.log('route in AlarmSettingsScreen', route);
    //console.groupEnd();
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSaveAndGoBackToHomeScreen}>
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
    route.params,
    route,
    styles.bottomSheetText,
  ]);

  useEffect(() => {
    //Params 1a/2:
    //Screen receives params data from AlarmSettingsRepeatOptionsScreen and sets data to alarmSettinngs

    if (route.params?.selectedDays) {
      //console.log('route.params', route.params);
      setNewAlarmRepeat(newAlarmRepeat);
    }
    //Params 1b/2:
    //Screen receives params data from AlarmSettingsSoundOptionsScreen and sets data to alarmSettinngs
    if (route.params?.selectedSound) {
      setNewAlarmSound(newAlarmSound);
    }

    //console.group('\x1b[41m');
    //console.log('Alarm Settings Screen');
    //console.log('newAlarmTime:', newAlarmTime);
    //console.log('newAlarmRepeat:', newAlarmRepeat);
    //console.log('newAlarmName:', newAlarmName);
    //console.log('newAlarmSound:', newAlarmSound);
    //console.log('isNewAlarmSnoozed:', isNewAlarmSnoozed);
    //console.groupEnd();
  }, [
    route.params?.newAlarmRepeat,
    route.params?.newAlarmSound,
    newAlarmRepeat,
    newAlarmSound,
    isNewAlarmSnoozed,
    newAlarmName,
    newAlarmTime_ISO8601,
    route.params,
  ]);

  return (
    <View style={styles.bottomSheetContainer}>
      <TimePicker
        newAlarmTime_ISO8601={newAlarmTime_ISO8601}
        onChange={handleAlarmTimeChange}
      />
      <View style={styles.bottomSheetSettings}>
        {/*TODO This Button Goes Forward*/}
        <TouchableOpacity
          style={styles.bottomSheetRowView}
          onPress={navigateToRepeatOptionsScreen}>
          <Text style={styles.bottomSheetText}>Repeat</Text>
          <Text style={styles.bottomSheetText}>{newAlarmRepeat}</Text>
        </TouchableOpacity>
        <View style={styles.bottomSheetRowView}>
          <Text style={styles.bottomSheetText}>Label</Text>
          <TextInput
            style={theme === 'dark' ? styles.bottomSheetRowView : null}
            placeholder="Alarm"
            placeholderTextColor={
              theme === 'dark' ? Colors.white : Colors.blackPurple1
            }
            onChangeText={value => setNewAlarmName(value)}
            value={newAlarmName}
          />
        </View>
        {/*TODO This Button Goes Forward*/}

        <TouchableOpacity
          style={styles.bottomSheetRowView}
          onPress={() => {
            navigation.navigate('Sound', {
              onGoBack: (data: string) => {
                setNewAlarmSound(data);
              },
            });
          }}>
          <Text style={styles.bottomSheetText}>Sound</Text>
          <Text style={styles.bottomSheetText}>Selection</Text>
        </TouchableOpacity>
        <AlarmSettingsSnoozeOption
          option={{label: 'Snooze', value: isNewAlarmSnoozed}}
          onToggle={handleToggleSwitch}
        />
      </View>
    </View>
  );
};

export default AlarmSettingsScreen;
