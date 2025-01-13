import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useStyles} from './useStyles';

type Option = {
  label: string;
  value: string;
};
interface CheckboxProps {
  options: Array<Option>;
  checkedValues: Array<string>;
  onChange: any;
}
const Checkbox = ({options, checkedValues, onChange}: CheckboxProps) => {
  const styles = useStyles();

  let updatedCheckedValues: Array<string> = [...checkedValues];

  return (
    <>
      <View style={styles.alarmSettingsRepeatOptionsContainer}>
        {options.map((option: Option) => {
          let isChecked = updatedCheckedValues.includes(option.value);
          return (
            <View
              key={`${option.value}`}
              style={styles.alarmSettingsRepeatOption}>
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => {
                  //console.group('\x1b[42m');
                  //console.log('Alarm Settings Repeat Options Screen');
                  //console.log('option.value', option.value);
                  if (isChecked) {
                    updatedCheckedValues = updatedCheckedValues.filter(
                      checkedValue => checkedValue !== option.value,
                    );
                    //console.log(
                    //  '\x1b[43m',
                    //  'if isChecked updatedCheckedValues',
                    //  updatedCheckedValues,
                    //);
                    //console.groupEnd();
                    return onChange(updatedCheckedValues);
                  }

                  updatedCheckedValues.push(option.value);
                  onChange(updatedCheckedValues);
                }}>
                <Text style={styles.bottomSheetText}>{option.label}</Text>
                <Text
                  style={isChecked ? styles.checkIcon : styles.activeCheckIcon}>
                  ✔️
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </>
  );
};
export default Checkbox;
