import { HintProps } from './index';
import { ComponentDriver } from '../../testkit/Component.driver';
export declare class HintDriver extends ComponentDriver<HintProps> {
    getHintContent: () => Promise<any>;
    getHintModal: () => Promise<any>;
}
