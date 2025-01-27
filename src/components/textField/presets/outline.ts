import {StyleSheet} from 'react-native';
import {BorderRadiuses, Colors, Spacings} from '../../../style';
import underline from './underline';

const styles = StyleSheet.create({
  clearButtonStyle: {marginLeft: Spacings.s3},
  field: {
    borderWidth: 1,
    borderColor: Colors.$outlineDisabled,
    borderRadius: BorderRadiuses.br20,
    paddingHorizontal: Spacings.s3,
    paddingVertical: Spacings.s2
  }
});

export default {
  ...underline,
  clearButtonStyle: styles.clearButtonStyle,
  fieldStyle: styles.field
};
