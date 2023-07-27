import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
} from 'react-native';

import { PostList } from '../components/PostList';
import { fetchPosts } from '../store-redux/thunks/post';
import { THEME } from '../theme';

export const MainScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const openPostHandler = (post) => {
    navigation.navigate('Post', {
      id: post.id,
      date: post.date,
      booked: post.booked,
    });
  };

  const allPosts = useSelector((state) => state.post.allPosts);

  const loading = useSelector((state) => state.post.loading);
  const user = useSelector((state) => state.post.user);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={THEME.MAIN_COLOR} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <Text style={{ fontSize: 20 }}>Hi</Text>
        <Text style={styles.text}>{!!user.name && user.name}!</Text>
      </View>
      <PostList data={allPosts} onOpen={openPostHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrapper: {
    flexDirection: 'row',
  },
  text: {
    color: THEME.MAIN_COLOR,
    fontSize: 20,
    marginLeft: 5,
  },
});
