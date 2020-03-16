import React from 'react';
import _ from 'lodash';
import {screens} from 'unicorn-demo-app';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from './MainScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen}/>
        {_.map(screens, (screen, key) => {
          return <Stack.Screen key={key} name={key.replace('Screen', '')} component={screen}/>;
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
