import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {View, Dimensions} from 'react-native';
import _ from 'lodash';
import safeAreaInsetsManager from './SafeAreaInsetsManager';

const SpacerType = {
  TOP: 'SafeAreaSpacerView.type.top',
  BOTTOM: 'SafeAreaSpacerView.type.bottom',
};

export default class SafeAreaSpacerView extends PureComponent {
  static type = SpacerType;

  static propTypes = {
    spacerType: PropTypes.oneOf(_.values(SpacerType)),
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
  };

  static defaultProps = {
    spacerType: SpacerType.BOTTOM,
  };

  constructor(props) {
    super(props);

    this.onDimensionsChange = this.onDimensionsChange.bind(this);

    this.state = {
      safeAreaInsets: safeAreaInsetsManager.defaultInsets,
      screenWidth: Dimensions.get('window').width,
    };
  }

  componentDidMount() {
    this.updateInsets();
    Dimensions.addEventListener('change', this.onDimensionsChange);
    safeAreaInsetsManager.addSafeAreaChangedDelegate(this);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onDimensionsChange);
    safeAreaInsetsManager.removeSafeAreaChangedDelegate(this);
  }

  onDimensionsChange(dimensions) {
    this.setState({screenWidth: dimensions.window.width});
  }

  onSafeAreaInsetsDidChangeEvent(safeAreaInsets) {
    this.setState({safeAreaInsets});
  }

  getSpacerStyles() {
    const {safeAreaInsets, screenWidth} = this.state;
    const {spacerType, style} = this.props;
    const height = (spacerType === SpacerType.BOTTOM) ? safeAreaInsets.bottom : safeAreaInsets.top;
    const spacerStyle = {
      width: screenWidth,
      height,
      marginLeft: safeAreaInsets.left,
      marginRight: safeAreaInsets.right,
    };
    return [spacerStyle, style];
  }

  async updateInsets() {
    const safeAreaInsets = await safeAreaInsetsManager.getSafeAreaInsets();
    this.setState({safeAreaInsets});
  }

  render() {
    return (
      <View style={this.getSpacerStyles()}/>
    );
  }
}
