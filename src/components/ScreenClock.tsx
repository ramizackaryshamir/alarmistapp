import React from 'react';
import {View, Text} from 'react-native';
import {useStyles} from './useStyles';
import {useShowTime} from '../hooks/useShowTime';

const ScreenClock = () => {
  const styles = useStyles();
  const localTime = useShowTime();

  return (
    <View style={styles.screenClockContainer}>
      <Text style={styles.screenClockText}>{localTime.hour}</Text>
      <View>
        <Text>{localTime.second}</Text>
      </View>
      <Text style={styles.screenClockText}>{localTime.minute}</Text>
    </View>
  );
};

export default ScreenClock;
