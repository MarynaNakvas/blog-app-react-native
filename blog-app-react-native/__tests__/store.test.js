import { store } from '../src/store-redux/index';

describe('Store Test', () => {
   test('Store has method getState()', () => {
      expect(store.getState()).not.toBe(undefined);
   });
   
   test('Store has object with posts', () => {
      expect(store.getState()).toHaveProperty('post');
   });
})
