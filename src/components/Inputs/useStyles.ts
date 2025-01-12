import {StyleSheet, useWindowDimensions} from 'react-native';
import {Colors} from '../../lib/Colors';

export const useStyles = () => {
  const {width} = useWindowDimensions();

  const styles = StyleSheet.create({
    alarmSettingsRepeatOptionsContainer: {
      width: width - 30,
      marginTop: 50,
      borderColor: Colors.blackPurple3,
      borderTopWidth: 5,
      borderBottomWidth: 5,
      borderRadius: 5,
      backgroundColor: Colors.blackPurple1,
    },
    alarmSettingsRepeatOption: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: 40,
      paddingRight: 10,
      paddingLeft: 10,
      marginBottom: 5,
      borderWidth: 0,
      backgroundColor: Colors.blackPurple3,
    },
    bottomSheetText: {
      fontVariant: ['small-caps', 'common-ligatures'],
      letterSpacing: 1,
      color: Colors.white,
    },
    checkboxContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    checkIcon: {
      color: Colors.white,
      fontSize: 20,
    },
    activeCheckIcon: {
      color: 'transparent',
      fontSize: 20,
    },
  });
  return styles;
};
