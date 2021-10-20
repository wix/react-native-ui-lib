import React from 'react';
import {AppRegistry} from 'react-native';
import {map} from 'lodash';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {screens, loadDemoConfigurations} from 'unicorn-demo-app';
import MainScreen from './MainScreen';

loadDemoConfigurations()

const Stack = createStackNavigator();

import {View, Text} from 'react-native-ui-lib';

// export default function App() {
//   return (
//     <View flex>
//       <MainScreen/>
//     </View>
//   );
// }


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen}/>
        {map(screens, (screen, key) => {      
            return <Stack.Screen key={key} name={key.replace('Screen', '')} component={screen}/>;
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}