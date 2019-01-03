import _ from 'lodash';
import URL from 'url-parse';
import Colors from '../style/colors';

function hashStringToNumber(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) + hash) + char; /* hash * 33 + c */ // eslint-disable-line
  }
  return hash;
}

export function getAvatarColors() {
  return [Colors.blue20, Colors.cyan20, Colors.green20, Colors.yellow20,
    Colors.orange20, Colors.red20, Colors.purple20, Colors.violet20];
}

export function getColorById(id, avatarColors = getAvatarColors()) {
  if (!id) {
    return avatarColors[0];
  }

  const hashedId = hashStringToNumber(id);
  const colorIndex = Math.abs(hashedId % avatarColors.length);
  return avatarColors[colorIndex];
}

export function getInitials(name) {
  let initials = '';
  if (name && _.isString(name)) {
    const nameSplitted = _.chain(name)
      .split(/\s+/g)
      .filter(word => word.length > 0)
      .take(2)
      .value();
    _.each(nameSplitted, (str) => {
      initials += str[0];
    });
  }

  return _.toUpper(initials);
}

export function isGravatarUrl(url) {
  const {hostname, pathname} = new URL(url);
  return _.split(hostname, '.').includes('gravatar') && pathname.startsWith('/avatar/');
}

export function isBlankGravatarUrl(url) {
  return isGravatarUrl(url) && _.endsWith(url, '?d=blank');
}

export function patchGravatarUrl(gravatarUrl) {
  const url = new URL(gravatarUrl, true);
  const {query} = url;
  query.d = '404';
  delete query.default;
  url.set('query', query);
  return url.toString();
}
