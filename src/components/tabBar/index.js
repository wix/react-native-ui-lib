import React from 'react';
import {StyleSheet, ViewPropTypes, Animated} from 'react-native';
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
      selectedIndicatorPosition: new Animated.Value(this.calcPosition(props.selectedIndex, props.children.length)),
    };
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  calcPosition(index, tabsCount) {
    return index * (100 / tabsCount);
  }

  onSelectingTab(index) {
    const {selectedIndicatorPosition} = this.state;
    Animated.spring(selectedIndicatorPosition, {
      toValue: this.calcPosition(index, this.props.children.length),
      tension: 30,
      friction: 8,
    }).start();

    this.setState({
      selectedIndex: index,
    });
  }

  renderChildren() {
    const {selectedIndex} = this.state;
    const children = React.Children.map(this.props.children, (child, index) => {
      return React.cloneElement(child, {
        selected: selectedIndex === index,
        onPress: () => {
          this.onSelectingTab(index);
          _.invoke(child.props, 'onPress');
        },
      });
    });

    return children;
  }

  renderSelectedIndicator() {
    const {selectedIndicatorPosition} = this.state;
    const left = selectedIndicatorPosition.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%'],
    });
    return (
      <Animated.View style={[this.styles.selectedIndicator, {left}]}/>
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
