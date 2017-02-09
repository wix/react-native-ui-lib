import React, {PropTypes} from 'react';
import _ from 'lodash';
import autobind from 'react-autobind';
import {View, StyleSheet, Text, TouchableOpacity, NetInfo} from 'react-native';
import * as Constants from '../../helpers/Constants';
import {BaseComponent} from '../../commons';
import {Colors, Typography} from '../../style';

/**
 * Top bar to show a "no internet" connection status
 */
export default class ConnectionStatusBar extends BaseComponent {
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
  };

  static defaultProps = {
    label: 'No internet. Check your connection.',
    allowDismiss: false,
  };

  constructor(props) {
    super(props);
    autobind(this);
    this.state = {
      isConnected: true,
      isCancelled: false,
    };
    this.getInitialConnectionState();
  }

  generateStyles() {
    this.styles = createStyles();
  }

  componentDidMount() {
    this.netInfoListener = NetInfo.addEventListener('change', this.onConnectionChange);
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
        isCancelled: false,
      });
      if (this.props.onConnectionChange) {
        this.props.onConnectionChange(isConnected, false);
      }
    }
  }

  async getInitialConnectionState() {
    const state = await NetInfo.fetch();
    const isConnected = this.isStateConnected(state);
    this.setState({isConnected});
    if (this.props.onConnectionChange) {
      this.props.onConnectionChange(isConnected, true);
    }
  }

  isStateConnected(state) {
    const lowerCaseState = _.lowerCase(state);
    const isConnected = (lowerCaseState !== 'none');
    return isConnected;
  }

  render() {
    if (this.state.isConnected || this.state.isCancelled) {
      return false;
    }

    return (
      <View style={this.styles.container}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={this.styles.text}>
            {this.props.label}
          </Text>
          {
            this.props.allowDismiss &&
              <TouchableOpacity style={this.styles.xContainer} onPress={() => this.setState({isCancelled: true})}>
                <Text style={this.styles.x}>✕</Text>
              </TouchableOpacity>
          }
        </View>
      </View>
    );
  }
}

function createStyles() {
  const typography = Constants.isSmallScreen ? Typography.text90 : Typography.text80;
  return StyleSheet.create({
    container: {
      backgroundColor: Colors.dark30,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    text: {
      flex: 1,
      ...typography,
      textAlign: 'center',
      color: Colors.dark60,
      marginTop: 8,
      marginBottom: 8,
      alignSelf: 'center',
    },
    xContainer: {
      paddingLeft: 10,
      paddingRight: 10,
      alignSelf: 'center',
    },
    x: {
      fontSize: 15,
      color: 'black',
    },
  });
}
