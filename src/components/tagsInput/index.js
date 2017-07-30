import React from 'react';
import {StyleSheet, ViewPropTypes, DeviceEventEmitter} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {BaseComponent} from '../../commons';
import {Constants} from '../../helpers';
import {TextInput} from '../inputs';
import View from '../view';
import Text from '../text';
import {Colors, BorderRadiuses, ThemeManager} from '../../style';

// todo: support backspace to remove tags
// todo: support updating tags externally

/**
 * Tags input component (chips)
 * @modifiers: text, color
 */
export default class TagsInput extends BaseComponent {
  static displayName = 'TagsInput';
  static propTypes = {
    /**
     * list of tags. can be string or custom object when implementing getLabel
     */
    tags: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    ),
    /**
     * callback for extracting the label out of the tag item
     */
    getLabel: PropTypes.func,
    /**
     * callback for onChangeTags event
     */
    onChangeTags: PropTypes.func,
    /**
     * custom styling fot the component container
     */
    containerStyle: ViewPropTypes.style,
    /**
     * should hide input underline
     */
    hideUnderline: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.addTag = this.addTag.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.renderTag = this.renderTag.bind(this);
    this.getLabel = this.getLabel.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);

    this.state = {
      value: props.value,
      tags: props.tags,
      prepareToRemoveLastTag: false,
    };
  }

  componentDidMount() {
    DeviceEventEmitter.addListener('onBackspacePress', this.onKeyPress);
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeListener('onBackspacePress', this.onKeyPress);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tags !== this.state.tags) {
      this.setState({
        tags: nextProps.tags,
      });
    }
  }

  addTag() {
    const {value, tags} = this.state;
    if (_.isEmpty(value.trim())) return;

    const newTags = [...tags, value];
    this.setState({
      value: '',
      tags: newTags,
    });
    _.invoke(this.props, 'onChangeTags', newTags);
    this.input.clear();
  }

  removeLastTag() {
    const {tags} = this.state;
    tags.splice(-1);
    this.setState({
      tags,
    });
    _.invoke(this.props, 'onChangeTags', tags);
    // this.input.clear();
  }

  onChangeText(value) {
    this.setState({value, prepareToRemoveLastTag: false});
    _.invoke(this.props, 'onChangeText', value);
  }

  onKeyPress(event) {
    const {prepareToRemoveLastTag, value} = this.state;
    const keyCode = _.get(event, 'nativeEvent.key');
    // android listen only to backspace anyway
    if (_.isEmpty(value) && (keyCode === 'Backspace' || Constants.isAndroid)) {
      if (prepareToRemoveLastTag) {
        this.removeLastTag();
      }
      this.setState({
        prepareToRemoveLastTag: !prepareToRemoveLastTag,
      });
    }
    _.invoke(this.props, 'onKeyPress', event);
  }

  getLabel(item) {
    const {getLabel} = this.props;
    if (getLabel) {
      return getLabel(item);
    }

    if (_.isString(item)) {
      return item;
    }
    return _.get(item, 'label');
  }

  renderTag(tag, index) {
    const {prepareToRemoveLastTag, tags} = this.state;
    const tagsCount = _.size(tags);
    const isLastTag = index === tagsCount - 1;
    const shouldFocusLastTag = isLastTag && prepareToRemoveLastTag;
    const typography = this.extractTypographyValue();
    return (
      <View key={index} style={[styles.tag, shouldFocusLastTag && styles.tagFocused]}>
        <Text style={[styles.tagLabel, typography]}>
          {this.getLabel(tag)}
        </Text>
      </View>
    );
  }

  renderTextInput() {
    const {containerStyle, ...others} = this.props;
    const {value, prepareToRemoveLastTag} = this.state;
    return (
      <View style={styles.inputWrapper}>
        <TextInput
          ref={r => (this.input = r)}
          {...others}
          value={value}
          onSubmitEditing={this.addTag}
          onChangeText={this.onChangeText}
          onKeyPress={this.onKeyPress}
          blurOnSubmit={false}
          enableErrors={false}
          hideUnderline
          selectionColor={prepareToRemoveLastTag ? 'transparent' : undefined}
        />
      </View>
    );
  }

  render() {
    const {containerStyle, hideUnderline} = this.props;
    const {tags} = this.state;
    return (
      <View style={[!hideUnderline && styles.withUnderline, containerStyle]}>
        <View style={styles.tagsList}>
          {_.map(tags, this.renderTag)}
          {this.renderTextInput()}
        </View>
      </View>
    );
  }
}

const GUTTER_SPACING = 8;
const styles = StyleSheet.create({
  withUnderline: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: ThemeManager.dividerColor,
  },
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  inputWrapper: {
    flexGrow: 1,
    minWidth: 120,
    marginBottom: GUTTER_SPACING,
  },
  tag: {
    backgroundColor: Colors.blue30,
    borderRadius: BorderRadiuses.br100,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: GUTTER_SPACING,
    marginBottom: GUTTER_SPACING,
  },
  tagFocused: {
    backgroundColor: Colors.blue50,
  },
  tagLabel: {
    color: Colors.white,
  },
});
