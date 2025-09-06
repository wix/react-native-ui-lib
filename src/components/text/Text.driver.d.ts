/// <reference types="react" />
import { TextProps } from './index';
import { ComponentDriver } from '../../testkit/Component.driver';
export declare class TextDriver extends ComponentDriver<TextProps> {
    getTextContent: () => Promise<import("react").ReactNode>;
    isPressable: () => Promise<boolean | null>;
}
