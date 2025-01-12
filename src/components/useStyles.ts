import {useMemo} from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {useResponsiveFont} from '../hooks/useResponsiveFont';
import {Colors} from '../lib/Colors';
import {generateRandomColors} from '../lib/utils';

export const useStyles = () => {
  const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = useWindowDimensions();
  const fontSize = useResponsiveFont(16);

  let randomColor = generateRandomColors().toString();
  //console.log(generateRandomColors());

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          width: '100%',
          position: 'relative',
        },
        alarmContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 15,
          borderBottomColor: '#dddddd',
          borderBottomWidth: 1,
          backgroundColor: randomColor,
        },
        deleteBackground: {
          ...StyleSheet.absoluteFillObject,
          flexDirection: 'row', // Arrange buttons horizontally
          padding: 0, // No padding to avoid overlaps
          alignItems: 'center', // Vertically center buttons
          backgroundColor: 'red',
        },

        buttonsContainer: {
          flexDirection: 'row', // Place buttons side by side
          justifyContent: 'space-between', // Ensure buttons are adjacent
          alignItems: 'stretch', // Make buttons span the full height
          position: 'absolute', // Position the buttons container absolutely
          right: 0, // Align to the right of the screen
          top: 0,
          bottom: 0, // Make it span the full height of the red background
          width: 100, // Set exact width to fit two 80px-wide buttons (adjust if needed)
        },

        editButton: {
          //flex: 1, // Each button takes half the container width
          justifyContent: 'center',
          alignItems: 'center',
          width: '50%',
          height: '100%', // Make the button span full height of the container
          backgroundColor: 'orange',
        },

        editButtonText: {
          position: 'absolute',
          color: 'white',
          fontSize: fontSize / 1.3,
          fontWeight: 'bold',
        },
        deleteButton: {
          //flex: 1, // Each button takes half the container width
          justifyContent: 'center',
          alignItems: 'center',
          width: '50%',
          height: '100%', // Make the button span full height of the container
          backgroundColor: 'red',
        },

        deleteButtonText: {
          color: 'white',
          fontSize: fontSize / 1.3,
          fontWeight: 'bold',
        },
        //deleteBackground: {
        //  ...StyleSheet.absoluteFillObject,
        //position: 'absolute',
        //left: 0,
        //right: 0,
        //top: 0,
        //bottom: 0,
        //flexDirection: 'row',
        //justifyContent: 'space-between',
        //alignItems: 'center',
        //},
        //editButton: {
        //  position: 'absolute',
        //  right: 60,
        //  justifyContent: 'center',
        //  alignItems: 'center',
        //  //width: 80,
        //  height: '100%',
        //  backgroundColor: 'orange',
        //  borderRadius: 5,
        //},
        //editButtonText: {
        //  color: 'white',
        //  fontWeight: 'bold',
        //},
        //deleteButton: {
        //  position: 'absolute',
        //  right: 0,
        //  justifyContent: 'center',
        //  alignItems: 'center',
        //  //width: 80,
        //  height: '100%',
        //  backgroundColor: 'red',
        //  borderRadius: 5,
        //},
        //deleteButtonText: {
        //  //paddingRight: 65,
        //  color: '#ffffff',
        //  fontWeight: 'bold',
        //},
        alarmContainerLeft: {
          width: '50%',
        },
        alarmContainerLeftTop: {
          flexDirection: 'row',
          justifyContent: 'flex-start',
          columnGap: 5,
          paddingBottom: 3,
          paddingLeft: 10,
        },
        alarmTextLeftTop: {
          color: 'white',
          fontSize: 15,
        },
        alarmContainerLeftBottom: {
          flexDirection: 'row',
          justifyContent: 'flex-start',
          paddingLeft: 10,
          columnGap: 5,
        },
        alarmTextLeftBottom: {
          color: 'white',
          fontSize: 10,
        },
        alarmContainerRight: {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          columnGap: 5,
          width: '50%',
          backgroundColor: randomColor,
        },
        alarmTextRight: {
          color: 'white',
          fontSize: 40,
          letterSpacing: 3,
          lineHeight: 50,
        },
        digitalClockContainer: {
          top: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: SCREEN_WIDTH - 120,
          height: SCREEN_HEIGHT - 140,
          borderWidth: 10,
          borderRadius: 15,
          backgroundColor: '#223240',
        },
        digitalClockRight: {
          flexDirection: 'row',
        },
        digitalClockText: {
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 200,
          color: Colors.vibrantPink,
        },
        screenClockContainer: {
          flexDirection: SCREEN_WIDTH > 500 ? 'row' : 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          backgroundColor: Colors.vibrantPink,
        },
        screenClockText: {
          fontSize: 300,
          color: Colors.blackPurple1,
        },
        menuContainer: {
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          position: 'relative',
          bottom: 0,
          paddingTop: 15,
          width: SCREEN_WIDTH,
          height: 55,
          backgroundColor: Colors.blackPurple3,
        },
        bottomSheetText: {
          fontVariant: ['small-caps', 'common-ligatures'],
          letterSpacing: 1,
          color: Colors.white,
          fontSize: SCREEN_WIDTH > 500 ? 20 : 10,
        },
      }),
    [SCREEN_WIDTH, SCREEN_HEIGHT, randomColor, fontSize],
  );
  return styles;
};
