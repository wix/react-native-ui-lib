import { SchemeType } from '../style';
interface ConfigOptions {
    /**
     * Should use platform colors for design tokens
     */
    usePlatformColors?: boolean;
    /**
     * Whether to scheme from local storage
     */
    useLocalScheme?: boolean;
    /**
     * The app's colors scheme (default | light | dark)
     */
    appScheme?: SchemeType;
}
declare class Config {
    usePlatformColors?: boolean;
    useLocalScheme?: boolean;
    appScheme: SchemeType;
    constructor();
    setConfig(options: ConfigOptions): Promise<void>;
}
declare const _default: Config;
export default _default;
