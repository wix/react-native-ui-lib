import { ImageProps } from '../image';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
export declare enum WizardStepStates {
    ENABLED = "enabled",
    DISABLED = "disabled",
    ERROR = "error",
    SKIPPED = "skipped",
    COMPLETED = "completed"
}
export interface WizardStepProps {
    /**
     * The state of the step (Wizard.States.X)
     */
    state: WizardStepStates;
    /**
     * The label of the item
     */
    label?: string;
    /**
     * Additional styles for the label
     */
    labelStyle?: StyleProp<TextStyle>;
    /**
     * Additional styles for the connector
     */
    connectorStyle?: StyleProp<ViewStyle>;
    /**
     * Color of the step index (or of the icon, when provided)
     */
    color?: string;
    /**
     * Color of the circle
     */
    circleColor?: string;
    /**
     * The step's circle size (diameter)
     */
    circleSize?: number;
    /**
     * Circle's background color
     */
    circleBackgroundColor?: string;
    /**
     * Icon to replace the (default) index
     */
    icon?: ImageProps;
    /**
     * Additional styles for the index's label (when icon is not provided)
     */
    indexLabelStyle?: StyleProp<TextStyle>;
    /**
     * Whether the step should be enabled
     */
    enabled?: boolean;
    /**
     * Extra text to be read in accessibility mode
     */
    accessibilityInfo?: string;
}
export declare type WizardStepConfig = Omit<WizardStepProps, 'state'>;
export interface WizardStepsConfig {
    enabled?: WizardStepConfig;
    disabled?: WizardStepConfig;
    error?: WizardStepConfig;
    skipped?: WizardStepConfig;
    completed?: WizardStepConfig;
    active?: WizardStepConfig;
}
export interface WizardProps {
    /**
     * The active step's index
     */
    activeIndex: number;
    /**
     * The configuration of the active step (see Wizard.Step.propTypes)
     */
    activeConfig?: WizardStepProps;
    /**
     * Callback that is called when the active step is changed (i.e. a step was clicked on).
     * The new activeIndex will be the input of the callback.
     */
    onActiveIndexChanged?: (index: number) => void;
    /**
     * Add or override style of the container
     */
    containerStyle?: StyleProp<ViewStyle>;
    testID?: string;
}
