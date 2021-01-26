import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Animated, Easing, LayoutAnimation} from 'react-native';
import {Constants} from '../../helpers';
import {Colors} from '../../style';
import {PureBaseComponent} from '../../commons';
import View from '../view';
import TouchableOpacity from '../touchableOpacity';
import Button from '../button';
import Card from '../card';

const PEEP = 8;
const DURATION = 300;
const MARGIN_BOTTOM = 24;
const buttonStartValue = 0.8;
const icon = require('./assets/arrow-down.png');

/**
 * @description: Stack aggregator component
 * @modifiers: margin, padding
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/StackAggregatorScreen.js
 */
export default class StackAggregator extends PureBaseComponent {
  static displayName = 'StackAggregator';

  static propTypes = {
    /**
     * The initial state of the stack
     */
    collapsed: PropTypes.bool,
    /**
     * The container style
     */
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    /**
     * The content container style
     */
    contentContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    /**
     * The items border radius
     */
    itemBorderRadius: PropTypes.number,
    /**
     * Props passed to the 'show less' button
     */
    buttonProps: PropTypes.object,
    /**
     * A callback for item press
     */
    onItemPress: PropTypes.func
  };

  static defaultProps = {
    collapsed: true,
    itemBorderRadius: 0
  };

  constructor(props) {
    super(props);

    this.state = {
      collapsed: props.collapsed,
      firstItemHeight: undefined
    };

    this.itemsCount = React.Children.count(props.children);
    this.easeOut = Easing.bezier(0, 0, 0.58, 1);
    this.animatedScale = new Animated.Value(this.state.collapsed ? buttonStartValue : 1);
    this.animatedOpacity = new Animated.Value(this.state.collapsed ? buttonStartValue : 1);
    this.animatedScaleArray = this.getAnimatedScales();
    this.animatedContentOpacity = new Animated.Value(this.state.collapsed ? 0 : 1);
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.collapsed !== this.state.collapsed) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  }

  generateStyles() {
    this.styles = createStyles(this.getThemeProps());
  }

  getAnimatedScales() {
    return React.Children.map(this.props.children, (_item, index) => {
      return new Animated.Value(this.getItemScale(index));
    });
  }

  getItemScale(index) {
    if (this.state.collapsed) {
      if (index === this.itemsCount - 2) {
        return 0.95;
      }
      if (index === this.itemsCount - 1) {
        return 0.9;
      }
    }
    return 1;
  }

  animate = () => {
    this.animateValues();
    this.animateCards();
  };

  animateValues() {
    const {collapsed} = this.state;
    const newValue = collapsed ? buttonStartValue : 1;

    Animated.parallel([
      Animated.timing(this.animatedOpacity, {
        duration: DURATION,
        toValue: Number(newValue),
        useNativeDriver: true
      }),
      Animated.timing(this.animatedScale, {
        toValue: Number(newValue),
        easing: this.easeOut,
        duration: DURATION,
        useNativeDriver: true
      }),
      Animated.timing(this.animatedContentOpacity, {
        toValue: Number(collapsed ? 0 : 1),
        easing: this.easeOut,
        duration: DURATION,
        useNativeDriver: true
      })
    ]).start();
  }

  animateCards() {
    for (let index = 0; index < this.itemsCount; index++) {
      const newScale = this.getItemScale(index);

      Animated.timing(this.animatedScaleArray[index], {
        toValue: Number(newScale),
        easing: this.easeOut,
        duration: DURATION,
        useNativeDriver: true
      }).start();
    }
  }

  close = () => {
    this.setState({collapsed: true}, () => this.animate());
  };

  open = () => {
    this.setState({collapsed: false}, () => this.animate());
  };

  getTop(index) {
    let start = 0;

    if (index === this.itemsCount - 2) {
      start += PEEP;
    }
    if (index === this.itemsCount - 1) {
      start += PEEP * 2;
    }

    return start;
  }

  getStyle(index) {
    const {collapsed} = this.state;
    const top = this.getTop(index);

    if (collapsed) {
      return {
        position: index !== 0 ? 'absolute' : undefined,
        top
      };
    }
    return {
      marginBottom: MARGIN_BOTTOM,
      marginTop: index === 0 ? 40 : undefined
    };
  }

  onLayout = event => {
    const height = event.nativeEvent.layout.height;

    if (height) {
      this.setState({firstItemHeight: height});
    }
  };

  onItemPress = index => {
    _.invoke(this.props, 'onItemPress', index);
  };

  renderItem = (item, index) => {
    const {contentContainerStyle, itemBorderRadius} = this.props;
    const {firstItemHeight, collapsed} = this.state;

    return (
      <Animated.View
        key={index}
        onLayout={index === 0 ? this.onLayout : undefined}
        style={[
          Constants.isIOS && this.styles.containerShadow,
          this.getStyle(index),
          {
            borderRadius: Constants.isIOS ? itemBorderRadius : undefined,
            alignSelf: 'center',
            zIndex: this.itemsCount - index,
            transform: [{scaleX: this.animatedScaleArray[index]}],
            width: Constants.screenWidth - 40,
            height: collapsed ? firstItemHeight : undefined
          }
        ]}
        collapsable={false}
      >
        <Card
          style={[contentContainerStyle, this.styles.card]}
          onPress={() => this.onItemPress(index)}
          borderRadius={itemBorderRadius}
          elevation={5}
        >
          <Animated.View style={index !== 0 ? {opacity: this.animatedContentOpacity} : undefined} collapsable={false}>
            {item}
          </Animated.View>
        </Card>
      </Animated.View>
    );
  };

  render() {
    const {children, containerStyle, buttonProps} = this.props;
    const {collapsed, firstItemHeight} = this.state;

    return (
      <View style={containerStyle}>
        <View style={{marginBottom: PEEP * 3}}>
          <Animated.View
            style={{
              position: 'absolute',
              right: 0,
              opacity: this.animatedOpacity,
              transform: [{scale: this.animatedScale}]
            }}
          >
            <Button
              label={'Show less'}
              iconSource={icon}
              link
              size={'small'}
              {...buttonProps}
              marginH-24
              marginB-20
              onPress={this.close}
            />
          </Animated.View>

          {React.Children.map(children, (item, index) => {
            return this.renderItem(item, index);
          })}

          {collapsed && (
            <TouchableOpacity
              onPress={this.open}
              activeOpacity={1}
              style={[
                this.styles.touchable,
                {
                  height: firstItemHeight ? firstItemHeight + PEEP * 2 : undefined,
                  zIndex: this.itemsCount
                }
              ]}
            />
          )}
        </View>
      </View>
    );
  }
}

function createStyles() {
  return StyleSheet.create({
    touchable: {
      position: 'absolute',
      width: '100%'
    },
    containerShadow: {
      backgroundColor: Colors.white,
      shadowColor: Colors.dark40,
      shadowOpacity: 0.25,
      shadowRadius: 12,
      shadowOffset: {height: 5, width: 0}
    },
    card: {
      overflow: 'hidden',
      flexShrink: 1
    }
  });
}
