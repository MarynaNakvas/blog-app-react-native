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
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

import { auth, provider } from '../../firebaseConfig';
import { EMAIL_REGEXP, handleFBError } from '../utils/validation';
import { setError } from '../store-redux/slices/post';
import { THEME } from '../theme';
import { styles } from '../styles/logIn';

export const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.post.errors);

  const initialState = {
    name: '',
    email: '',
    password: '',
    errorMessage: null,
  };
  const [currentUser, setCurrentUser] = useState(initialState);

  const handleChangeName = (name) => {
    setCurrentUser((prevValue) => ({ ...prevValue, name }))
    if (!!name.length) {
      dispatch(setError({ nameError: null }))
    }
  }

  const handleChangeEmail = (email) => {
    setCurrentUser((prevValue) => ({ ...prevValue, email }))
    if (email) {
      if (!EMAIL_REGEXP.test(email)) {
        dispatch(setError({ emailError: 'Invalid e-mail' }))
      } else {
        dispatch(setError({ emailError: null }))
      }
    }
  }

  const handleChangePassword = (password) => {
    setCurrentUser((prevValue) => ({ ...prevValue, password }))
    if (password.length < 6) {
      dispatch(setError({ passwordError: 'Password contains at least 6 characters' }))
    } else {
      dispatch(setError({ passwordError: null }))
    }
  }

  const handleSignUp = () => {
    if (!currentUser.name) {
      dispatch(setError({ nameError: 'Required field' }))
    }
    if (!currentUser.email) {
      dispatch(setError({ emailError: 'Required field' }))
    }
    if (!currentUser.email) {
      dispatch(setError({ passwordError: 'Required field' }))
    }
    if (currentUser.email && currentUser.email && !errors.emailError && !errors.passwordError) {
      createUserWithEmailAndPassword(
        auth,
        currentUser.email,
        currentUser.password,
      )
        .then(({ user }) => {
          updateProfile(user, { displayName: currentUser.name });
        })
        .then(() => navigation.navigate('Main'))
        .catch((error) =>
          setCurrentUser((prevValue) => ({
            ...prevValue,
            errorMessage: handleFBError(error.message),
          })),
        );
    }
  };

  const handleSignUpWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        GoogleAuthProvider.credentialFromResult(result);
      })
      .catch((error) =>
        setCurrentUser((prevValue) => ({
          ...prevValue,
          errorMessage: handleFBError(error.message),
        })),
      );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Sign Up</Text>

      {currentUser.errorMessage && (
        <Text style={styles.textError}>
          {currentUser.errorMessage}
        </Text>
      )}

      <View style={styles.textInputWrapper}>
        <TextInput
          placeholder="Name"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={(name) => handleChangeName(name)}
          value={currentUser.name}
        />
        {errors.nameError && (
            <Text style={styles.textError}>{errors.nameError}</Text>
          )}
      </View>
      
      <View style={styles.textInputWrapper}>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={(email) => handleChangeEmail(email)}
          value={currentUser.email}
        />
        {errors.emailError && (
          <Text style={styles.textError}>{errors.emailError}</Text>
        )}
      </View>
      
      <View style={styles.textInputWrapper}>
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={(password) => handleChangePassword(password)}
          value={currentUser.password}
        />
        {errors.passwordError && (
          <Text style={styles.textError}>{errors.passwordError}</Text>
        )}
      </View>
      
      <View style={styles.buttons}>
        <Button
          title="Sign Up"
          color={THEME.MAIN_COLOR}
          onPress={handleSignUp}
        />
        {Platform.OS !== 'android' && (
          <View style={styles.signUpButton}>
            <Button
              title="Sign Up With Google"
              onPress={handleSignUpWithGoogle}
            />
          </View>
        )}
      </View>
      <View style={styles.textWrapper}>
        <Text>Already have an account?</Text>
        <Text
          onPress={() => navigation.navigate('LogIn')}
          style={styles.textLink}
        >
          Log In
        </Text>
      </View>
    </View>
  );
};
