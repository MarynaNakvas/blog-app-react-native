import React, { useState } from 'react';
import {
  Text,
  TextInput,
  View,
  Button,
  Platform,
} from 'react-native';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

import { auth, provider } from '../../firebaseConfig';
import { THEME } from '../theme';
import { styles } from '../styles/logIn';

export const SignUpScreen = ({ navigation }) => {
  const initialState = {
    name: '',
    email: '',
    password: '',
    errorMessage: null,
  };
  const [currentUser, setCurrentUser] = useState(initialState);

  const handleSignUp = () => {
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
          errorMessage: error.message,
        })),
      );
  };

  const handleSignUpWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        GoogleAuthProvider.credentialFromResult(result);
      })
      .catch((error) =>
        setCurrentUser((prevValue) => ({
          ...prevValue,
          errorMessage: error.message,
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

      <TextInput
        placeholder="Name"
        autoCapitalize="none"
        style={styles.textInput}
        onChangeText={(name) =>
          setCurrentUser((prevValue) => ({ ...prevValue, name }))
        }
        value={currentUser.name}
      />
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        style={styles.textInput}
        onChangeText={(email) =>
          setCurrentUser((prevValue) => ({ ...prevValue, email }))
        }
        value={currentUser.email}
      />
      <TextInput
        secureTextEntry
        placeholder="Password"
        autoCapitalize="none"
        style={styles.textInput}
        onChangeText={(password) =>
          setCurrentUser((prevValue) => ({ ...prevValue, password }))
        }
        value={currentUser.password}
      />
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
