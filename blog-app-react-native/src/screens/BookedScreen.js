import React from 'react';
import { useSelector } from 'react-redux';

import { PostList } from '../components/PostList';

export const BookedScreen = ({ navigation }) => {
    const openPostHandler = (post) => {
        navigation.navigate('Post', {
            postId: post.id,
            date: post.date,
            booked: post.booked,
        });
    }
    const bookedPosts = useSelector((state) => state.post.bookedPosts);

    return (
        <PostList data={bookedPosts} onOpen={openPostHandler} />
    )
}
