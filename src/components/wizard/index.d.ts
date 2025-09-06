import React, { Component } from 'react';
import WizardStep from './WizardStep';
import { WizardProps, WizardStepProps, WizardStepStates, WizardStepConfig, WizardStepsConfig } from './types';
export { WizardProps, WizardStepProps, WizardStepStates, WizardStepConfig, WizardStepsConfig };
interface State {
    maxWidth: number;
}
/**
 * @description: Wizard Component: a wizard presents a series of steps in  prescribed order
 * that the user needs to complete in order to accomplish a goal (e.g. purchase a product).
 *
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/WizardScreen.tsx
 * @notes: Use Wizard with nested Wizard.Step(s) to achieve the desired result.
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Wizard/Wizard.gif?raw=true
 * @image: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Wizard/WizardPresets.png?raw=true
 */
declare class Wizard extends Component<WizardProps, State> {
    static displayName: string;
    static Step: typeof WizardStep;
    static States: typeof WizardStepStates;
    private dimensionsChangeListener;
    constructor(props: WizardProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    onOrientationChange: () => void;
    getMaxWidth(): number;
    renderChildren(): React.DetailedReactHTMLElement<any, HTMLElement>[] | null | undefined;
    render(): React.JSX.Element;
}
declare const _default: React.ForwardRefExoticComponent<WizardProps & React.RefAttributes<any>> & typeof Wizard;
export default _default;
