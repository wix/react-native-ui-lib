import React from 'react';
import {render} from '@testing-library/react-native';
import MaskedInput from '../new';
import Text from '../../../components/text';
import {TextFieldDriver} from '../../textField/TextField.driver.new';

const testID = 'field';

const TestCase = () => {
  return <MaskedInput testID={testID} renderMaskedText={(text?: string) => <Text>{text}</Text>}/>;
};

describe('MaskedInput (new)', () => {
  it('Sanity - it renders', () => {
    const renderTree = render(<TestCase/>);
    const mainInputDriver = TextFieldDriver({renderTree, testID});
    mainInputDriver.exists();
  });
});
