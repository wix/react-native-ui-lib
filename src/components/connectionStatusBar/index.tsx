import React, {PureComponent} from 'react';
import _ from 'lodash';
import {StyleSheet, Text} from 'react-native';
import {NetInfoPackage as NetInfo} from '../../optionalDependencies';
import {Colors, Typography} from '../../style';
import TouchableOpacity from '../touchableOpacity';
import View from '../view';
import {Constants, asBaseComponent} from '../../commons/new';
import {ConnectionStatusBarProps, ConnectionStatusBarState, DEFAULT_PROPS} from './Types';
export {ConnectionStatusBarProps};

/**
 * @description: Top bar to show a "no internet" connection status. Note: Run on real device for best results
 * @image: https://user-images.githubusercontent.com/33805983/34683190-f3b1904c-f4a9-11e7-9d46-9a340bd35448.png, https://user-images.githubusercontent.com/33805983/34484206-edc6c6e4-efcb-11e7-88b2-cd394c19dd5e.png
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ConnectionStatusBarScreen.tsx
 * @notes: The component requires installing the '@react-native-community/netinfo' native library
 */
class ConnectionStatusBar extends PureComponent<ConnectionStatusBarProps, ConnectionStatusBarState> {
  static displayName = 'ConnectionStatusBar';

  static defaultProps = DEFAULT_PROPS;

  styles?: any;
  unsubscribe?: any;
  static onConnectionLost?: () => void;
  
  static registerGlobalOnConnectionLost(callback: () => void) {
    ConnectionStatusBar.onConnectionLost = callback;
  }

  static unregisterGlobalOnConnectionLost() {
    delete ConnectionStatusBar.onConnectionLost;
  }

  constructor(props: ConnectionStatusBarProps) {
    super(props);
    
    this.generateStyles();
    
    this.onConnectionChange = this.onConnectionChange.bind(this);

    this.state = {
      isConnected: true,
      isCancelled: false
    };
    
    if (NetInfo) {
      this.getInitialConnectionState();
    } else {
      console.error(`RNUILib ConnectionStatusBar component requires installing "@react-native-community/netinfo" dependency`);
    }
  }

  generateStyles() {
    this.styles = createStyles();
  }

  componentDidMount() {
    this.unsubscribe = NetInfo?.addEventListener(this.onConnectionChange);
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  onConnectionChange(state: ConnectionStatusBarState) {
    const isConnected = this.isStateConnected(state);
    if (isConnected !== this.state.isConnected) {
      this.setState({
        isConnected,
        isCancelled: false
      });
      if (this.props.onConnectionChange) {
        this.props.onConnectionChange(isConnected, false);
      }

      if (!isConnected) {
        setTimeout(() => {
          this.getInitialConnectionState();
        }, 3000);
      }

      if (!isConnected && _.isFunction(ConnectionStatusBar.onConnectionLost)) {
        ConnectionStatusBar.onConnectionLost();
      }
    }
  }

  async getInitialConnectionState() {
    const isConnected = (await NetInfo?.fetch()).isConnected;

    this.setState({isConnected});
    if (this.props.onConnectionChange) {
      this.props.onConnectionChange(isConnected, true);
    }
  }

  isStateConnected(state: ConnectionStatusBarState) {
    const lowerCaseState = _.lowerCase(state.type);
    const isConnected = lowerCaseState !== 'none';
    return isConnected;
  }

  render() {
    if (this.state.isConnected || this.state.isCancelled) {
      return false;
    }
    const containerStyle = [
      this.styles.topContainer,
      this.props.useAbsolutePosition ? this.styles.absolutePosition : null
    ];
    return (
      <View useSafeArea style={containerStyle}>
        <View style={this.styles.container}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={this.styles.text}>{this.props.label}</Text>
            {this.props.allowDismiss && (
              <TouchableOpacity style={this.styles.xContainer} onPress={() => this.setState({isCancelled: true})}>
                <Text style={this.styles.x}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  }
}

function createStyles() {
  const typography = Constants.isSmallScreen ? Typography.text90 : Typography.text80;
  return StyleSheet.create({
    topContainer: {
      backgroundColor: Colors.grey30
    },
    absolutePosition: {
      ...StyleSheet.absoluteFillObject,
      bottom: undefined
    },
    container: {
      flexDirection: 'column',
      justifyContent: 'center'
    },
    text: {
      flex: 1,
      ...typography,
      textAlign: 'center',
      color: Colors.grey60,
      marginTop: 8,
      marginBottom: 8,
      alignSelf: 'center'
    },
    xContainer: {
      paddingLeft: 10,
      paddingRight: 10,
      alignSelf: 'center'
    },
    x: {
      fontSize: Typography.text80?.fontSize,
      color: Colors.black
    }
  });
}

export {ConnectionStatusBar}; // For tests

export default asBaseComponent<ConnectionStatusBarProps, typeof ConnectionStatusBar>(ConnectionStatusBar);
