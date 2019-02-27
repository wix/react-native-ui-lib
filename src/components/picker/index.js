// TODO: depreacte value allowing passing an object, allow only string or number
// TODO: extract picker labels from children in order to obtain the
// correct label to render (similar to what we do in NativePicker)
// TODO: simplify this component, stop inherit from TextField

import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Constants} from '../../helpers';
import {Colors, Typography} from '../../style';
import {BaseComponent} from '../../commons';
import TouchableOpacity from '../../components/touchableOpacity';
import View from '../../components/view';
import Modal from '../../screensComponents/modal';
import Image from '../../components/image';
import Text from '../../components/text';
import Button from '../../components/button';
import {TextField} from '../inputs';
import * as PickerPresenter from './PickerPresenter';
import NativePicker from './NativePicker';
import PickerModal from './PickerModal';
import PickerItem from './PickerItem';


const PICKER_MODES = {
  SINGLE: 'SINGLE',
  MULTI: 'MULTI',
};

const ItemType = PropTypes.shape({value: PropTypes.any, label: PropTypes.string});

/**
 * @description: Picker Component, support single or multiple selection, blurModel and nativePicker
 * @gif: https://media.giphy.com/media/3o751SiuZZiByET2lq/giphy.gif, https://media.giphy.com/media/TgMQnyw5grJIDohzvx/giphy.gif, https://media.giphy.com/media/5hsdmVptBRskZKn787/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/FormScreen.js
 */
class Picker extends BaseComponent {
  static displayName = 'Picker';
  static modes = PICKER_MODES;
  static propTypes = {
    ...TextField.propTypes,
    /**
     * Picker current value in the shape of {value: ..., label: ...}, for custom shape use 'getItemValue' prop
     */
    value: PropTypes.oneOfType([ItemType, PropTypes.arrayOf(ItemType), PropTypes.object, PropTypes.string, PropTypes.number]),
    /**
     * Callback for when picker value change
     */
    onChange: PropTypes.func,
    /**
     * SINGLE mode or MULTI mode
     */
    mode: PropTypes.oneOf(Object.keys(PICKER_MODES)),
    /**
     * Adds blur effect to picker modal (only iOS)
     */
    enableModalBlur: PropTypes.bool,
    /**
     * Render custom picker
     */
    renderPicker: PropTypes.func,
    /**
     * Render custom picker item
     */
    renderItem: PropTypes.func,
    /**
     * Custom picker props (when using renderPicker, will apply on the button wrapper)
     */
    customPickerProps: PropTypes.object,
    /**
     * Add onPress callback for when pressing the picker
     */
    onPress: PropTypes.func,
    /**
     * A function that extract the unique value out of the value prop in case value has a custom structure.
     */
    getItemValue: PropTypes.func,
    /**
     * A function that returns the label to show for the selected Picker value
     */
    getLabel: PropTypes.func,
    /**
     * The picker modal top bar props
     */
    topBarProps: PropTypes.shape(Modal.TopBar.propTypes),
    /**
     * Show search input to filter picker items by label
     */
    showSearch: PropTypes.bool,
    /**
     * Style object for the search input (only when passing showSearch)
     */
    searchStyle: PropTypes.shape({
      color: PropTypes.string,
      placeholderTextColor: PropTypes.string,
      selectionColor: PropTypes.string,
    }),
    /**
     * Placeholder text for the search input (only when passing showSearch)
     */
    searchPlaceholder: PropTypes.string,
    /**
     * callback for picker modal search input text change
     */
    onSearchChange: PropTypes.func,
    /**
     * Render custom search input
     */
    renderCustomSearch: PropTypes.func,
    /**
     * Allow to use the native picker solution (different for iOS and Android)
     */
    useNativePicker: PropTypes.bool,
    /**
     * Callback for rendering a custom native picker inside the dialog (relevant to native picker only)
     */
    renderNativePicker: PropTypes.func,
    /**
     * Icon asset source for showing on the right side, appropriate for dropdown icon and such
     */
    rightIconSource: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    /**
     * Pass props to the list component that wraps the picker options (allows to control FlatList behavior)
     */
    listProps: PropTypes.object,
  };

  static defaultProps = {
    ...TextField.defaultProps,
    // expandable: true,
    // text70: true,
    // enableErrors: false,
    mode: PICKER_MODES.SINGLE
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      showModal: false,
      selectedItemPosition: 0,
    };

    if (props.mode === Picker.modes.SINGLE && Array.isArray(props.value)) {
      console.warn('Picker in SINGLE mode cannot accept an array for value');
    }
    if (props.mode === Picker.modes.MULTI && !Array.isArray(props.value)) {
      console.warn('Picker in MULTI mode must accept an array for value');
    }

    if (props.useNativePicker && _.isPlainObject(props.value)) {
      console.warn('UILib Picker: dont use object as value for native picker, use either string or a number');
    }
  }

  componentWillReceiveProps(nexProps) {
    this.setState({
      value: nexProps.value,
    });
  }

  generateStyles() {
    this.styles = createStyles(this.getThemeProps());
  }

  getLabel() {
    const {value} = this.state;
    
    if (_.isArray(value)) {
      return _.chain(value)
        .map('label')
        .join(', ')
        .value();
    }

    const {getLabel} = this.props;
    return _.isFunction(getLabel) ? getLabel(value) : _.get(value, 'label');
  }

  getTypography() {
    return this.extractTypographyValue() || Typography.text70;
  }

  handlePickerOnPress = () => {
    this.toggleExpandableModal(true);
    _.invoke(this.props, 'onPress');
  }

  toggleExpandableModal(value) {
    this.setState({showExpandableModal: value});
  }

  toggleItemSelection = (item) => {
    const {value} = this.state;
    const newValue = _.xorBy(value, [item], 'value');
    this.setState({
      value: newValue,
    });
  }

  cancelSelect = () => {
    this.setState({
      value: this.props.value,
    });
    this.toggleExpandableModal(false);
  }

  onDoneSelecting = (item) => {
    this.setState({searchValue: '', value: item}); // clean search when done selecting
    // this.onChangeText(item);
    this.toggleExpandableModal(false);
    _.invoke(this.props, 'onChange', item);
  }

  onSearchChange = (searchValue) => {
    this.setState({
      searchValue,
    });
    _.invoke(this.props, 'onSearchChange', searchValue);
  };

  onSelectedItemLayout = ({
    nativeEvent: {
      layout: {y},
    },
  }) => {
    this.setState({selectedItemPosition: y});
  };

  appendPropsToChildren = () => {
    const {children, mode, getItemValue, showSearch, renderItem} = this.props;
    const {value, searchValue} = this.state;
    const childrenWithProps = React.Children.map(children, (child) => {
      const childValue = PickerPresenter.getItemValue({getItemValue, ...child.props});
      const childLabel = PickerPresenter.getItemLabel({...child.props, getLabel: child.props.getItemLabel});
      
      if (!showSearch || _.isEmpty(searchValue) || _.includes(_.lowerCase(childLabel), _.lowerCase(searchValue))) {
        const selectedValue = PickerPresenter.getItemValue({value, getItemValue});
        return React.cloneElement(child, {
          isSelected: PickerPresenter.isItemSelected(childValue, selectedValue),
          onPress: mode === Picker.modes.MULTI ? this.toggleItemSelection : this.onDoneSelecting,
          getItemValue: child.props.getItemValue || getItemValue,
          onSelectedLayout: this.onSelectedItemLayout,
          renderItem: child.props.renderItem || renderItem,
        });
      }
    });

    return childrenWithProps;
  }

  renderExpandableInput() {
    const {value} = this.state;
    const {placeholder, rightIconSource, style} = this.props;
    const typography = this.getTypography();
    const color = this.extractColorValue() || Colors.dark10;
    const label = this.getLabel();
    const shouldShowPlaceholder = _.isEmpty(value);

    return (
      <TouchableOpacity style={this.styles.pickerInputWrapper} activeOpacity={1} onPress={this.handlePickerOnPress}>
        <Text
          style={[
            this.styles.input,
            typography,
            {color},
            style,
            {height: Constants.isAndroid ? typography.lineHeight : undefined},
            shouldShowPlaceholder && this.styles.placeholder,
          ]}
          numberOfLines={3}
        >
          {shouldShowPlaceholder ? placeholder : label}
        </Text>
        {rightIconSource && <Image source={rightIconSource}/>}
      </TouchableOpacity>
    );
  }

  renderExpandableModal() {
    const {
      mode,
      enableModalBlur,
      topBarProps,
      showSearch,
      searchStyle,
      searchPlaceholder,
      renderCustomSearch,
      listProps} = this.getThemeProps();
    const {showExpandableModal, selectedItemPosition} = this.state;
    
    return (
      <PickerModal
        visible={showExpandableModal}
        scrollPosition={selectedItemPosition}
        enableModalBlur={enableModalBlur}
        topBarProps={{
          ...topBarProps,
          onCancel: this.cancelSelect,
          onDone: mode === Picker.modes.MULTI ? () => this.onDoneSelecting(this.state.value) : undefined,
        }}
        showSearch={showSearch}
        searchStyle={searchStyle}
        searchPlaceholder={searchPlaceholder}
        onSearchChange={this.onSearchChange}
        renderCustomSearch={renderCustomSearch}
        listProps={listProps}
      >
        {this.appendPropsToChildren(this.props.children)}
      </PickerModal>
    );
  }

  render() {
    const {useNativePicker, renderPicker, customPickerProps, testID} = this.props;

    if (useNativePicker) return <NativePicker {...this.props}/>;

    const {value} = this.state;
    const customPicker = _.isFunction(renderPicker);
    const customProps = customPicker ? customPickerProps : undefined;
    
    return (
      <View left>
        <Button link onPress={this.handlePickerOnPress} testID={testID} {...customProps}>
          {customPicker ? renderPicker(value) : this.renderExpandableInput()}
        </Button>
        {this.renderExpandableModal()}
      </View>
    );
  }
}

function createStyles({placeholderTextColor, centered}) {
  return StyleSheet.create({
    pickerInputWrapper: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      flexGrow: 1,
      marginBottom: Constants.isIOS ? 10 : 5,
      padding: 0,
      textAlign: centered ? 'center' : undefined,
      backgroundColor: 'transparent',
    },
    placeholder: {
      color: placeholderTextColor,
    },
  });
}

Picker.Item = PickerItem;
export default Picker;
