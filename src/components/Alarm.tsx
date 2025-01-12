import React from 'react';
import {View, Text, Switch, TouchableOpacity, Animated} from 'react-native';
import {useStyles} from './useStyles';
import {usePanResponder} from '../hooks/usePanResponder';
import {AlarmProps} from '../types';

const Alarm = ({
  alarmWeekday,
  alarmDate,
  alarmTime,
  alarmRepeat,
  alarmName,
  onToggle,
  onDelete,
  alarmIsEnabled,
}: AlarmProps) => {
  const styles = useStyles();

  const {
    pan,
    panResponder,
    resetPosition,
    redBackgroundOpacity,
    deleteTextTranslateX,
  } = usePanResponder(onDelete);

  // Handle delete action directly in the component
  const handleDeletePress = () => {
    onDelete();
    resetPosition();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.deleteBackground, {opacity: redBackgroundOpacity}]}>
        <TouchableOpacity
          style={[styles.deleteButton, {backgroundColor: 'red'}]}
          onPress={handleDeletePress}>
          <Animated.Text
            style={[
              styles.deleteButtonText,
              {transform: [{translateX: deleteTextTranslateX}]},
            ]}>
            Delete
          </Animated.Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        {...panResponder.panHandlers}
        style={[pan.getLayout(), styles.alarmContainer]}>
        <View style={styles.alarmContainerLeft}>
          <View style={styles.alarmContainerLeftTop}>
            <Text style={styles.alarmTextLeftTop}>{alarmWeekday}</Text>
            <Text style={styles.alarmTextLeftTop}>{alarmDate}</Text>
          </View>
          <View style={styles.alarmContainerLeftBottom}>
            <Text style={styles.alarmTextLeftBottom}>{alarmName}</Text>
            <Text style={styles.alarmTextLeftBottom}>{alarmRepeat}</Text>
          </View>
        </View>
        <View style={styles.alarmContainerRight}>
          <Text style={styles.alarmTextRight}>{alarmTime}</Text>
          <Switch onValueChange={onToggle} value={alarmIsEnabled} />
        </View>
      </Animated.View>
    </View>
  );
};

export default Alarm;
