import {StyleSheet, PixelRatio} from 'react-native';
import {Constants} from '../../helpers';
import {Colors, Typography} from '../../style';


export default function createStyles() {
  const separatorColor = Colors.dark70;
  const bottomTextMargin = 4; // use margins to center the text until we move to using assets

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center'
      // paddingLeft: Constants.isIOS ? 16 : undefined,
      // paddingRight: Constants.isIOS ? 16 : undefined,
    },
    buttons: {
      flexDirection: 'row',
      borderRadius: Constants.isIOS ? 21 : 2,
      borderWidth: 1,
      borderColor: separatorColor,
      width: Constants.isIOS ? 100 : 98,
      height: Constants.isIOS ? 42 : 35
    },
    button: {
      flex: 0.5,
      alignItems: 'center',
      justifyContent: 'center'
    },
    title: {
      justifyContent: 'center',
      flex: 0.6,
      height: Constants.isIOS ? 70 : 68
    },
    titleText: {
      ...Typography.text70,
      color: Colors.dark10
    },
    separator: {
      marginTop: Constants.isIOS ? 4 : 2,
      height: Constants.isIOS ? 32 : 30,
      borderWidth: Constants.isIOS ? 1 / PixelRatio.get() : undefined,
      borderLeftWidth: Constants.isIOS ? undefined : 1,
      borderColor: separatorColor
    },
    buttonText: {
      ...Typography.text40,
      fontWeight: '200',
      color: Colors.primary,
      backgroundColor: 'transparent',
      marginBottom: bottomTextMargin
    },
    disableText: {
      color: Colors.dark70,
      marginBottom: bottomTextMargin
    }
  });
}
