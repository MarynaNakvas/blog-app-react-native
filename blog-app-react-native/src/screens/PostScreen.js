import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, Image, Button, ScrollView, Alert } from 'react-native';

import { THEME } from '../theme';
import { removePost } from '../store-redux/thunks/post';

export const PostScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();

    const { id } = route.params;
    const post = useSelector((state) => state.post.allPosts.find((post) => post.id === id));

    const removeHandler = () => {
        Alert.alert(
            'Remove post',
            'Do you want to remove the post?',
            [
                {
                text: 'Cancel',
                style: 'cancel',
                },
                {
                text: 'Remove',
                style: 'destructive',
                onPress: () => {
                    navigation.navigate('Main')
                    dispatch(removePost(id))
                },
                },
            ],
            {
                cancelable: false,
            },
        );
    }

    if (!post) {
        return null;
    }

    return (
        <ScrollView>
            <Image source={{uri: post.img}} style={styles.image} />
            <View style={styles.textWrapper}>
                <Text style={styles.title}>{post.text}</Text>
            </View>
            <Button title='Remove' color={THEME.DANGER_COLOR} onPress={removeHandler} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200,
    },
    textWrapper: {
        padding: 10,
    },
    title: {
        fontFamily: 'open-regular',
    }
})
