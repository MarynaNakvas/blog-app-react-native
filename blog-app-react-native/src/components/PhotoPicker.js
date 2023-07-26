import React from 'react';
import { View, StyleSheet, Image, Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export const PhotoPicker = ({ image, setImage, onPick }) => {
    const takePhoto = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert("You've refused to allow this app to access your camera!");
            return;
          }
        const result = await ImagePicker.launchCameraAsync({
            quality: 0.7,
            allowsEditing: false,
            aspect: [16, 9],
        });

        if (!result.canceled) {
            const img = result.assets[0].uri;
            setImage(img);
            onPick(img);
        }
    };

    return (
        <View style={styles.wrapper}>
            <Button
                title='Take photo'
                onPress={takePhoto}
            />
            {image && (
                <Image
                    style={styles.image}
                    source={{uri: image}}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: 200,
        marginTop: 10,
    }
})
