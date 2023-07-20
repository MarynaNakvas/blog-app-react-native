import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity  } from 'react-native';
import auth from '@react-native-firebase/auth';

export const SignUpScreen = ({ navigation }) => {
    const initialState = {
        email: '',
        password: '',
        errorMessage: null,
    };
    const [user, setUser] = useState(initialState);

    const handleSignUp = () => {
        auth()
            .createUserWithEmailAndPassword(user.email, user.password)
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
                color="#e93766"
                onPress={handleSignUp}
            />
            <View>
                <Text>
                    Already have an account?
                    <Text
                        onPress={() => navigation.navigate('Login')}
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
