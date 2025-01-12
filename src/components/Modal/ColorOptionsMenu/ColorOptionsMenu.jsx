import React, {useState} from 'react';
import {View} from 'react-native';
import ColorOptionsButton from './ColorOptionsButton';
import {useStyles} from '../useStyles';
const ColorOptionsMenu = () => {
  const [color, setColor] = useState({
    _E8E500: '#E8E500',
    _FF2281: '#FF2281',
    _75D5FD: '#75D5FD',
    _7122FA: '#7122FA',
    _09FBD3: '#09FBD3',
  });

  const styles = useStyles();

  return (
    <View style={styles.modalOptionButtonsContainer}>
      <ColorOptionsButton
        //onPress={() => console.log(setColor())}
        colorOption={color._E8E500}
      />
      <ColorOptionsButton
        //onPress={() => console.log(setColor())}
        colorOption={color._FF2281}
      />
      <ColorOptionsButton
        //onPress={() => console.log(setColor())}
        colorOption={color._75D5FD}
      />
      <ColorOptionsButton
        //onPress={() => console.log(setColor())}
        colorOption={color._09FBD3}
      />
      <ColorOptionsButton
        //onPress={() => console.log(setColor())}
        colorOption={color._7122FA}
      />
    </View>
  );
};
export default ColorOptionsMenu;
