import { createComponet } from '../modules/app.componet';

describe('createComponent', () => {
  it('should create dom elem', () => {
    const component = createComponet();

    expect(component).toBeTruthy();
  });
});
