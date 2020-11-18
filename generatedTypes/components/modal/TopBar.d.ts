import React from 'react';
import { StyleProp, TextStyle, ImageSourcePropType } from 'react-native';
import { ButtonProps } from '../../components/button';
export interface ModalTopBarProps {
    /**
       * title to display in the center of the top bar
       */
    title?: string;
    /**
     * title custom style
     */
    titleStyle?: StyleProp<TextStyle>;
    /**
     * done action props (Button props)
     */
    doneButtonProps?: Omit<ButtonProps, 'onPress'>;
    /**
     * done action label
     */
    doneLabel?: string;
    /**
     * done action icon
     */
    doneIcon?: ImageSourcePropType;
    /**
     * done action callback
     */
    onDone?: (props: any) => void;
    /**
     * cancel action props (Button props)
     */
    cancelButtonProps?: Omit<ButtonProps, 'onPress'>;
    /**
     * cancel action label
     */
    cancelLabel?: string;
    /**
     * cancel action icon
     */
    cancelIcon?: ImageSourcePropType;
    /**
     * cancel action callback
     */
    onCancel?: (props: any) => void;
    /**
     * whether to include status bar or not (height claculations)
     */
    includeStatusBar?: boolean;
}
declare const _default: React.ComponentClass<ModalTopBarProps & {
    useCustomTheme?: boolean | undefined;
}, any>;
export default _default;
