export declare function extractPositionValues(position: string[] | undefined): {
    top: boolean;
    left: boolean;
    right: boolean;
    bottom: boolean;
};
export declare function generateBorderRadiusStyle({ position, borderRadius }: {
    position: string[] | undefined;
    borderRadius: number | undefined;
}): {
    [key: string]: number | undefined;
};
