import React from 'react';
import {
  StyleSheet,
  ViewPropTypes,
  Image,
  DeviceEventEmitter,
} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {BaseComponent} from '../../commons';
import {Constants} from '../../helpers';
import {TextInput} from '../inputs';
import View from '../view';
import TouchableOpacity from '../touchableOpacity';
import Text from '../text';
import {Colors, BorderRadiuses, ThemeManager, Typography} from '../../style';
import * as Assets from '../../assets';

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
     * callback for custom rendering tag item
     */
    renderTag: PropTypes.func,
    /**
     * callback for onChangeTags event
     */
    onChangeTags: PropTypes.func,
    /**
     * callback for creating new tag out of input value (good for composing tag object)
     */
    onCreateTag: PropTypes.func,
    /**
     * custom styling for the component container
     */
    containerStyle: ViewPropTypes.style,
    /**
     * custom styling for the tag item
     */
    tagStyle: ViewPropTypes.style,
    /**
     * custom styling for the text input
     */
    inputStyle: TextInput.propTypes.style,
    /**
     * should hide input underline
     */
    hideUnderline: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.addTag = this.addTag.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.renderTagWrapper = this.renderTagWrapper.bind(this);
    this.getLabel = this.getLabel.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);

    this.state = {
      value: props.value,
      tags: props.tags,
      tagIndexToRemove: undefined,
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
    const {onCreateTag} = this.props;
    const {value, tags} = this.state;
    if (_.isEmpty(value.trim())) return;

    const newTag = _.isFunction(onCreateTag) ? onCreateTag(value) : value;
    const newTags = [...tags, newTag];
    this.setState({
      value: '',
      tags: newTags,
    });
    _.invoke(this.props, 'onChangeTags', newTags);
    this.input.clear();
  }

  removeMarkedTag() {
    const {tags, tagIndexToRemove} = this.state;
    if (!_.isUndefined(tagIndexToRemove)) {
      tags.splice(tagIndexToRemove, 1);
      this.setState({
        tags,
        tagIndexToRemove: undefined,
      });
      _.invoke(this.props, 'onChangeTags', tags);
    }
  }

  onChangeText(value) {
    this.setState({value, tagIndexToRemove: undefined});
    _.invoke(this.props, 'onChangeText', value);
  }

  onTagPress(index) {
    const {tagIndexToRemove} = this.state;
    if (tagIndexToRemove === index) {
      this.removeMarkedTag();
    } else {
      this.setState({tagIndexToRemove: index});
    }
  }

  isLastTagMarked() {
    const {tags, tagIndexToRemove} = this.state;
    const tagsCount = _.size(tags);
    const isLastTagMarked = tagIndexToRemove === tagsCount - 1;
    return isLastTagMarked;
  }

  onKeyPress(event) {
    const {value, tags} = this.state;
    const tagsCount = _.size(tags);
    const keyCode = _.get(event, 'nativeEvent.key');
    const hasNoValue = _.isEmpty(value);
    const pressedBackspace = Constants.isAndroid || keyCode === 'Backspace';
    const hasTags = tagsCount > 0;
    const isLastTagAlreadyMarked = this.isLastTagMarked();

    if (pressedBackspace) {
      if (hasNoValue && hasTags && !isLastTagAlreadyMarked) {
        this.setState({
          tagIndexToRemove: tagsCount - 1,
        });
      } else if (isLastTagAlreadyMarked) {
        this.removeMarkedTag();
      }
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

  renderLabel(tag, shouldMarkTag) {
    const typography = this.extractTypographyValue();
    return (
      <View row centerV>
        {shouldMarkTag &&
          <Image style={styles.removeIcon} source={Assets.icons.x} />}
        <Text style={[styles.tagLabel, typography]}>
          {shouldMarkTag ? 'Remove' : this.getLabel(tag)}
        </Text>
      </View>
    );
  }

  renderTag(tag, index) {
    const {tagStyle, renderTag} = this.props;
    const {tagIndexToRemove} = this.state;
    const shouldMarkTag = tagIndexToRemove === index;
    if (_.isFunction(renderTag)) {
      return renderTag(tag, index, shouldMarkTag);
    }
    return (
      <View
        key={index}
        style={[styles.tag, tagStyle, shouldMarkTag && styles.tagMarked]}
      >
        {this.renderLabel(tag, shouldMarkTag)}
      </View>
    );
  }

  renderTagWrapper(tag, index) {
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={1}
        onPress={() => this.onTagPress(index)}
      >
        {this.renderTag(tag, index)}
      </TouchableOpacity>
    );
  }

  renderTextInput() {
    const {containerStyle, inputStyle, ...others} = this.props;
    const {value} = this.state;
    const isLastTagMarked = this.isLastTagMarked();
    return (
      <View style={styles.inputWrapper}>
        <TextInput
          ref={r => (this.input = r)}
          text80
          {...others}
          value={value}
          onSubmitEditing={this.addTag}
          onChangeText={this.onChangeText}
          onKeyPress={this.onKeyPress}
          blurOnSubmit={false}
          enableErrors={false}
          hideUnderline
          selectionColor={isLastTagMarked ? 'transparent' : undefined}
          style={inputStyle}
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
          {_.map(tags, this.renderTagWrapper)}
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
    paddingVertical: 4.5,
    paddingHorizontal: 12,
    marginRight: GUTTER_SPACING,
    marginBottom: GUTTER_SPACING,
  },
  tagMarked: {
    backgroundColor: Colors.dark10,
  },
  removeIcon: {
    tintColor: Colors.white,
    width: 10,
    height: 10,
    marginRight: 6,
  },
  tagLabel: {
    ...Typography.text80,
    color: Colors.white,
  },
});
