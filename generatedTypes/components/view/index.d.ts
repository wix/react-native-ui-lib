import React from 'react';
import { ViewProps } from 'react-native';
import { ContainerModifiers } from '../../commons/new';
export interface ViewPropTypes extends ViewProps, ContainerModifiers {
    /**
     * If true, will render as SafeAreaView
     */
    useSafeArea?: boolean;
    /**
     * Use Animate.View as a container
     */
    animated?: boolean;
    /**
     * Turn off accessibility for this view and its nested children
     */
    inaccessible?: boolean;
    /**
     * TODO: probobly isn't needed
     */
    width?: string | number;
    /**
     * TODO: probobly isn't needed
     */
    height?: string | number;
}
declare const _default: React.ComponentClass<ViewPropTypes, any> | React.FunctionComponent<ViewPropTypes>;
export default _default;
