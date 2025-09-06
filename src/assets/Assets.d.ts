export declare class Assets {
    [key: string]: any;
    loadAssetsGroup(groupName: string, assets: object): this;
    getAssetByPath(path: string): this[string];
}
