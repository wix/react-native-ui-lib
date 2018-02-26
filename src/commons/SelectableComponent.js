import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Image} from 'react-native';
import _ from 'lodash';
import BaseComponent from './BaseComponent';
import {Colors, BorderRadiuses} from '../style';
import Assets from '../assets';

// todo: add nice animation
export default class SelectableComponent extends BaseComponent {
  static propTypes = {
    /**
     * should this component treat as selectable
     */
    selectable: PropTypes.bool,
    /**
     * selected state of the component
     */
    selected: PropTypes.bool,
    /**
     * selectable indicator size
     */
    selectableIndicatorSize: PropTypes.number,
    /**
     * selectable indicator look (circle, clean)
     */
    selectableIndicatorType: PropTypes.oneOf(['circle', 'clean']),
    /**
     * color of selectable indicator
     */
    selectableIndicatorColor: PropTypes.color,
  };

  static defaultProps = {
    selectableIndicatorSize: 36,
    selectableIndicatorType: 'circle',
    selectableIndicatorColor: Colors.blue30,
  };

  constructor(props) {
    super(props);

    this.state = {
      selected: props.selected,
    };

    this.onSelect = this.onSelect.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.selected !== this.state.selected) {
      this.setState({
        selected: newProps.selected,
      });
    }
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  getIndicatorContainerStyle() {
    const {selectableIndicatorType, selectableIndicatorColor} = this.props;
    const {selected} = this.state;
    const style = [this.styles.container];
    if (selectableIndicatorType === 'circle') {
      style.push(this.styles.circleContainer);
      style.push(selected && {backgroundColor: selectableIndicatorColor});
    }

    return style;
  }

  getIndicatorIconStyle() {
    const {selectableIndicatorType, selectableIndicatorColor} = this.props;
    const style = [this.styles.checkIcon];
    if (selectableIndicatorType === 'circle') {
      style.push(this.styles.checkIconInCircle);
    } else {
      style.push({tintColor: selectableIndicatorColor});
    }

    return style;
  }

  renderSelectableIndicator() {
    const {selectable} = this.props;
    const {selected} = this.state;
    if (selectable) {
      return (
        <View style={this.getIndicatorContainerStyle()}>
          {selected && <Image style={this.getIndicatorIconStyle()} source={Assets.icons.check} />}
        </View>
      );
    }
  }

  onSelect() {
    this.setState({
      selected: !this.state.selected,
    });
    _.invoke(this.props, 'onPress');
  }
}

function createStyles({selectableIndicatorSize}) {
  return StyleSheet.create({
    container: {
      width: selectableIndicatorSize,
      height: selectableIndicatorSize,
      justifyContent: 'center',
      borderRadius: BorderRadiuses.br100,
    },
    circleContainer: {
      borderWidth: 1,
      borderColor: Colors.blue30,
    },
    checkIcon: {
      alignSelf: 'center',
      width: selectableIndicatorSize / 2,
      resizeMode: 'contain',
    },
    checkIconInCircle: {
      tintColor: Colors.white,
    },
  });
}
