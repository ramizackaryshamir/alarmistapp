import {useState, useRef} from 'react';
import {useWindowDimensions, PanResponder, Animated} from 'react-native';

export const usePanResponder = (onDelete: any, onEdit: any) => {
  const [isShowDelete, setIsShowDelete] = useState(false);
  const {width} = useWindowDimensions();

  const SWIPE_THRESHOLD_SNAP = -width * 0.25;
  const SWIPE_THRESHOLD_DELETE = -width * 0.6;
  const pan = useRef(new Animated.ValueXY()).current;

  const redBackgroundOpacity = pan.x.interpolate({
    inputRange: [SWIPE_THRESHOLD_SNAP, 0],
    outputRange: [1, 0], // red background fades in as uswer swipes left
    extrapolate: 'clamp',
  });

  const editTextTranslateX = pan.x.interpolate({
    inputRange: [-width * 0.5, 0],
    outputRange: [0, 2], //Edit text becomes visiblke earlier than Delete
    extrapolate: 'clamp',
  });

  const deleteTextTranslateX = pan.x.interpolate({
    inputRange: [-width, -SWIPE_THRESHOLD_SNAP],
    outputRange: [0, 2], // text starts partially visible, fully visible at threshold
    extrapolate: 'clamp',
  });

  const snapToPartial = () => {
    Animated.spring(pan, {
      toValue: {x: SWIPE_THRESHOLD_SNAP, y: 0},
      useNativeDriver: false,
    }).start();
    setIsShowDelete(true);
  };

  // Reset swipe position smoothly
  const resetPosition = () => {
    Animated.spring(pan, {
      toValue: {x: 0, y: 0},
      useNativeDriver: false,
    }).start();
    setIsShowDelete(false);
  };

  const deletePosition = () => {
    Animated.timing(pan, {
      toValue: {x: -width, y: 0},
      useNativeDriver: false,
      duration: 300,
    }).start(() => {
      onDelete();
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        if (gesture.dx < 0) {
          pan.setValue({x: gesture.dx, y: 0});
        }
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx < SWIPE_THRESHOLD_DELETE) {
          deletePosition();
        } else if (gesture.dx < SWIPE_THRESHOLD_SNAP) {
          snapToPartial();
        } else {
          resetPosition(); // Reset position if threshold not met
        }
      },
    }),
  ).current;

  return {
    isShowDelete,
    pan,
    panResponder,
    resetPosition,
    deletePosition,
    redBackgroundOpacity,
    editTextTranslateX,
    deleteTextTranslateX,
  };
};
