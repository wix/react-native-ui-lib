import {StyleSheet, PixelRatio} from 'react-native';
import Colors from './colors';

const Components = StyleSheet.create({
  accessoryIndicator: {
    width: 10,
    height: 10,
    marginLeft: 10,
    backgroundColor: 'transparent',
    borderTopWidth: 3 / PixelRatio.get(),
    borderRightWidth: 3 / PixelRatio.get(),
    borderColor: Colors.dark60,
    transform: [
      {
        rotate: '45deg'
      }
    ]
  }
});

export default Components;
