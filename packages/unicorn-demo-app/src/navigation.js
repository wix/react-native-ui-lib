import {Navigation} from 'react-native-navigation';

export const pushScreen = ({componentId, name, title, passProps}) => {
  Navigation.push(componentId, {
    component: {
      name,
      passProps,
      options: {
        topBar: {
          title: {
            text: title
          }
        }
      }
    }
  });
};

export const showModal = ({name, title, passProps}) => {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name,
            passProps,
            options: {
              topBar: {
                title: {
                  text: title
                }
              }
            }
          }
        }
      ]
    }
  });
};
