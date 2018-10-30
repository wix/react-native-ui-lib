import {Navigation} from 'react-native-navigation';
import BasicListScreen from './BasicListScreen';
import ContactsListScreen from './ContactsListScreen';
import ConversationListScreen from './ConversationListScreen';


Navigation.registerComponent('unicorn.lists.BasicListScreen', () => BasicListScreen);
Navigation.registerComponent('unicorn.lists.ContactsListScreen', () => ContactsListScreen);
Navigation.registerComponent('unicorn.lists.ConversationListScreen', () => ConversationListScreen);
