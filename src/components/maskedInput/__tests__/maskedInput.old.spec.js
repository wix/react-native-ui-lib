import React from 'react';
import { render } from '@testing-library/react-native';
import MaskedInput from "../old";
import Text from "../../../components/text";
import { TextFieldDriver } from "../../textField/TextField.driver.new";
const testID = 'field';
const TestCase = () => {
  // @ts-expect-error - this has an error, but this is an old component and I don't want to spend time fixing it
  return <MaskedInput testID={testID} renderMaskedText={text => <Text>{text}</Text>} />;
};
describe('MaskedInput (old)', () => {
  it('Sanity - it renders', () => {
    const renderTree = render(<TestCase />);
    const mainInputDriver = TextFieldDriver({
      renderTree,
      testID
    });
    mainInputDriver.exists();
  });
});