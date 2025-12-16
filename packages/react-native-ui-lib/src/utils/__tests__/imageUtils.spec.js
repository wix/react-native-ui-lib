import {isSvgUri, isSvg, isBase64ImageContent, getAsset} from '../imageUtils';

const svgImage = {uri: 'https://example.com/image.svg'};
const randomPngImage = {uri: 'https://picsum.photos/300'};
const svgString =
  '<?xml version="1.0" encoding="UTF-8"?><svg data-bbox="4 2.122 17.878 17.878" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24" width="24" data-type="color"><g><path fill="#116DFF" d="M15.232 2.854a2.5 2.5 0 0 1 3.536 0l2.378 2.378a2.5 2.5 0 0 1 0 3.536L10.5 19.414A2 2 0 0 1 9.086 20H5a1 1 0 0 1-1-1v-4.086a2 2 0 0 1 .586-1.414L15.232 2.854ZM6 18h3.086l7.255-7.255-3.086-3.086L6 14.914V18Zm8.67-11.755 3.085 3.086 1.977-1.977a.5.5 0 0 0 0-.708l-2.378-2.378a.5.5 0 0 0-.708 0L14.67 6.245Z" clip-rule="evenodd" fill-rule="evenodd" data-color="1"/></g></svg>';
const base64Image =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=';

describe('ImageUtils', () => {
  describe('isSvgUri', () => {
    it('should return true if the uri is svg', () => {
      const result = isSvgUri(svgImage);
      expect(result).toBe(true);
    });
    it('should return false if the uri is not svg', () => {
      const result = isSvgUri(randomPngImage);
      expect(result).toBe(false);
    });
  });

  describe('isSvg', () => {
    it('should return true if the string is svg', () => {
      const result = isSvg(svgString);
      expect(result).toBe(true);
    });
    it('should return false if the string is not svg', () => {
      const result = isSvg('<svg data-bbox="4.../>');
      expect(result).toBe(false);
    });
  });

  describe('isBase64ImageContent', () => {
    it('should return true if the string is base64', () => {
      const result = isBase64ImageContent(base64Image);
      expect(result).toBe(true);
    });
    it('should return false if the string is not base64', () => {
      const result = isBase64ImageContent(svgString);
      expect(result).toBe(false);
    });
  });

  describe('getAsset', () => {
    it('should return the asset if asset group and asset name exsist', () => {
      const result = getAsset('search', 'internal.icons');
      expect(result).toBeDefined();
    });
    it('should return the asset if asset group and asset name exsist', () => {
      const result = getAsset('blah', 'internal.icons');
      expect(result).toBeUndefined();
    });
  });
});
