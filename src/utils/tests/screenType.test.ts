import { getScreenType } from 'legacy/Legacy.context';

describe('getScreenType', () => {
  it('Screen Type function should be working & only return enum allowed numbers', () => {
    expect(getScreenType()).toBeGreaterThanOrEqual(1);
    expect(getScreenType()).toBeLessThan(5);
  });
});
