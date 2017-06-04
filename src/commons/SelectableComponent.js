import React, {PropTypes} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import _ from 'lodash';
import BaseComponent from './BaseComponent';
import {Colors, BorderRadiuses} from '../style';
import * as Assets from '../assets';

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
  }

  static defaultProps = {
    selectableIndicatorSize: 36,
  }

  constructor(props) {
    super(props);

    this.state = {
      selected: props.selected,
    };

    this.onSelect = this.onSelect.bind(this);
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  renderSelectableIndicator() {
    const {selectable} = this.props;
    const {selected} = this.state;
    if (selectable) {
      return (
        <View style={[this.styles.container, selected && this.styles.selected]}>
          {selected && <Image style={this.styles.checkIcon} source={Assets.icons.check}/>}
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
      borderRadius: BorderRadiuses.br100,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: Colors.blue30,
      justifyContent: 'center',
    },
    selected: {
      backgroundColor: Colors.blue30,
    },
    checkIcon: {
      alignSelf: 'center',
      tintColor: Colors.white,
      width: selectableIndicatorSize / 2,
      resizeMode: 'contain',
    },
  });
}
