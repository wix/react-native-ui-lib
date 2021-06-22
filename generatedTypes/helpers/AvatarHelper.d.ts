export declare function hashStringToNumber(str: string): number;
export declare function getAvatarColors(): string[];
export declare function getColorById(id: string, avatarColors?: string[]): string;
export declare function getInitials(name?: string, limit?: number): string;
export declare function getBackgroundColor(name?: string, avatarColors?: string[], hashFunction?: (name?: string) => number, defaultColor?: string): string | undefined;
export declare function isGravatarUrl(url: string): boolean;
export declare function isBlankGravatarUrl(url: string): boolean;
export declare function patchGravatarUrl(gravatarUrl: string): string;
