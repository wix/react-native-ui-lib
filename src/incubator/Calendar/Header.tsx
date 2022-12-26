import React from 'react';
import {StyleSheet} from 'react-native';
import View from '../../components/view';
import Text from '../../components/text';
import {HeaderProps} from './types';

const Header = (props: HeaderProps) => {
  const {month, year} = props;
  
  const renderTitle = () => {
    return <Text>{month}-{year}</Text>;
  };

  return (
    <View center style={styles.container}>
      {renderTitle()}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    
  }
});
