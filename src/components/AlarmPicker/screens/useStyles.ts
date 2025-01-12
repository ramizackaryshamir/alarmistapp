import {useMemo} from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {Colors} from '../../../lib/Colors';
import {useDarkMode} from '../../../hooks/useDarkMode';

export const useStyles = () => {
  const {width, height} = useWindowDimensions();
  const {theme} = useDarkMode();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        bottomSheetContainer: {
          alignItems: 'center',
          width: width,
          height: height,
          backgroundColor:
            theme === 'dark' ? Colors.blackPurple2 : Colors.vibrantWhite2,
        },
        bottomSheetSettings: {
          width: width,
          borderWidth: 1,
          //borderColor: Colors.blackPurple1,
          borderRadius: 5,
          backgroundColor:
            theme === 'dark' ? Colors.blackPurple3 : Colors.vibrantWhite3,
        },
        bottomSheetRowView: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 50,
          paddingLeft: 5,
          paddingRight: 5,
          borderBottomWidth: 1,
          color: theme === 'dark' ? Colors.white : Colors.blackPurple1,
        },

        bottomSheetInput: {
          height: 50,
          paddingLeft: 5,
          paddingRight: 5,
          color: Colors.white,
        },
        bottomSheetText: {
          fontVariant: ['small-caps', 'common-ligatures'],
          letterSpacing: 1,
          color: theme === 'dark' ? Colors.white : Colors.blackPurple1,
        },
        alarmSettingsRepeatOptionsPageContainer: {
          alignItems: 'center',
          width: width,
          height: height,
          paddingTop: 20,
          backgroundColor: Colors.blackPurple2,
        },
        alarmSettingsSoundPageContainer: {
          alignItems: 'center',
          width: width,
          height: height,
          paddingTop: 20,
          backgroundColor: '#FF00FF',
        },
        alarmSettingsSoundFlatListContainer: {
          width: width - 20,
          marginTop: 50,
          borderColor: 'black',
          borderWidth: 5,
          borderRadius: 5,
          backgroundColor: 'white',
        },
      }),
    [width, height, theme],
  );
  return styles;
};
