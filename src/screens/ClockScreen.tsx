import React from 'react';
import {View, useWindowDimensions} from 'react-native';
import DigitalClock from '../components/DigitalClock';
import ScreenClock from '../components/ScreenClock';
import Menu from '../components/Menu';
import Modal from '../components/Modal/Modal';
import ColorOptionsMenu from '../components/Modal/ColorOptionsMenu/ColorOptionsMenu';
import {useStyles} from './useStyles';
const ClockScreen = ({navigation}) => {
  const styles = useStyles();
  const {width} = useWindowDimensions();
  return (
    <>
      {width > 500 ? (
        <>
          <View style={styles.digitalClockScreenContainer}>
            <DigitalClock />
            <View style={styles.settingsContainer}>
              <Modal>
                <ColorOptionsMenu />
              </Modal>
            </View>
          </View>
          <Menu navigation={navigation} />
        </>
      ) : (
        <>
          <View style={styles.screenClockScreenContainer}>
            <ScreenClock />
          </View>
          <Menu navigation={navigation} />
        </>
      )}
    </>
  );
};

export default ClockScreen;
