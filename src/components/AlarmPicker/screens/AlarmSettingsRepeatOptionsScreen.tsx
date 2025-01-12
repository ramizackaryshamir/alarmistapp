import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, Platform} from 'react-native';
import Checkbox from '../../Inputs/Checkbox';
import {useStyles} from './useStyles';

const AlarmSettingsRepeatOptionScreen = ({navigation, route}: any) => {
  const [selectedDays, setSelectedDays] = useState<[]>([]);
  //console.log('selectedDays', selectedDays);

  const styles = useStyles();

  useEffect(() => {
    const handleGoBackToAlarmSettingsScreen = () => {
      route.params.onGoBack(selectedDays);
      navigation.goBack();
      navigation.navigate({
        name: 'Alarm Settings Screen',
        params: {selectedDays: selectedDays},
        merge: true,
      });
    };
    navigation.setOptions({
      headerLeft: () =>
        Platform.OS === 'ios' ? (
          <>
            <TouchableOpacity onPress={handleGoBackToAlarmSettingsScreen}>
              <Text style={styles.bottomSheetText}>Back</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={handleGoBackToAlarmSettingsScreen}>
              <Text style={styles.bottomSheetText}>
                Android Back Placeholder
              </Text>
            </TouchableOpacity>
          </>
        ),
    });
  }, [navigation, route.params, selectedDays, styles.bottomSheetText]);

  return (
    <View style={styles.alarmSettingsRepeatOptionsPageContainer}>
      <Checkbox
        options={[
          {label: 'Every Monday', value: 'Mon '},
          {label: 'Every Tuesday', value: 'Tue '},
          {label: 'Every Wednesday', value: 'Wed '},
          {label: 'Every Thursday', value: 'Thu '},
          {label: 'Every Friday', value: 'Fri '},
          {label: 'Every Saturday', value: 'Sat '},
          {label: 'Every Sunday', value: 'Sun '},
        ]}
        checkedValues={selectedDays}
        onChange={setSelectedDays}
      />
    </View>
  );
};

export default AlarmSettingsRepeatOptionScreen;
