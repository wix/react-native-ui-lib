declare function getStartEndFromAngle(angle?: number): {
    start: {
        x: number;
        y: number;
    };
    end: {
        x: number;
        y: number;
    };
};
export declare const _forTesting: {
    getStartEndFromAngle: typeof getStartEndFromAngle;
};
export type AngleTransformProps = {
    angle?: number;
};
declare const useAngleTransform: (props: AngleTransformProps) => {
    start: {
        x: number;
        y: number;
    };
    end: {
        x: number;
        y: number;
    };
};
export default useAngleTransform;
