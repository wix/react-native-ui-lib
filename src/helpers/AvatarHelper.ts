import _ from 'lodash';
import URL from 'url-parse';
import Colors from '../style/colors';

export function hashStringToNumber(str?: string) {
  let hash = 5381;
  if (str) {
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) + hash + char; /* hash * 33 + c */ // eslint-disable-line
    }
  }
  return hash;
}

export function getAvatarColors() {
  return [
    Colors.blue20,
    Colors.cyan20,
    Colors.green20,
    Colors.yellow20,
    Colors.orange20,
    Colors.red20,
    Colors.purple20,
    Colors.violet20
  ];
}

export function getColorById(id: string, avatarColors = getAvatarColors()) {
  if (!id) {
    return avatarColors[0];
  }

  const hashedId = hashStringToNumber(id);
  const colorIndex = Math.abs(hashedId % avatarColors.length);
  return avatarColors[colorIndex];
}

export function getInitials(name?: string, limit = 2) {
  let initials = '';
  if (name && _.isString(name)) {
    const nameSplitted = _.flow(name => _.split(name, /\s+/g),
      words => _.filter(words, word => word.length > 0),
      words => _.take(words, limit))(name);
    _.each(nameSplitted, str => {
      initials += str[0];
    });
  }

  return _.toUpper(initials);
}

export function getBackgroundColor(name?: string,
  avatarColors?: string[],
  hashFunction?: (name?: string) => number,
  defaultColor?: string) {
  if (!name || !avatarColors || !hashFunction) {
    return defaultColor;
  }

  const hash = hashFunction(name);
  const index = Math.abs(hash % avatarColors.length);
  return avatarColors[index];
}

export function isGravatarUrl(url: string) {
  const {hostname, pathname} = new URL(url);
  return _.split(hostname, '.').includes('gravatar') && pathname.startsWith('/avatar/');
}

export function isBlankGravatarUrl(url: string) {
  return isGravatarUrl(url) && _.endsWith(url, '?d=blank');
}

export function patchGravatarUrl(gravatarUrl: string) {
  const url = new URL(gravatarUrl, true);
  const {query} = url;
  query.d = '404';
  delete query.default;
  url.set('query', query);
  return url.toString();
}
