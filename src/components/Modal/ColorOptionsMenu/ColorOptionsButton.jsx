import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

const ColorOptionsButton = ({colorOption, onPress}) => {
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
export default ColorOptionsButton;

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
