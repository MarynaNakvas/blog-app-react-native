import { createAsyncThunk } from '@reduxjs/toolkit';
import * as FileSystem from 'expo-file-system';

export const fetchPosts = createAsyncThunk('post/fetchPosts', async () => {
    try {
        const response = await fetch(
            'https://blog-app-react-native-default-rtdb.firebaseio.com/posts.json',
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
              }
            );
            const data = await response.json();
            const posts = Object.keys(data).map((key) => ({ ...data[key], id: key }));
            return posts;
        } catch (error) {
            console.log('Error: ', error);
        }
});

export const addPost = createAsyncThunk('post/addPost', async (post) => {
    const fileName = post.img.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;
    const payload = {...post, img: newPath};
        try {
            const data = await fetch(
                'https://blog-app-react-native-default-rtdb.firebaseio.com/posts.json',
                {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
                }
            );
            return {...payload, id: data.name};
        } catch (error) {
            console.log('Error: ', error);
        }
        }
);

export const removePost = createAsyncThunk('post/removePost', async (id) => {
    try {
        await fetch(
            `https://blog-app-react-native-default-rtdb.firebaseio.com/posts/${id}.json`,
            {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            }
        );
        return id;
    } catch (error) {
        console.log('Error: ', error);
    }
    }
);

export const toggleBooked = createAsyncThunk('post/toggleBooked', async (post) => {
    try {
        await fetch(
            `https://blog-app-react-native-default-rtdb.firebaseio.com/posts/${post.id}.json`,
            {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...post, booked: !post.booked}),
            }
        );
        return post.id;
    } catch (error) {
        console.log('Error: ', error);
    }
    }
);
