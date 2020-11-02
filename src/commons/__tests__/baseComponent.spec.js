import baseComponent from '../baseComponent';
import {Colors} from '../../style';

const BaseComponent = baseComponent(false);

describe('BaseComponent', () => {
  
  describe('updateModifiers', () => {
    it('should update state with new modifiers values if modifiers props have changed', () => {
      const uut = new BaseComponent({});
      jest.spyOn(uut, 'setState');

      uut.updateModifiers({someProp: true, 'bg-dark20': true}, {someProp: true, 'bg-dark30': true});
      expect(uut.setState).toHaveBeenCalledWith({backgroundColor: Colors.dark30});

      uut.updateModifiers({someProp: 'text'}, {'bg-red50': true, 'padding-20': true});
      expect(uut.setState).toHaveBeenCalledWith({backgroundColor: Colors.red50, paddings: {padding: 20}});
    });

    it('should not update state if modifiers prop have not changed', () => {
      const uut = new BaseComponent({});
      jest.spyOn(uut, 'setState');

      uut.updateModifiers({someProp: true, 'bg-dark20': true}, {someProp: false, 'bg-dark20': true});
      expect(uut.setState).not.toHaveBeenCalled();
    });

    it('should not update state if any prop value has changed', () => {
      const uut = new BaseComponent({});
      jest.spyOn(uut, 'setState');

      uut.updateModifiers({someProp: true, 'bg-dark20': true}, {someProp: true, 'bg-dark20': true});
      expect(uut.setState).not.toHaveBeenCalled();
    });
  });
});
