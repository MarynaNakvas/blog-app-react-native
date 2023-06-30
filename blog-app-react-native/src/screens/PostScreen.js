import React from 'react';
import { View, Text, StyleSheet, Image, Button, ScrollView, Alert } from 'react-native';

import { THEME } from '../theme';
import { DATA } from '../data';

export const PostScreen = ({ route }) => {
    const { postId } = route.params;
    const post = DATA.find((post) => post.id === postId);

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
                onPress: () => {},
                },
            ],
            {
                cancelable: false,
            },
        );
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
