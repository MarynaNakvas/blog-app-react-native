import React from 'react';

import { DATA } from '../data';
import { PostList } from '../components/PostList';

export const BookedScreen = ({ navigation }) => {
    const openPostHandler = (post) => {
        navigation.navigate('Post', {
            postId: post.id,
            date: post.date,
            booked: post.booked,
        });
    }
    const data = DATA.filter((post) => post.booked);

    return (
        <PostList data={data} onOpen={openPostHandler} />
    )
}
