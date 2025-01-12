import React from 'react';
import {View, Text, FlatList} from 'react-native';
import AlarmSettingsSoundOption from '../components/AlarmSettingsSoundOption';
import {useStyles} from './useStyles';
import {PianoLoopsRT} from 'piano-loops_ringtone.wav';
import {SoundWaveRT} from 'sound-wave-ringtone.wav';

const AlarmSettingsSoundOptionsScreen = () => {
  const styles = useStyles();
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: 'bd7acbea-aac1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c6a05-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3tda1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: 'bd7acbea-aacew1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-ca6a05-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3tda1-4ds71f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

  return (
    <View style={styles.alarmSettingsSoundPageContainer}>
      <Text>Ringtone</Text>
      <View style={styles.alarmSettingsSoundFlatListContainer}>
        <View style={styles.alarmSettingsSoundContainer}>
          <FlatList
            data={DATA}
            renderItem={item => (
              <AlarmSettingsSoundOption ringtone={item.title} />
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </View>
  );
};

export default AlarmSettingsSoundOptionsScreen;
