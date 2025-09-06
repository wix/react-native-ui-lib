import { ElementRef } from 'react';
import { View as RNView } from 'react-native';
import { HintProps } from '../types';
export default function useHintAccessibility(message?: HintProps['message']): {
    focusAccessibilityOnHint: (targetRef: ElementRef<typeof RNView>, hintRef: ElementRef<typeof RNView>) => void;
    accessibilityInfo: {
        accessible: boolean;
        accessibilityLabel: string;
    } | undefined;
};
