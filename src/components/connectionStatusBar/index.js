import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {StyleSheet, Text, NetInfo} from 'react-native';
import {Constants} from '../../helpers';
import {PureBaseComponent} from '../../commons';
import {Colors, Typography} from '../../style';
import TouchableOpacity from '../touchableOpacity';
import View from '../view';

/**
 * @description: Top bar to show a "no internet" connection status. Note: Run on real device for best results
 * @image: https://user-images.githubusercontent.com/33805983/34683190-f3b1904c-f4a9-11e7-9d46-9a340bd35448.png, https://user-images.githubusercontent.com/33805983/34484206-edc6c6e4-efcb-11e7-88b2-cd394c19dd5e.png
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ConnectionStatusBarScreen.js
 */
export default class ConnectionStatusBar extends PureBaseComponent {
  static displayName = 'ConnectionStatusBar';
  static propTypes = {
    /**
     * Text to show as the status
     */
    label: PropTypes.string,
    /**
     * Handler to get connection change events propagation
     */
    onConnectionChange: PropTypes.func,
    /**
     * Text to show as the status
     */
    allowDismiss: PropTypes.bool,

    /**
     * Use absolute position for the component
     */
    useAbsolutePosition: PropTypes.bool
  };

  static defaultProps = {
    label: 'No internet. Check your connection.',
    allowDismiss: false,
    useAbsolutePosition: true
  };

  static onConnectionLost;
  static registerGlobalOnConnectionLost(callback) {
    ConnectionStatusBar.onConnectionLost = callback;
  }

  static unregisterGlobalOnConnectionLost() {
    delete ConnectionStatusBar.onConnectionLost;
  }

  constructor(props) {
    super(props);
    this.onConnectionChange = this.onConnectionChange.bind(this);

    this.state = {
      isConnected: true,
      isCancelled: false
    };
    this.getInitialConnectionState();
  }

  generateStyles() {
    this.styles = createStyles();
  }

  componentDidMount() {
    this.netInfoListener = NetInfo.addEventListener('connectionChange', this.onConnectionChange);
  }

  componentWillUnmount() {
    if (this.netInfoListener) {
      this.netInfoListener.remove();
    }
  }

  onConnectionChange(state) {
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
    const state = await NetInfo.getConnectionInfo();
    const isConnected = this.isStateConnected(state);
    this.setState({isConnected});
    if (this.props.onConnectionChange) {
      this.props.onConnectionChange(isConnected, true);
    }
  }

  isStateConnected(state) {
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
      backgroundColor: Colors.dark30
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
      color: Colors.dark60,
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
      fontSize: Typography.text80.fontSize,
      color: Colors.black
    }
  });
}
