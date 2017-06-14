import React from 'react';
import {StyleSheet, ViewPropTypes} from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {Colors} from '../../style';
import {BaseComponent} from '../../commons';
import View from '../view';
import TabBarItem from './TabBarItem';

export default class TabBar extends BaseComponent {

  static displayName = 'TabBar';

  static propTypes = {
    ...ViewPropTypes.height,
    selectedIndex: PropTypes.number,
  }

  static defaultProps = {
    height: 51,
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: props.selectedIndex,
    };
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  renderChildren() {
    const {selectedIndex} = this.state;
    const children = React.Children.map(this.props.children, (child, index) => {
      return React.cloneElement(child, {
        selected: selectedIndex === index,
        onPress: () => {
          this.setState({
            selectedIndex: index,
          });
          _.invoke(child.props, 'onPress');
        },
      });
    });

    return children;
  }

  renderSelectedIndicator() {
    const {selectedIndex} = this.state;
    const tabsCount = _.size(this.props.children);
    const left = `${selectedIndex * (100 / tabsCount)}%`;
    return (
      <View style={[this.styles.selectedIndicator, {left}]}/>
    );
  }

  render() {
    const {height} = this.props;
    return (
      <View style={this.styles.container} bg-white row height={height}>
        {this.renderChildren()}
        {this.renderSelectedIndicator()}
      </View>
    );
  }
}

function createStyles() {
  return StyleSheet.create({
    container: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: Colors.dark70,
    },
    selectedIndicator: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      borderBottomWidth: 1.5,
      borderColor: Colors.blue30,
      width: '25%',
    },
  });
}

TabBar.Item = TabBarItem;
