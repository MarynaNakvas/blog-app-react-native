import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

import { PostList } from '../components/PostList';
import { loadPosts } from '../store/actions/post';
import { THEME } from '../theme';

export const MainScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const openPostHandler = (post) => {
        navigation.navigate('Post', {
            postId: post.id,
            date: post.date,
            booked: post.booked,
        });
    }

    const allPosts = useSelector((state) => state.post.allPosts);
    const loading = useSelector((state) => state.post.loading);

    useEffect(() => {
        dispatch(loadPosts());
    }, [dispatch]);

    if (loading) {
        return (
            <View style={StyleSheet.center}>
                <ActivityIndicator color={THEME.MAIN_COLOR} />
            </View>
        )
    }

    return (
        <PostList data={allPosts} onOpen={openPostHandler} />
    )
}

const style = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
