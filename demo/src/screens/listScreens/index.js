import {Navigation} from 'react-native-navigation';

Navigation.registerComponent('unicorn.lists.BasicListScreen', () => require('./BasicListScreen').default);
Navigation.registerComponent('unicorn.lists.ContactsListScreen', () => require('./ContactsListScreen').default);
Navigation.registerComponent('unicorn.lists.ConversationListScreen', () => require('./ConversationListScreen').default);
