import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../../firebaseConfig';
import { THEME } from '../theme';
import { setUser } from '../store-redux/slices/post';

export const LoadingScreen = ({ navigation }) => { 
  const dispatch = useDispatch(); 

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({ uid: user.uid, name: user.displayName, email: user.email }));
        navigation.navigate('Main');
      } else {
        navigation.navigate('LogIn');
      }
    });
  }, [dispatch]);
 
    return (
        <View style={styles.container}>
            <ActivityIndicator color={THEME.MAIN_COLOR} size='large' />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
