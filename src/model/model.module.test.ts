import { Model } from './../model/model.module';

fdescribe('createDateCards', () => {
  it('should create cards', () => {
    const model = new Model();
    const cards = model.createTimeCards();
    expect(cards.length).toEqual(30);
  });
});
