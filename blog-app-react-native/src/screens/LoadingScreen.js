import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

export const LoadingScreen = ({ navigation }) => {   
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
