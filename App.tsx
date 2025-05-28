import 'react-native-gesture-handler';
import React from 'react';
import {View, Text, Pressable, ScrollView} from 'react-native';
const {screens, loadDemoConfigurations} = require('./demo/src');

loadDemoConfigurations();

// import {View, Text, Touchable} from 'react-native-ui-lib';

// export default function App() {
//   return (
//     <View flex>
//       <MainScreen/>
//     </View>
//   );
// }

export default function App() {
  const [SelectedScreen, setSelectedScreen] = React.useState<React.ComponentType | null>(null);

  // const SafeAreaSpacerViewScreen = screens['SafeAreaSpacerViewScreen'];

  // return <SafeAreaSpacerViewScreen />;

  return (
    <View style={{marginTop: 100}}>
      <Text>Screens</Text>
      <ScrollView style={{height: '20%'}}>
        {Object.keys(screens)
          .sort()
          .map(key => {
            const ScreenComponent = screens[key];
            return (
              <Pressable
                key={key}
                onPress={() => {
                  setSelectedScreen(() => ScreenComponent);
                }}
              >
                <Text>{key.replace('Screen', '')}</Text>
              </Pressable>
            );
          })}
      </ScrollView>
      <View style={{height: '70%'}}>{SelectedScreen && <SelectedScreen/>}</View>
    </View>
  );
}
