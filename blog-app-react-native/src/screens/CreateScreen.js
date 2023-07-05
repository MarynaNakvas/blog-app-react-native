import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ScrollView, View, Text, StyleSheet, TextInput, Image, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { THEME } from '../theme';
import { addPost } from '../store/actions/post';
import { PhotoPicker } from '../components/PhotoPicker';

export const CreateScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const [text, setText] = useState('');

    const img = 'https://www.seehratimes.com/wp-content/uploads/2021/07/272728-2118x1412-summer-flowers-768x512.jpg';

    const saveHandler = () => {
        const post = {
            img,
            text,
            date: new Date().toJSON(),
            booked: false,
        }
        dispatch(addPost(post));
        navigation.navigate('Main');
    };

    return (
        <ScrollView>
            <TouchableWithoutFeedback
                onPress={() => Keyboard.dismiss()}
            >
                <View style={styles.wrapper}>
                    <Text style={styles.title}>Create a new post</Text>
                    <TextInput
                        style={styles.textArea}
                        placeholder='Enter post text'
                        value={text}
                        onChangeText={setText}
                        multiline
                    />
                    <PhotoPicker />
                    <Button
                        title='Create post'
                        color={THEME.MAIN_COLOR}
                        onPress={saveHandler}
                    />
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'open-regular',
        marginVertical: 10,
    },
    textArea: {
        padding: 10,
        marginBottom: 10,
    }
})
