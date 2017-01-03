import Boe from './Boe.ts';


it('in without crashing', () => {
  const boe = new Boe(2,4);
  expect(boe.closingPrice).toBe(2);
  expect(boe.numberOfShares).toBe(4);
  expect(boe.marketCap).toBe(8);
});
