import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../../firebaseConfig';

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
            <Button title='Login' color="#e93766" onPress={handleLogin} />
            <View>
                <Text>
                    Don't have an account?
                    <Text
                        onPress={() => navigation.navigate('SignUp')}
                        style={styles.textLink}
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
        fontSize:20,
        width: '90%',
        borderColor: '#9b9b9b',
        borderBottomWidth: 1,
        marginTop: 8,
        marginVertical: 15,
    },
    textTitle: {
        color:'#e93766',
        fontSize: 40,
    },
    textError: {
        color: 'red',
    },
    textLink: {
        color:'#e93766',
        fontSize: 18,
    },
})