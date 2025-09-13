import _endsWith from "lodash/endsWith";
import _toUpper from "lodash/toUpper";
import _each from "lodash/each";
import _take from "lodash/take";
import _filter from "lodash/filter";
import _split from "lodash/split";
import _flow from "lodash/flow";
import _isString from "lodash/isString";
import URL from 'url-parse';
import Colors from "../style/colors";
import { Typography } from "../style";
export function getInitialsTypography(size) {
  let typography;
  switch (true) {
    case size < 24:
      typography = {
        fontSize: 10
      };
      break;
    case size < 34:
      typography = Typography.text90BO;
      break;
    case size < 54:
      typography = Typography.text80BO;
      break;
    case size < 70:
      typography = Typography.text60BO;
      break;
    case size < 100:
      typography = Typography.text50H;
      break;
    default:
    case size >= 100:
      typography = Typography.text40H;
      break;
  }
  return typography;
}
export function hashStringToNumber(str) {
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
  return [Colors.blue20, Colors.cyan20, Colors.green20, Colors.yellow20, Colors.orange20, Colors.red20, Colors.purple20, Colors.violet20];
}
export function getColorById(id, avatarColors = getAvatarColors()) {
  if (!id) {
    return avatarColors[0];
  }
  const hashedId = hashStringToNumber(id);
  const colorIndex = Math.abs(hashedId % avatarColors.length);
  return avatarColors[colorIndex];
}
export function getInitials(name, limit = 2) {
  let initials = '';
  if (name && _isString(name)) {
    const nameSplitted = _flow(name => _split(name, /\s+/g), words => _filter(words, word => word.length > 0), words => _take(words, limit))(name);
    _each(nameSplitted, str => {
      initials += str[0];
    });
  }
  return _toUpper(initials);
}
export function getBackgroundColor(name, avatarColors, hashFunction, defaultColor) {
  if (!name || !avatarColors || !hashFunction) {
    return defaultColor;
  }
  const hash = hashFunction(name);
  const index = Math.abs(hash % avatarColors.length);
  return avatarColors[index];
}
export function isGravatarUrl(url) {
  const {
    hostname,
    pathname
  } = new URL(url);
  return _split(hostname, '.').includes('gravatar') && pathname.startsWith('/avatar/');
}
export function isBlankGravatarUrl(url) {
  return isGravatarUrl(url) && _endsWith(url, '?d=blank');
}
export function patchGravatarUrl(gravatarUrl) {
  const url = new URL(gravatarUrl, true);
  const {
    query
  } = url;
  query.d = '404';
  delete query.default;
  url.set('query', query);
  return url.toString();
}