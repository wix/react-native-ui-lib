import React from 'react';
import Link from 'gatsby-link';

import './index.scss';
import Layout from '../components/layout';
import mainLogo from '../images/logo_big.png';
import datePicker from '../images/examples/datepicker.png';
import actionSheet from '../images/examples/actionSheet.png';
import rtl from '../images/examples/rtl.png';
import accessibility from '../images/examples/accessibility.gif';

const IndexPage = props => {
  return (
    <Layout {...props} showSidebar={false}>
      <div className="main-page">
        <div className="main-section">
          <div className="logo-box">
            <img className="logo" src={mainLogo} alt="main-logo"/>

            <Link className="docs-button" to="/docs/">
              Enter Docs
            </Link>

            <p className="description">UI Toolset & Components Library for React Native</p>

            <div className="qr">
              <img
                src={
                  'https://user-images.githubusercontent.com/1780255/76164023-f2171400-6153-11ea-962d-d57b64a08a80.png'
                }
              />

              <a href="https://snack.expo.io/@ethanshar/rnuilib_snack" target="_blank" rel="noopener noreferrer">
                Or try our demo on Expo-Snack
              </a>
            </div>
          </div>
        </div>
        <PlatformSection/>
        <ToolsetSection/>
        <NativeSection/>
        <OthersSection/>
      </div>
    </Layout>
  );
};

const PlatformSection = () => {
  return (
    <div className="platforms-section">
      <div>
        <img height="500" src={datePicker} style={{zIndex: 10}}/>
        <img height="400" src={actionSheet}/>
      </div>
      <div>
        <h1>A Cross-Platform Components Library</h1>
        <p>
          Building a cross-platform app can be time consuming especially when one needs to find solutions that suit each
          platform. While React Native solve this issue, still, some components originated from one platform and don't
          exist in the other.
        </p>
        <p>
          <b>ActionSheet</b> is a good example of an iOS component that just does not exist on Android.{' '}
          <b>DatePicker</b> has a different API and behavior for each platform instead of a unified component.
        </p>
        <p>The UILIB aims to solve that.</p>
      </div>
    </div>
  );
};

const ToolsetSection = () => {
  return (
    <div className="toolset-section">
      <h1>Toolset for Building Amazing Apps with No Effort</h1>
      <p>
        <h3>Step 1</h3> Define your app base foundation. Things like colors, typography and spacings.
      </p>
      <div className="code-examples">
        <code>
          {`import {Colors} from 'react-native-ui-lib';\n
Colors.loadColors({\n  primaryColor: '#2364AA',\n  secondaryColor: '#81C3D7',\n  textColor: '#221D23',\n  errorColor: '#E63B2E',\n  successColor: '#ADC76F',\n  warnColor: '#FF963C'\n});`}
        </code>
        <code>
          {`import {Typography} from 'react-native-ui-lib';\n\nTypography.loadTypographies({\n  heading: {fontSize: 36, fontWeight: '600'},\n  subheading: {fontSize: 28, fontWeight: '500'},\n  body: {fontSize: 18, fontWeight: '400'} \n});`}
        </code>
        <code>{`import {Spacings} from 'react-native-ui-lib';\n\nSpacings.loadSpacings({\n  page: 20,\n  card: 12,\n  gridGutter: 16 \n});`}</code>
      </div>
      <p>
        <h3>Step 2</h3> Set a theme for your components.
      </p>
      <div className="code-examples">
        <code>
          {`import {ThemeManager} from 'react-native-ui-lib';\n
// with plain object \nThemeManager.setComponentTheme('Card', {\n  borderRadius: 8,\n  activeOpacity: 0.9 \n});`}
        </code>
        <code>
          {`// with a dynamic function
ThemeManager.setComponentTheme('Button', (props, context) => {
  // 'square' is not an original Button prop, but a custom prop that can
  // be used to create different variations of buttons in your app
  if (props.square) {
    return {
      borderRadius: 0
    };
  }
});`}
        </code>
      </div>
      <p>
        <h3>Step 3</h3> Build your app. With our auto-generated modifiers, it's a matter of minutes till you create your
        first beautiful screen.
      </p>
      <div className="code-examples">
        <code>
          {`import React, {Component} from 'react';
import {View, Text, Card, Button} from 'react-native-ui-lib';

class MyScreen extends Component {
  render() {
    return (
      <View flex padding-page>
        <Text heading marginB-s4>My Screen</Text>
        <Card height={100} center padding-card marginB-s4>
          <Text body>This is an example card </Text>
        </Card>
        
        <Button label="Button" body bg-primaryColor square></Button>
      </View>
    );
  }
}`}
        </code>
      </div>
    </div>
  );
};

const NativeSection = () => {
  return (
    <div className="components-section">
      <h2>Over than 60 Beautiful Components</h2>
      <p>
        Basic components like <b>Button</b>, <b>Avatar</b> and <b>Card</b> and more sophisticated ones like <b>Hints</b>
        , <b>ColorPicker</b> and <b>Drawer</b>
      </p>
      <div className="image-examples">
        <img src="https://user-images.githubusercontent.com/1780255/72094962-3044b280-3320-11ea-8e41-aa83743bafb9.gif"/>
        <img src="https://user-images.githubusercontent.com/1780255/72094961-3044b280-3320-11ea-95e2-9aa745c8b07d.gif"/>
        <img src="https://user-images.githubusercontent.com/1780255/72094959-2fac1c00-3320-11ea-952b-53f864fd7ea4.gif"/>
        <img src="https://user-images.githubusercontent.com/1780255/72094958-2fac1c00-3320-11ea-8f67-9d759cfa4ae1.gif"/>
        <img src="https://user-images.githubusercontent.com/1780255/72094957-2fac1c00-3320-11ea-86a6-e47cf78093ec.gif"/>
        <img src="https://user-images.githubusercontent.com/1780255/72094955-2f138580-3320-11ea-811e-a808d90e7ff0.gif"/>
      </div>
    </div>
  );
};

const OthersSection = () => {
  return (
    <div className="support-section">
      <div>
        <h2>RTL and Accessibility in Mind</h2>
        <p>We provide a full, out-of-the-box support to RTL and Accessibility</p>
      </div>
      <div>
        <img src={accessibility} height="500"/>
        <img src={rtl} height="500"/>
      </div>
    </div>
  );
};

export default IndexPage;
