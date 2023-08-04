import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import { THEME } from '../theme';
import { addPost } from '../store-redux/thunks/post';
import { PhotoPicker } from '../components/PhotoPicker';

export const CreateScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const imgRef = useRef();

  const saveHandler = () => {
    const post = {
      img: imgRef.current,
      text,
      date: new Date().toJSON(),
      booked: false,
    };
    dispatch(addPost(post));
    navigation.navigate('Main');

    setText('');
    setImage(null);
  };

  const photoPickHandler = (uri) => {
    imgRef.current = uri;
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Create a new post</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Enter post text"
            value={text}
            onChangeText={setText}
            multiline
          />
          <PhotoPicker
            image={image}
            setImage={setImage}
            onPick={photoPickHandler}
          />
          <Button
            title="Create post"
            color={THEME.MAIN_COLOR}
            onPress={saveHandler}
            disabled={!text}
          />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

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
  },
});
