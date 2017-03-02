import {StyleSheet} from 'react-native';
import _ from 'lodash';
import * as Constants from '../../helpers/Constants';
import {BorderRadiuses, Colors, Shadows, Typography, ThemeManager} from '../../style';

export default function createStyles(props, overrides) {
  const {index, height, imageSize} = props;
  const isLeftItem = index % 2 === 0;
  return StyleSheet.create(_.merge({
    container: {
      width: Constants.screenWidth / 2,
      paddingRight: isLeftItem ? 0 : 7.5,
      paddingLeft: !isLeftItem ? 0 : 7.5,
      marginTop: 15,
      height,
      backgroundColor: 'transparent',
      ...Shadows.white10.bottom,
    },
    innerContainer: {
      height,
      marginHorizontal: 7.5,
      backgroundColor: Colors.white,
      borderRadius: BorderRadiuses.br30,
      overflow: 'hidden',
    },
    topContainer: {
      height: 117,
    },
    bottomContainer: {
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingTop: 7,
      paddingBottom: 14,
      flex: 1,
    },
    titleText: {
      ...Typography.text70,
      fontWeight: '400',
      color: ThemeManager.titleColor,
    },
    secondaryTitleText: {
      ...Typography.text70,
      color: ThemeManager.titleColor,
    },
    subtitleText: {
      ...Typography.text90,
      color: ThemeManager.subtitleColor,
    },
    imageContainer: {
      flex: 1,
    },
    image: {
      flex: 1,
      height: imageSize,
      width: imageSize,
    },
  }, overrides));
}

