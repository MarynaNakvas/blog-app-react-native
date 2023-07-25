import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button  } from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import { auth } from '../../firebaseConfig';
import { THEME } from '../theme';

export const SignUpScreen = ({ navigation }) => {
    const initialState = {
        name: '',
        email: '',
        password: '',
        errorMessage: null,
    };
    const [user, setUser] = useState(initialState);

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, user.email, user.password)
        .then(({ user }) => {
            updateProfile(user, { displayName: user.name });
          })
        .then(() => navigation.navigate('Main'))
        .catch((error) => setUser((prevValue) => ({ ...prevValue, errorMessage: error.message })))
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>Sign Up</Text>

            {user.errorMessage &&
                <Text style={styles.textError}>
                    {user.errorMessage}
                </Text>
            }

            <TextInput
                placeholder='Name'
                autoCapitalize='none'
                style={styles.textInput}
                onChangeText={(name) => setUser((prevValue) => ({ ...prevValue, name }))}
                value={user.name}
            />
            <TextInput
                placeholder='Email'
                autoCapitalize='none'
                style={styles.textInput}
                onChangeText={(email) => setUser((prevValue) => ({ ...prevValue, email }))}
                value={user.email}
            />
            <TextInput
                secureTextEntry
                placeholder='Password'
                autoCapitalize='none'
                style={styles.textInput}
                onChangeText={(password) => setUser((prevValue) => ({ ...prevValue, password }))}
                value={user.password}
            />
            <Button
                title='Sign Up'
                color={THEME.MAIN_COLOR}
                onPress={handleSignUp}
            />
            <View>
                <Text>
                    Already have an account?
                    <Text
                        onPress={() => navigation.navigate('LogIn')}
                        style={styles.textLink}
                    >
                        Login
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
        fontSize:20,
        width: '90%',
        borderColor: '#9b9b9b',
        borderBottomWidth: 1,
        marginTop: 8,
        marginVertical: 15,
    },
    textTitle: {
        color: THEME.MAIN_COLOR,
        fontSize: 40,
    },
    textError: {
        color: THEME.DANGER_COLOR,
    },
    textLink: {
        color: THEME.MAIN_COLOR,
        fontSize: 18,
    },
})
