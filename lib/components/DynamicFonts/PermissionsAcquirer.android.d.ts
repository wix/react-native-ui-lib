export type PermissionsAcquirerProps = {
    requestPermissionsTitle?: string;
    requestPermissionsMessage?: string;
    requestPermissionsPositiveButtonText?: string;
    permissionsRefusalMessage?: string;
    permissionsErrorMessage?: string;
};
export default class PermissionsAcquirer {
    private readonly props;
    constructor(props: PermissionsAcquirerProps);
    checkPermissions(): Promise<boolean>;
    getPermissions(): Promise<void>;
}
