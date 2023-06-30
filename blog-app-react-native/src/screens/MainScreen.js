import React from 'react';

import { DATA } from '../data';
import { PostList } from '../components/PostList';

export const MainScreen = ({ navigation }) => {
    const openPostHandler = (post) => {
        navigation.navigate('Post', {
            postId: post.id,
            date: post.date,
            booked: post.booked,
        });
    }

    return (
        <PostList data={DATA} onOpen={openPostHandler} />
    )
}
