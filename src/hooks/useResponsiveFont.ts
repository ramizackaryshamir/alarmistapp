import {Dimensions} from 'react-native';

export const useResponsiveFont = (baseSize: number) => {
  const {width} = Dimensions.get('window');
  const responsiveFont = (width / 376) * baseSize;

  return responsiveFont;
};
