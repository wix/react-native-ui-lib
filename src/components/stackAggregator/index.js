import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Animated, Easing} from 'react-native';
import {PureBaseComponent} from '../../commons';
import {Colors} from '../../style';
import View from '../view';
import TouchableOpacity from '../touchableOpacity';
import Button from '../button';


const VALUE_TYPES = {
  TRANSLATE: 0,
  SCALE: 1,
  HEIGHT: 2
};
const PEEP = 8;
const DURATION = 300;
const buttonStartValue = 0.9;

/**
 * @description: Stack aggregator component
 * @modifiers: margin, padding
 * @example: 
 */
export default class StackAggregator extends PureBaseComponent {
  static displayName = 'StackAggregator';

  static propTypes = {
    /**
     * The items to render
     */
    items: PropTypes.arrayOf(PropTypes.object),
    /**
     * The render item function
     */
    renderItem: PropTypes.func,
    /**
     * The container style
     */
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    /**
     * The initial state of the stack
     */
    collapsed: PropTypes.bool
  }

  static defaultProps = {
    collapsed: true
  }

  constructor(props) {
    super(props);

    this.state = {
      items: this.getItems(),
      collapsed: props.collapsed
    };

    this.easeOut = Easing.bezier(0, 0, 0.58, 1);
    this.animatedScale = new Animated.Value(this.state.collapsed ? buttonStartValue : 1),
    this.animatedOpacity = new Animated.Value(this.state.collapsed ? buttonStartValue : 1)
    this.animatedTranslateArray = this.getAnimatedValues(VALUE_TYPES.TRANSLATE);
    this.animatedScaleArray = this.getAnimatedValues(VALUE_TYPES.SCALE);
    this.animatedHeightArray = this.getAnimatedValues(VALUE_TYPES.HEIGHT);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.collapsed !== this.props.collapsed) {
      console.warn('INBAL collapsed updated: ', );
    }
    if (prevProps.items !== this.props.items) {
      console.warn('INBAL items update: ', );
    }
  }

  generateStyles() {
    this.styles = createStyles(this.getThemeProps());
  }

  getAnimatedValues(type) {
    return _.map(this.state.items, (item, index) => {
      switch (type) {
        case VALUE_TYPES.HEIGHT:
          return new Animated.Value(this.getHeightValue(item));
        case VALUE_TYPES.SCALE:
          return new Animated.Value(this.getItemScale(index));
        case VALUE_TYPES.TRANSLATE:
        default:
          return new Animated.Value(this.getTranslateValue(item, index)); 
      }
    });
  }

  getHeightValue(item) {
    return this.state.collapsed ? item.heightRatio : 1; // Height !!!!
  }

  getTranslateValue(item, index) {
    const {items, collapsed} = this.state;
    let start = items[0].height < item.height ? (items[0].height - item.height) / 2 : 0; // Height !!!!
    if (index === items.length - 1) {
      start += (PEEP * 2);
    }
    if (index === items.length - 2) {
      start += PEEP;
    }
    return collapsed ? start : item.top;
  }

  getItemScale(index) {
    return this.state.collapsed ? 1 - (0.05 * index) : 1;
  }

  getItems() {
    const {items} = this.props;

    return _.map(items, (item, index) => {
      const top = this.getTopByIndex(index);
      item.top = top;
      item.heightRatio = items[0].height / item.height; // Height !!!!
      return item;
    });
  }

  getTopByIndex(index) {
    const {items} = this.props;
    const cardsTopPosition = 40;
    const cardBottomMargin = 24;

    const array = items.slice(0, index);
    let total = cardsTopPosition;

    array.forEach(element => {
      total += element.height + cardBottomMargin; // Height !!!!
    });
    return total;
  }

  animate = () => {
    this.animateButton();
    this.animateCards();
  }

  animateButton() {
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
      })
    ]).start();
  }

  animateCards() {
    const {items} = this.state;
    
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      const newPosition = this.getTranslateValue(item, index);
      const newScale = this.getItemScale(index);
      const newHeight = this.getHeightValue(item);
      
      Animated.parallel([
        Animated.timing(this.animatedTranslateArray[index], {
          toValue: Number(newPosition),
          easing: this.easeOut,
          duration: DURATION,
          useNativeDriver: true
        }),
        Animated.timing(this.animatedScaleArray[index], {
          toValue: Number(newScale),
          easing: this.easeOut,
          duration: DURATION,
          useNativeDriver: true
        }),
        Animated.timing(this.animatedHeightArray[index], {
          toValue: Number(newHeight),
          easing: this.easeOut,
          duration: DURATION,
          useNativeDriver: true
        })
      ]).start();
    }
  }

  close = () => {
    this.setState({collapsed: true}, () => this.animate());
  }

  open = () => {
    const {items} = this.state;
    this.setState({collapsed: false}, () => this.animate());
  }

  renderItem = (item, index) => {
    const {renderItem} = this.props;
    const {items} = this.state;
  
    return (
      <Animated.View 
        key={index}
        style={[
          this.styles.containerShadow,
          {
            position: 'absolute', 
            zIndex: items.length - index,
            transform: [
              {translateY: this.animatedTranslateArray[index]},
              {scaleX: index !== 0 ? this.animatedScaleArray[index] : 1},
              {scaleY: index !== 0 ? this.animatedHeightArray[index] : 1}
            ]
          }
        ]}
      >
        {renderItem(item, index)}
      </Animated.View>
    );
  }

  render() {
    const {containerStyle} = this.props;
    const {items, collapsed} = this.state;
    const containerHeight = collapsed ? items[0].height + (PEEP * 3) : items[items.length - 1].top + items[items.length - 1].height; // Height !!!!

    return (
      <View style={containerStyle}>
        <View style={{height: containerHeight}}>
          <Animated.View 
            style={{
              alignItems: 'flex-end',
              opacity: this.animatedOpacity,
              transform: [
                {scale: this.animatedScale}
              ]
            }}
          >
            <Button 
              size={'small'} 
              marginH-24 
              bg-dark60 
              dark10 
              label={'Show less'} 
              onPress={this.close}
            />
          </Animated.View>
          {_.map(items, (item, index) => {
            return this.renderItem(item, index);
          })}
          {collapsed && 
            <TouchableOpacity 
              onPress={this.open} 
              activeOpacity={1} 
              style={[
                this.styles.touchable, 
                {
                  height: containerHeight,
                  zIndex: items.length
                }
              ]}
            />
          }
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
      shadowColor: Colors.dark40,
      shadowOpacity: 0.25,
      shadowRadius: 12,
      shadowOffset: {height: 5, width: 0},
      elevation: 2
    }
  });
}
