import React, { useState } from 'react';
import { View, StyleSheet, Image, Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

async function askFoePermissions() {
    const { status } = await Permissions.askAsync(
        Permissions.CAMERA,
        Permissions.CAMERA_ROLL,
    );
    if (status !== 'granted') {
        Alert.alert('Error', 'You did not allow your camera to be used')
        return false;
    }
    return true;
}

export const PhotoPicker = ({}) => {
    const [image, setImage] = useState(null);

    const takePhoto = async () => {
        const hasPermissions = await askFoePermissions();

        if (hasPermissions) {
            return
        }

        const img = await ImagePicker.launchCameraAsync({
            quality: 0.7,
            allowsEditing: false,
            aspect: [16, 9],
        });
        console.log('img', img);
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
