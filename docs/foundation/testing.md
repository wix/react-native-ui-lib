---
index: 6
path: "/foundation/modifiers"
title: 'Testing'
---
#
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
    <h1>Testing</h1>
    <label style={{
      backgroundColor: "#5848ff", 
      color: "#ffffff", 
      borderRadius: "5px",
      padding: "5px 10px", 
      margin: "10px",
      display: "flex",
      alignItems: "center"
    }}>
      <span>Experimental</span>
    </label>
</div>

Testkits allows us to test components without knowing the internal implementation, making it easier to test and reduce over head from migrations and changes in implementation. For example:
* Changing the input of a `TextField` component can be done using the driver's `changeText`
* Pressing a button could be achieved using the Button driver's press function.
## How to use the testkits
### Initializing the driver
In order to initialize a test driver you pass it the renderTree and the component's testId as an object.

### Example
Suppose we have a form that takes a `first name`, `last name` and an `address` and we want to test the submitting of this form. Our form component will look something like this:
```jsx
import {Button, TextField, View} from '@wix/wix-react-native-ui-lib';

type OnSubmitHandler = (firstName: string, lastName: string, address: string) => void;
const MyForm = (props: {onSubmit: OnSubmitHandler}) => {
  const {onSubmit} = props;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  return (
    <View>
      <TextField label="First name" onChangeText={(value) => setFirstName(value)} value={firstName}/>
      <TextField label="Last name" onChangeText={(value) => setLastName(value)} value={lastName}/>
      <TextField label="Address" onChangeText={(value) => setAddress(value)} value={address}/>
      <Button label="Submit" onPress={() => onSubmit(firstName, lastName, address)}/>
    </View>
  );
};
```
### Testing our flow
#### In order to test our flow we would do the following steps:
1. Import the TextField and Button driver from UI-LIB's testkit
```javascript
import {TextFieldDriver, ButtonDriver} from '@wix/react-native-ui-lib/testkit';
```
2. render our test case
```javascript
const renderTree = render(<MyForm onSubmit={onSubmit}/>);
```
3. Initialize our drivers for the TextFields and submit button
```javascript
const firstNameDriver = TextFieldDriver({renderTree, testID: 'firstName'});
const lastNameDriver = TextFieldDriver({renderTree, testID: 'lastName'});
const addressDriver = TextFieldDriver({renderTree, testID: 'address'});
const submitBtnDriver = ButtonDriver({renderTree, testID: 'submit'});
```
4. Change the text of the fields and submit the form.
```javascript
firstNameDriver.changeText('Musa');
lastNameDriver.changeText('The Man');
addressDriver.changeText('Yunitzman 5');
submitBtnDriver.press();
```
5. Check that the correct values were passed to the submit handler
```javascript
expect(onSubmit).toHaveBeenCalledWith('Musa', 'The Man', 'Yunitzman 5');
```
<details>
<summary>Full test</summary>

```javascript
describe('My Form', () => {
  it('should submit MyForm with Musa The Man, Yunitzman 5', () => {
    const onSubmit = jest.fn();
    const renderTree = render(<MyForm onSubmit={onSubmit}/>);
    const firstNameDriver = TextFieldDriver({renderTree, testID: 'firstName'});
    const lastNameDriver = TextFieldDriver({renderTree, testID: 'lastName'});
    const addressDriver = TextFieldDriver({renderTree, testID: 'address'});
    const submitBtnDriver = ButtonDriver({renderTree, testID: 'submit'});
    firstNameDriver.changeText('Musa');
    lastNameDriver.changeText('The Man');
    addressDriver.changeText('Yunitzman 5');
    submitBtnDriver.press();
    expect(onSubmit).toHaveBeenCalledWith('Musa', 'The Man', 'Yunitzman 5');
  });
});
```
</details>


