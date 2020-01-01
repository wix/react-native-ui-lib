import {ColorValue} from '../style/colors';

export namespace AvatarHelper {
  export function getAvatarColors(): ColorValue[];
  export function getColorById(id: string, avatarColors?: ColorValue[]): ColorValue;
  export function getInitials(name: string): string;
  export function isGravatarUrl(url: string): boolean;
  export function isBlankGravatarUrl(url: string): boolean;
  export function patchGravatarUrl(gravatarUrl: string): string;
}
