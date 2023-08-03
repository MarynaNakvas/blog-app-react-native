import React from 'react';
import renderer from 'react-test-renderer';

import { Post } from '../src/components/Post';

test('Post renders correctly', () => {
   const post = {
      id: '-N_oQZZWRNOe1JBrE1sx',
      date: '2023-07-20T17:52:10.992Z',
      text: 'Normal text',
      img: 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540marynanakvas%252Fblog-app-react-native/ImagePicker/3758d3f5-1b83-45ca-b709-b8ef528b04b0.jpeg',
      booked: true, 
   };

   const tree = renderer.create(<Post post={post} onOpen={() => null} />).toJSON();

   expect(tree).toMatchSnapshot();
 });
