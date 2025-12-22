import useMiddleIndex from '../helpers/useListMiddleIndex';

describe('Finds list\'s middle index', () => {
  
  it('When list is at offset 0, it should return the index of the first item', () => {
    const sut = useMiddleIndex({itemHeight: 50, listSize: 10});
    const offset = 0;
    expect(sut(offset)).toEqual(0);
  });

  it('When list is at offset 100, it means we are at passed on 2 items', () => {
    const sut = useMiddleIndex({itemHeight: 50, listSize: 10});
    const offset = 100;
    expect(sut(offset)).toEqual(2);
  });

  it('Make sure calculation changes on the middle of the item height', () => {
    const sut = useMiddleIndex({itemHeight: 50, listSize: 10});
    let offset = 24;
    expect(sut(offset)).toEqual(0);

    offset = 26;
    expect(sut(offset)).toEqual(1);
  });

  it('Make sure calculation does not exceeds the number of items', () => {
    const sut = useMiddleIndex({itemHeight: 50, listSize: 10});
    let offset = 501;
    expect(sut(offset)).toEqual(9);

    offset = 600;
    expect(sut(offset)).toEqual(9);
  });

  it('Make sure calculation does not less then 0', () => {
    const sut = useMiddleIndex({itemHeight: 50, listSize: 10});
    const offset = -100;
    expect(sut(offset)).toEqual(0);
  });
});
