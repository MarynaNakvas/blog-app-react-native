import React, { useState } from 'react';
import {
  Text,
  TextInput,
  View,
  Button,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

import { auth, provider } from '../../firebaseConfig';
import { EMAIL_REGEXP, handleFBError } from '../utils/validation';
import { setError } from '../store-redux/slices/post';
import { THEME } from '../theme';
import { styles } from '../styles/logIn';

export const LogInScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.post.errors);

  const initialState = {
    email: '',
    password: '',
    errorMessage: null,
  };
  const [user, setUser] = useState(initialState);

  const handleChangeEmail = (email) => {
    setUser((prevValue) => ({ ...prevValue, email }))
    if (email) {
      if (!EMAIL_REGEXP.test(email)) {
        dispatch(setError({ emailError: 'Invalid e-mail' }))
      } else {
        dispatch(setError({ emailError: null }))
      }
    }
  }

  const handleChangePassword = (password) => {
    setUser((prevValue) => ({ ...prevValue, password }))
    if (password.length < 6) {
      dispatch(setError({ passwordError: 'Password contains at least 6 characters' }))
    } else {
      dispatch(setError({ passwordError: null }))
    }
  }

  const handleLogin = () => {
    if (!user.email) {
      dispatch(setError({ emailError: 'Required field' }))
    }
    if (!user.email) {
      dispatch(setError({ passwordError: 'Required field' }))
    }
    if (user.email && user.email && !errors.emailError && !errors.passwordError) {
      signInWithEmailAndPassword(auth, user.email, user.password)
      .then(() => navigation.navigate('Main'))
      .catch((error) =>
        setUser((prevValue) => ({
          ...prevValue,
          errorMessage: handleFBError(error.message),
        })),
      );
    }
  };

  const handleLogInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        GoogleAuthProvider.credentialFromResult(result);
      })
      .catch((error) =>
        setUser((prevValue) => ({
          ...prevValue,
          errorMessage: handleFBError(error.message),
        })),
      );
  };

  return (
    <View style={styles.container}>
      <Text id="root" style={styles.textTitle}>
        Log In
      </Text>
      {user.errorMessage && (
        <Text style={styles.textError}>{user.errorMessage}</Text>
      )}

      <View style={styles.textInputWrapper}>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={(email) => handleChangeEmail(email)}
          value={user.email}
        />
        {errors.emailError && (
          <Text style={styles.textError}>{errors.emailError}</Text>
        )}
      </View>
      
      <View style={styles.textInputWrapper}>
        <TextInput
          style={styles.textInput}
          secureTextEntry
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={(password) => handleChangePassword(password)}
          value={user.password}
        />
        {errors.passwordError && (
          <Text style={styles.textError}>{errors.passwordError}</Text>
        )}
      </View>

      <View style={styles.buttons}>
        <Button
          title="Log In"
          color={THEME.MAIN_COLOR}
          onPress={handleLogin}
        />
        {Platform.OS !== 'android' && (
          <View style={styles.signUpButton}>
            <Button
              title="Log In With Google"
              onPress={handleLogInWithGoogle}
            />
          </View>
        )}
      </View>
      <View style={styles.textWrapper}>
        <Text>Do not have an account?</Text>
        <Text
          style={styles.textLink}
          onPress={() => navigation.navigate('SignUp')}
        >
          Sign Up
        </Text>
      </View>
    </View>
  );
};
