const { randomString } = require('./random-string');

describe('Test randomString util', () => {
  it('should success generate', () => {
    const result = randomString(10, 'hex');
    expect(result.length).toBe(10);
    expect(/^[a-zA-Z0-9]*$/g.test(result)).toBeTruthy();
  });
});
