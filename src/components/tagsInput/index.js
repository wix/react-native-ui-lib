import React from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {BaseComponent} from '../../commons';
import {TextInput} from '../inputs';
import View from '../view';
import Text from '../text';
import {Colors, BorderRadiuses} from '../../style';

export default class TagsInput extends BaseComponent {
  static propTypes = {
    tags: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    ),
    getLabel: PropTypes.func,
    onChangeTags: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.addTag = this.addTag.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.renderTag = this.renderTag.bind(this);
    this.getLabel = this.getLabel.bind(this);

    this.state = {
      value: props.value,
      tags: props.tags,
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     tags: nextProps.tags,
  //   });
  // }

  addTag() {
    const {value, tags} = this.state;
    const newTags = [...tags, value];
    this.setState({
      tags: newTags,
    });
    _.invoke(this.props, 'onChangeTags', newTags);
    this.input.clear();
  }

  onChangeText(value) {
    this.setState({value});
    _.invoke(this.props, 'onChangeText', value);
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
    return (
      <View key={index} style={styles.tag}>
        <Text style={styles.tagLabel}>
          {this.getLabel(tag)}
        </Text>
      </View>
    );
  }

  render() {
    const {tags, value} = this.state;
    return (
      <View>
        <View style={styles.tagsList}>
          {_.map(tags, this.renderTag)}
          <View style={styles.inputWrapper}>
            <TextInput
              ref={r => (this.input = r)}
              {...this.props}
              value={value}
              onSubmitEditing={this.addTag}
              onChangeText={this.onChangeText}
              blurOnSubmit={false}
              enableErrors={false}
              text80
              hideUnderline
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
  },
  inputWrapper: {
    flexGrow: 1,
    minWidth: 120,
  },
  tag: {
    backgroundColor: Colors.blue30,
    borderRadius: BorderRadiuses.br100,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  tagLabel: {
    color: Colors.white,
  },
});
