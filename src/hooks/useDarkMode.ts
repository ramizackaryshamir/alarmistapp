import {useState} from 'react';
import {Appearance} from 'react-native';

export const useDarkMode = () => {
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener(scheme => setTheme(scheme.colorScheme));

  return {theme};
};
