import React from 'react';
import renderer from 'react-test-renderer';

import { AboutScreen } from '../src/screens/AboutScreen';

describe('AboutScreen Test', () => {
    it('AboutScreen has 2 children', () => {
      const tree = renderer.create(<AboutScreen />).toJSON();
      expect(tree.children.length).toBe(2);
    });
  });
  