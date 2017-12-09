import filters from './index';

describe('Filters', () => {
  it('should capitalize all words in a string', () => {
    expect(filters.capitalizeAll('javier ortiz saorin')).toBe('Javier Ortiz Saorin');
  });
});
