import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

const ColorOptionButton = ({colorOption, onPress}) => {
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.colorOptionButtonContainer,
          {backgroundColor: colorOption},
        ]}
      />
    </>
  );
};
export default ColorOptionButton;

const styles = StyleSheet.create({
  colorOptionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 40,
    height: 40,
    padding: 10,
    borderRadius: 20,
    borderWidth: 2,
    margin: 20,
  },
});
