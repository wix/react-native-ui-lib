import React from 'react';
import styles from './CodeSection.module.scss';
import UILivePreview from './UILivePreview';

export default () => {
  const code = `
    Colors.loadColors({
  $backgroundDefault: Colors.purple80,
  }),
  ThemeManager.setComponentTheme('Button', {
    backgroundColor: Colors.orange30,
  }),
  ThemeManager.setComponentTheme('TextField', {
    preset: 'outline',
    fieldStyle: {borderColor: Colors.orange30}
  }),
  function LiveExample(props) {
    return (
      <View flex padding-s5 centerV bg-$backgroundDefault>
      <View flex center>
        <Text text50>Welcome</Text>
      </View>
      <View flex gap-s4>
        <TextField label="Username" placeholder="Enter username" />
        <TextField label="Password" placeholder="Enter password" helperText="1-8 characters" secureTextEntry/>
        <Button label="Login" />
      </View>
      </View>
    );
  };

  `;

  return (
    <div className={styles.codeSection}>
      <UILivePreview code={code} liveScopeSupport/>
    </div>
  );
};
