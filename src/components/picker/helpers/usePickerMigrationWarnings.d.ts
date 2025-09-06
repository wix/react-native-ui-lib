import { PickerProps } from '../types';
type UsePickerMigrationWarnings = Pick<PickerProps, 'children' | 'migrate' | 'getItemLabel' | 'getItemValue' | 'onShow'>;
declare const usePickerMigrationWarnings: (props: UsePickerMigrationWarnings) => void;
export default usePickerMigrationWarnings;
