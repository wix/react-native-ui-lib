import {StyleSheet} from 'react-native';
import {BorderRadiuses, Colors, Spacings} from '../../../style';
import underline from './underline';

const styles = StyleSheet.create({
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
  fieldStyle: styles.field
};
