import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';

export const LoadingScreen = ({ navigation }) => {   
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged((user) => {
            navigation.navigate(user ? 'Main' : 'SignUp')
          });
        return subscriber;
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Loading
            </Text>
            <ActivityIndicator color='#e93766' size="large" />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color:'#e93766',
    fontSize: 40,
  }
})
