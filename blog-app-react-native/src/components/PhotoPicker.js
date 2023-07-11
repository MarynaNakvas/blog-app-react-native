import React, { useState } from 'react';
import { View, StyleSheet, Image, Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

// function askForPermissions() {
//     const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
    
//     if (status !== 'granted') {
//         Alert.alert('Error', 'You did not allow your camera to be used')
//         return false;
//     }
//     return true;
// }

export const PhotoPicker = ({ onPick }) => {
    const [image, setImage] = useState(null);

    const takePhoto = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            quality: 0.7,
            allowsEditing: false,
            aspect: [16, 9],
        });

        if (!result.canceled) {
            imageUri = result.assets[0].uri;
            setImage(imageUri);
        }
        onPick(imageUri);
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
