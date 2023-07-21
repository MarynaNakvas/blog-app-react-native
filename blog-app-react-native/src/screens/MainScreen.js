import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { firebase } from '@react-native-firebase/auth';

import { PostList } from '../components/PostList';
import { fetchPosts } from '../store-redux/thunks/post';
import { THEME } from '../theme';

export const MainScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [currentUser, setCurrentUser] = useState(null);

    const openPostHandler = (post) => {
        navigation.navigate('Post', {
            id: post.id,
            date: post.date,
            booked: post.booked,
        });
    }

    const allPosts = useSelector((state) => state.post.allPosts);
    
    const loading = useSelector((state) => state.post.loading);

    // useEffect(() => {
    //     const { currentUser } = firebase.auth();
    //     setCurrentUser({ currentUser });
    // }, []);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator color={THEME.MAIN_COLOR} />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={{fontSize: 20}}>
                Hi
                <Text style={{color:'#e93766', fontSize: 20}}> 
                    {currentUser && currentUser.email}!
                </Text>
            </Text>
            <PostList data={allPosts} onOpen={openPostHandler} />
        </View>
    )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
