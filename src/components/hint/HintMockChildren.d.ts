import React from 'react';
import { LayoutRectangle } from 'react-native';
import { HintProps } from './types';
interface HintMockChildrenProps extends Pick<HintProps, 'children' | 'backdropColor'> {
    targetLayout?: LayoutRectangle;
}
export default function HintMockChildren({ children, backdropColor, targetLayout }: HintMockChildrenProps): React.JSX.Element | null;
export {};
