// adopted from: ntc js (Name that Color JavaScript)
// http://chir.ag/projects/ntc

const names = require('./colorNameMap').colorNameMap;

// ColorName.name(hex_color) will return array for nearest color: ['hex color', 'color name', isMapped]
class ColorName {
  _init() {
    let color;
    let rgb;
    let hsl;

    for (let i = 0; i < names.length; i++) {
      color = '#' + names[i][0];
      rgb = this._rgb(color);
      hsl = this._hsl(color);
      names[i].push(rgb[0], rgb[1], rgb[2], hsl[0], hsl[1], hsl[2]);
    }
  }

  name(color) {
    color = color.toUpperCase();
    if (color.length < 3 || color.length > 7) {
      return ['#000000', 'Invalid Color: ' + color, false];
    }
    if (color.length % 3 === 0) {
      color = '#' + color;
    }
    if (color.length === 4) {
      color = '#' + color.substr(1, 1) + color.substr(1, 1) + color.substr(2, 1) + color.substr(2, 1) + color.substr(3, 1) + color.substr(3, 1);
    }

    const rgb = this._rgb(color);
    const r = rgb[0];
    const g = rgb[1];
    const b = rgb[2];

    const hsl = this._hsl(color);
    const h = hsl[0];
    const s = hsl[1];
    const l = hsl[2];
    
    let ndf1 = 0; 
    let ndf2 = 0; 
    let ndf = 0;

    let cl = -1;
    let df = -1;

    for (let i = 0; i < names.length; i++) {
      if (color === '#' + names[i][0]) {
        return ['#' + names[i][0], names[i][1], true];
      }

      ndf1 = Math.pow(r - names[i][2], 2) + Math.pow(g - names[i][3], 2) + Math.pow(b - names[i][4], 2);
      ndf2 = Math.pow(h - names[i][5], 2) + Math.pow(s - names[i][6], 2) + Math.pow(l - names[i][7], 2);
      ndf = ndf1 + ndf2 * 2;
      
      if (df < 0 || df > ndf) {
        df = ndf;
        cl = i;
      }
    }

    return (cl < 0 ? ['#000000', 'Invalid Color: ' + color, false] : ['#' + names[cl][0], names[cl][1], false]);
  }

  // adopted from: Farbtastic 1.2
  // http://acko.net/dev/farbtastic
  _hsl(color) {
    const rgb = [
      parseInt('0x' + color.substring(1, 3)) / 255, 
      parseInt('0x' + color.substring(3, 5)) / 255, 
      parseInt('0x' + color.substring(5, 7)) / 255
    ];
    const r = rgb[0];
    const g = rgb[1];
    const b = rgb[2];

    const min = Math.min(r, Math.min(g, b));
    const max = Math.max(r, Math.max(g, b));
    const delta = max - min;
    const l = (min + max) / 2;

    let s = 0;
    if (l > 0 && l < 1) {
      s = delta / (l < 0.5 ? (2 * l) : (2 - 2 * l));
    }

    let h = 0;
    if (delta > 0) {
      if (max === r && max !== g) {
        h += (g - b) / delta;
      }
      if (max === g && max !== b) {
        h += (2 + (b - r) / delta);
      }
      if (max === b && max !== r) {
        h += (4 + (r - g) / delta);
      }
      h /= 6;
    }

    return [
      parseInt(h * 255), 
      parseInt(s * 255), 
      parseInt(l * 255)
    ];
  }

  // adopted from: Farbtastic 1.2
  // http://acko.net/dev/farbtastic
  _rgb(color) {
    return [
      parseInt('0x' + color.substring(1, 3)), 
      parseInt('0x' + color.substring(3, 5)), 
      parseInt('0x' + color.substring(5, 7))
    ];
  }
}

const object = new ColorName();
object._init();

export default object;
