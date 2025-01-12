import {StyleSheet, useWindowDimensions} from 'react-native';

export const useStyles = () => {
  const {width} = useWindowDimensions();

  const styles = StyleSheet.create({
    modalContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: width > 500 ? '30%' : '60%',
      left: -100,
      width: 300,
      height: 70,
      zIndex: 100,
      borderRadius: 20,
      backgroundColor: 'rgba(28, 18, 255, 1)',
    },
    modalOptionButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginRight: 10,
      marginLeft: 10,
    },
    toggleModalButton: {
      justifyContent: 'center',
      alignItems: 'center',
      top: 20,
      width: 40,
      height: 30,
      borderRadius: 5,
      backgroundColor: '#1AAB8A',
      padding: 2,
      cursor: 'pointer',
    },
    toggleModalButtonText: {
      color: '#fff',
      fontSize: 10,
      fontVariant: ['small-caps'],
    },
  });
  return styles;
};
