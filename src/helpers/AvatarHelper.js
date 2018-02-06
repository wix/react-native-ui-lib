import _ from 'lodash';
import {URL} from 'url';
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
  return hostname === 'www.gravatar.com' && pathname.startsWith('/avatar/');
}

export function patchGravatarUrl(gravatarUrl) {
  const flatUrl = gravatarUrl.split('?')[0];
  const {searchParams, hash} = new URL(gravatarUrl);
  searchParams.set('d', '404');
  searchParams.delete('default');

  return `${flatUrl}?${searchParams}${hash}`;
}
