import React from 'react';
import {View, Text, Switch, TouchableOpacity, Animated} from 'react-native';
import {useStyles} from './useStyles';
import {usePanResponder} from '../hooks/usePanResponder';
import {AlarmProps} from '../types';
import {useConsoleColors} from '../hooks/useConsoleColors';

const Alarm = ({
  alarmWeekday,
  alarmDate,
  alarmHour,
  alarmMinute,
  alarmSecond,
  alarmGMTTime,
  alarmTime,
  alarmRepeat,
  alarmName,
  onToggle,
  onDelete,
  onEdit,
  alarmIsEnabled,
}: AlarmProps) => {
  const {BgYellowConsole} = useConsoleColors();

  const styles = useStyles();

  const {
    pan,
    panResponder,
    resetPosition,
    redBackgroundOpacity,
    editTextTranslateX,
    deleteTextTranslateX,
  } = usePanResponder(onDelete, onEdit);

  const handleEditPress = () => {
    onEdit();
    resetPosition();
  };

  // Handle delete action directly in the component
  const handleDeletePress = () => {
    onDelete();
    resetPosition();
  };

  BgYellowConsole(alarmTime);
  return (
    <View style={styles.container}>
      {/*Red background*/}
      <Animated.View
        style={[styles.deleteBackground, {opacity: redBackgroundOpacity}]}>
        <View style={styles.buttonsContainer}>
          {/*Edit Button*/}
          <TouchableOpacity
            style={[styles.editButton]}
            onPress={handleEditPress}>
            <Animated.Text
              style={[
                styles.editButtonText,
                {transform: [{translateX: editTextTranslateX}]},
              ]}>
              Edit
            </Animated.Text>
          </TouchableOpacity>
          {/*DeleteButton*/}
          <TouchableOpacity
            style={[styles.deleteButton]}
            onPress={handleDeletePress}>
            <Animated.Text
              style={[
                styles.deleteButtonText,
                {transform: [{translateX: deleteTextTranslateX}]},
              ]}>
              Delete
            </Animated.Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      {/*Swipeable Alarm Item*/}
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
