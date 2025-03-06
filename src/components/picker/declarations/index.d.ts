import {PickerPropsDeprecation} from '../types';

declare module '../types' {
  export interface PickerProps {
    /**
     * @deprecated
     * Temporary prop required for migration to Picker's new API
     */
    migrate?: boolean;
  }
}
