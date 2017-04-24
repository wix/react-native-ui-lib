import {Component, PropTypes} from 'react';
import {StyleSheet} from 'react-native';
import _ from 'lodash';
import {Typography, Colors, BorderRadiuses} from '../style';

export default class BaseComponent extends Component {

  static propTypes = {
    ..._.mapValues(Typography, () => PropTypes.bool),
    ..._.mapValues(Colors, () => PropTypes.bool),
    useNativeDriver: PropTypes.bool, // eslint-disable-line
  }

  static defaultProps = {
    useNativeDriver: true,
  }

  constructor(props) {
    super(props);
    if (!this.styles) {
      this.generateStyles();
    }

    this.state = {
      ...this.extractStyleProps(),
    };
  }

  styles;

  generateStyles() {
    this.styles = StyleSheet.create({});
  }

  extractAnimationProps() {
    return _.pick(this.props, [
      'animation',
      'duration',
      'delay',
      'direction',
      'easing',
      'iterationCount',
      'transition',
      'onAnimationBegin',
      'onAnimationEnd',
      'useNativeDriver',
    ]);
  }

  extractContainerStyle(props) {
    let containerStyle = {};
    if (props.containerStyle) {
      containerStyle = _.pickBy(props.containerStyle, (value, key) => {
        return key.includes('margin') || _.includes(['alignSelf', 'transform'], key);
      });
    }

    return containerStyle;
  }

  extractTypographyValue() {
    let typography;
    _.forEach(Typography, (value, key) => {
      if (this.props[key] === true) {
        typography = value;
      }
    });
    return typography;
  }

  extractColorValue() {
    let color;
    _.forEach(Colors, (value, key) => {
      if (this.props[key] === true) {
        color = value;
      }
    });
    return color;
  }

  extractBackgroundColorValue() {
    let backgroundColor;
    _.forEach(Colors, (value, key) => {
      if (this.props[`background-${key}`] === true || this.props[`bg-${key}`] === true) {
        backgroundColor = value;
      }
    });
    return backgroundColor;
  }

  extractBorderRadiusValue() {
    let borderRadius;
    _.forEach(BorderRadiuses, (value, key) => {
      if (this.props[key] === true) {
        borderRadius = value;
      }
    });
    return borderRadius;
  }

  extractPaddingValues() {
    const PADDING_VARIATIONS = {
      padding: 'padding',
      paddingL: 'paddingLeft',
      paddingT: 'paddingTop',
      paddingR: 'paddingRight',
      paddingB: 'paddingBottom',
      paddingH: 'paddingHorizontal',
      paddingV: 'paddingVertical',
    };
    const KEY_PATTERN = /padding[LTRBHV]?-[0-9]*/;
    const paddings = {};
    const paddingPropsKeys = _.chain(this.props).keys(this.props).filter(key => KEY_PATTERN.test(key)).value();

    _.forEach(paddingPropsKeys, (key) => {
      if (this.props[key] === true) {
        const [paddingKey, paddingValue] = key.split('-');
        const paddingVariation = PADDING_VARIATIONS[paddingKey];
        if (!isNaN(paddingValue)) {
          paddings[paddingVariation] = Number(paddingValue);
        }
      }
    });

    return paddings;
  }

  extractMarginValues() {
    const MARGIN_VARIATIONS = {
      margin: 'margin',
      marginL: 'marginLeft',
      marginT: 'marginTop',
      marginR: 'marginRight',
      marginB: 'marginBottom',
      marginH: 'marginHorizontal',
      marginV: 'marginVertical',
    };
    const KEY_PATTERN = /margin[LTRBHV]?-[0-9]*/;
    const margins = {};
    const marginPropsKeys = _.chain(this.props).keys(this.props).filter(key => KEY_PATTERN.test(key)).value();

    _.forEach(marginPropsKeys, (key) => {
      if (this.props[key] === true) {
        const [marginKey, marginValue] = key.split('-');
        const paddingVariation = MARGIN_VARIATIONS[marginKey];
        if (!isNaN(marginValue)) {
          margins[paddingVariation] = Number(marginValue);
        }
      }
    });

    return margins;
  }

  extractAlignmentsValues() {
    const {row, center} = this.props;
    const alignments = {};

    const alignmentRules = {};
    if (row) {
      alignments.flexDirection = 'row';
      alignmentRules.justifyContent = ['left', 'right', 'centerH', 'spread'];
      alignmentRules.alignItems = ['top', 'bottom', 'centerV'];
    } else {
      alignmentRules.justifyContent = ['top', 'bottom', 'centerV', 'spread'];
      alignmentRules.alignItems = ['left', 'right', 'centerH'];
    }

    _.forEach(alignmentRules, (positions, attribute) => {
      _.forEach(positions, (position) => {
        if (this.props[position]) {
          if (_.includes(['top', 'left'], position)) {
            alignments[attribute] = 'flex-start';
          } else if (_.includes(['bottom', 'right'], position)) {
            alignments[attribute] = 'flex-end';
          } else if (_.includes(['centerH', 'centerV'], position)) {
            alignments[attribute] = 'center';
          } else if (position === 'spread') {
            alignments[attribute] = 'space-between';
          }
        }
      });
    });

    if (center) {
      alignments.justifyContent = 'center';
      alignments.alignItems = 'center';
    }

    return alignments;
  }

  extractFlexValue() {
    const KEY_PATTERN = /flex-?[0-9]*/;
    const flexPropKey = _.chain(this.props)
                           .keys(this.props)
                           .filter(key => KEY_PATTERN.test(key))
                           .last()
                           .value();
    if (flexPropKey) {
      const value = flexPropKey.split('-').pop();
      if (value === 'flex' || value === '') {
        return 1;
      } else if (!isNaN(value)) {
        return Number(value);
      }
    }
  }

  extractStyleProps() {
    const backgroundColor = this.extractBackgroundColorValue();
    const borderRadius = this.extractBorderRadiusValue();
    const paddings = this.extractPaddingValues();
    const margins = this.extractMarginValues();
    const alignments = this.extractAlignmentsValues();
    const flex = this.extractFlexValue();

    return {
      backgroundColor,
      borderRadius,
      paddings,
      margins,
      alignments,
      flex,
    };
  }

  extractTextProps(props) {
    return _.pick(props, [..._.keys(Typography), ..._.keys(Colors), 'color']);
  }
}
