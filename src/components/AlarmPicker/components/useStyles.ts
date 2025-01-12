import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {Colors} from '../../../lib/Colors';
import {useDarkMode} from '../../../hooks/useDarkMode';

export const useStyles = () => {
  const {theme} = useDarkMode();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        bottomSheetRowView: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 50,
          paddingLeft: 5,
          paddingRight: 5,
          backgroundColor:
            theme === 'dark' ? Colors.blackPurple3 : Colors.vibrantWhite3,
        },
        bottomSheetText: {
          color: theme === 'dark' ? Colors.white : Colors.blackPurple1,
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
          backgroundColor: 'green',
        },
      }),
    [theme],
  );
  return styles;
};
