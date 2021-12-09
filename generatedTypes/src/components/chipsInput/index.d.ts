import _ from 'lodash';
import React, { Component } from 'react';
import { ViewStyle, TextInput, NativeSyntheticEvent, TextInputKeyPressEventData, ScrollView, ScrollViewProps, TextInputProps as RNTextInputProps } from 'react-native';
import { BaseComponentInjectedProps, TypographyModifiers } from '../../commons/new';
import { ChipProps } from '../chip';
import { TextFieldProps } from '../../../typings/components/Inputs';
declare type ChipType = string | boolean | any;
export declare type ChipsInputChipProps = ChipProps & {
    invalid?: boolean;
};
export declare type ChipsInputProps = TypographyModifiers & TextFieldProps & {
    /**
    * DEPRECATED: use chips instead. list of tags. can be string boolean or custom object when implementing getLabel
    */
    tags?: ChipType[];
    /**
    * list of tags. can be string boolean or custom object when implementing getLabel
    */
    chips?: ChipsInputChipProps[];
    /**
     * Style your chips
     */
    defaultChipProps?: ChipsInputChipProps;
    /**
     * callback for extracting the label out of the tag item
     */
    getLabel?: (tag: ChipType) => any;
    /**
     * DEPRECATED: use chips instead. callback for custom rendering tag item
     */
    renderTag?: (tag: ChipType, index: number, shouldMarkTag: boolean, label: string) => React.ReactElement;
    /**
     * callback for onChangeTags event
     */
    onChangeTags?: () => void;
    /**
     * DEPRECATED: use chips instead. callback for creating new tag out of input value (good for composing tag object)
     */
    onCreateTag?: (value: any) => void;
    /**
     * DEPRECATED: use chips instead. callback for when pressing a tag in the following format (tagIndex, markedTagIndex) => {...}
     */
    onTagPress?: (index: number, toRemove?: number) => void;
    /**
     * validation message error appears when tag isn't validate
     */
    validationErrorMessage?: string;
    /**
     * if true, tags *removal* Ux won't be available
     */
    disableTagRemoval?: boolean;
    /**
     * if true, tags *adding* Ux (i.e. by 'submitting' the input text) won't be available
     */
    disableTagAdding?: boolean;
    /**
     * custom styling for the component container
     */
    containerStyle?: ViewStyle;
    /**
     * custom styling for the tag item
     */
    tagStyle?: ViewStyle;
    /**
     * custom styling for the text input
     */
    inputStyle?: RNTextInputProps['style'];
    /**
     * should hide input underline
     */
    hideUnderline?: boolean;
    /**
     *  Maximum numbers of chips
     */
    maxLength?: number;
    /**
     * Chips with maxHeigh is inside a scrollView
     */
    scrollViewProps?: ScrollViewProps;
    /**
     * Chips inside a ScrollView
     */
    maxHeight?: number;
    /**
     * Custom element before the chips, for example 'search' icon, 'To:' label etc'
     */
    leftElement?: JSX.Element | JSX.Element[];
    value?: any;
    selectionColor?: string | number;
};
declare type State = {
    value: any;
    chips: Array<ChipType>;
    chipIndexToRemove?: number;
    initialChips?: Array<ChipType>;
    isFocused: boolean;
};
declare type OwnProps = ChipsInputProps & BaseComponentInjectedProps;
/**
 * @description: Chips input component
 * @modifiers: Typography
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/ChipsInput/ChipsInput.gif?raw=true
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ChipsInputScreen.tsx
 * @extends: TextField
 */
declare class ChipsInput extends Component<OwnProps, State> {
    static displayName: string;
    static onChangeTagsActions: {
        ADDED: string;
        REMOVED: string;
    };
    input: React.RefObject<TextInput>;
    scrollRef: React.RefObject<ScrollView>;
    constructor(props: OwnProps);
    componentDidMount(): void;
    static getDerivedStateFromProps(nextProps: Readonly<OwnProps>, prevState: State): {
        initialChips: any[] | undefined;
        chips: any[] | undefined;
    } | null;
    addTag: () => void;
    removeMarkedTag(): void;
    markTagIndex: (chipIndex: number) => void;
    onChangeText: _.DebouncedFunc<(value: any) => void>;
    onTagPress(index: number): void;
    isLastTagMarked(): boolean;
    removeTag: () => void;
    onKeyPress: (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => void;
    getLabel: (item: ChipType) => any;
    onFocus: () => void;
    onBlur: () => void;
    renderLabel(tag: ChipType, shouldMarkTag: boolean): JSX.Element;
    renderTag: (tag: ChipType, index: number) => JSX.Element;
    renderTagWrapper: (tag: ChipType, index: number) => JSX.Element;
    renderNewChip: () => JSX.Element[];
    renderTitleText: () => "" | JSX.Element | undefined;
    renderChips: () => JSX.Element[];
    renderCharCounter(): JSX.Element | undefined;
    renderUnderline: () => JSX.Element;
    renderTextInput(): JSX.Element;
    renderChipsContainer: () => JSX.Element;
    render(): JSX.Element;
    blur(): void;
    focus(): void;
    clear(): void;
}
export { ChipsInput };
declare const _default: React.ComponentClass<ChipsInputProps & {
    useCustomTheme?: boolean | undefined;
}, any> & typeof ChipsInput;
export default _default;
