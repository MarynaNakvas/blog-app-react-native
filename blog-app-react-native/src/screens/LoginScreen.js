import React, { useState } from 'react';
import { Text, TextInput, View, Button, Platform } from 'react-native';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

import { auth, provider } from '../../firebaseConfig';
import { THEME } from '../theme';
import { styles } from '../styles/logIn';

export const LogInScreen = ({ navigation }) => {
    const initialState = {
        email: '',
        password: '',
        errorMessage: null,
    };
    const [user, setUser] = useState(initialState);

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, user.email, user.password)
        .then(() => navigation.navigate('Main'))
        .catch((error) => setUser((prevValue) => ({ ...prevValue, errorMessage: error.message })))
    };

    const handleLogInWithGoogle = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            GoogleAuthProvider.credentialFromResult(result);
        })
        .catch((error) => setUser((prevValue) => ({ ...prevValue, errorMessage: error.message })))
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>Login</Text>
            {user.errorMessage &&
                <Text style={styles.textError}>
                    {user.errorMessage}
                </Text>
            }
            <TextInput
                style={styles.textInput}
                autoCapitalize='none'
                placeholder='Email'
                onChangeText={(email) => setUser((prevValue) => ({ ...prevValue, email }))}
                value={user.email}
            />
            <TextInput
                style={styles.textInput}
                secureTextEntry
                autoCapitalize='none'
                placeholder='Password'
                onChangeText={(password) => setUser((prevValue) => ({ ...prevValue, password }))}
                value={user.password}
            />
            <View style={styles.buttons}>
                <Button title='Log In' color={THEME.MAIN_COLOR} onPress={handleLogin} />
                {Platform.OS !== 'android' && (
                    <View style={styles.signUpButton}>
                        <Button
                            title='Log In With Google'
                            onPress={handleLogInWithGoogle}
                        />
                    </View>
                )}
            </View>
            <View style={styles.textWrapper}>
                <Text>Don't have an account?</Text>
                <Text
                    style={styles.textLink}
                    onPress={() => navigation.navigate('SignUp')}
                >
                    Sign Up
                </Text>
            </View>
        </View>
    )
}
