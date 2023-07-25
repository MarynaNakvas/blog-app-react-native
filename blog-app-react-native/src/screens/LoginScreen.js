import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../../firebaseConfig';
import { THEME } from '../theme';

export const LoginScreen = ({ navigation }) => {
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
                secureTextEntry
                style={styles.textInput}
                autoCapitalize='none'
                placeholder='Password'
                onChangeText={(password) => setUser((prevValue) => ({ ...prevValue, password }))}
                value={user.password}
            />
            <Button title='Login' color={THEME.MAIN_COLOR} onPress={handleLogin} />
            <View style={styles.textLinkWrapper}>
                <Text>
                    Don't have an account?
                    <Text
                        style={styles.textLink}
                        onPress={() => navigation.navigate('SignUp')}
                    >
                        Sign Up
                    </Text>
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        height: 40,
        fontSize: 18,
        width: '90%',
        borderColor: '#9b9b9b',
        borderBottomWidth: 1,
        marginTop: 8,
        marginVertical: 15,
    },
    textTitle: {
        color: THEME.MAIN_COLOR,
        fontSize: 30,
    },
    textError: {
        color: THEME.DANGER_COLOR,
    },
    textLinkWrapper: {
        margin: 20,
    },
    textLink: {
        color: THEME.MAIN_COLOR,
        fontSize: 18,
    },
})
