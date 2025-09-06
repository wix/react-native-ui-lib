export interface OldApiProps {
    /**
     * @deprecated
     * The date format for the text display
     */
    dateFormat?: string;
    /**
     * @deprecated
     * A callback function to format date
     */
    dateFormatter?: (date: Date) => string;
    /**
     * @deprecated
     * The time format for the text display
     */
    timeFormat?: string;
    /**
     * @deprecated
     * A callback function to format time
     */
    timeFormatter?: (date: Date) => string;
}
type Mode = 'date' | 'time';
declare const useOldApi: (props: OldApiProps) => {
    getStringValue: (value: Date, mode: Mode) => string | undefined;
};
export default useOldApi;
