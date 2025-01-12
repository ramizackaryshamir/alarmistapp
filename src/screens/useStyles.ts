import {useMemo} from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {Colors} from '../lib/Colors';

export const useStyles = () => {
  const {height, width} = useWindowDimensions();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        homeScreenContainer: {
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: width,
          height: height,
          backgroundColor: Colors.blackPurple2,
        },
        homeScreenAddAlarmButton: {
          bottom: 300,
          width: 30,
          height: 30,
          backgroundColor: '#E4EBE6',
        },
        alarmsContainer: {
          top: 60,
          justifyContent: 'center',
          rowGap: 5,
          width: width < 500 ? width - 30 : width - 10,
        },
        digitalClockScreenContainer: {
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: width,
          height: height,
          backgroundColor: Colors.VibrantOrange,
        },
        settingsContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: 100,
        },
        screenClockScreenContainer: {
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: width,
          height: height,
        },
        headerIconText: {
          fontSize: 30,
          fontVariant: ['small-caps', 'common-ligatures'],
          letterSpacing: 1,
          color: Colors.white,
        },
      }),
    [height, width],
  );
  return styles;
};
