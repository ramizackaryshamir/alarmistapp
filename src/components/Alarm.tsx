import React from 'react';
import {View, Text, Switch, TouchableOpacity, Animated} from 'react-native';
import {useStyles} from './useStyles';
import {usePanResponder} from '../hooks/usePanResponder';
import {AlarmProps} from '../types';
import {useConsoleColors} from '../hooks/useConsoleColors';
import {convertTo12HourFormat} from '../lib/utils';

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

  const date = new Date(alarmTime);
  const formattedDate = date.toString();
  const formattedWeekday = formattedDate.slice(0, 3);
  const formattedMDY = formattedDate.slice(4, 15);
  const formattedTime = formattedDate.slice(16, 21);
  BgYellowConsole(formattedDate);
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
            <Text style={styles.alarmTextLeftTop}>{formattedWeekday}</Text>
            <Text style={styles.alarmTextLeftTop}>{formattedMDY}</Text>
          </View>
          <View style={styles.alarmContainerLeftBottom}>
            <View style={styles.alarmContainerAlarmName}>
              <Text style={styles.alarmTextAlarmName}>{alarmName}</Text>
            </View>
            {alarmRepeat.length > 0 ? (
              <View style={styles.alarmContainerAlarmRepeat}>
                <Text style={styles.alarmTextAlarmRepeat}>{alarmRepeat}</Text>
              </View>
            ) : null}
          </View>
        </View>
        <View style={styles.alarmContainerRight}>
          <Text style={styles.alarmTextRight}>
            {/* {militaryTime ? formattedTime : */}
            {convertTo12HourFormat(formattedTime)}
            {/* } */}
          </Text>
          <Switch
            style={{
              marginRight: 10,
              transform: [{scaleX: 0.5}, {scaleY: 0.5}],
            }}
            onValueChange={onToggle}
            value={alarmIsEnabled}
          />
        </View>
      </Animated.View>
    </View>
  );
};

export default Alarm;
