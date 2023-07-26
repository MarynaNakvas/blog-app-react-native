import { useEffect, useState } from 'react';
import * as Font from 'expo-font';

export default function bootstrap() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        async function loadResources() {
            try {
                await Font.loadAsync({
                    'open-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
                    'open-regular': require('../assets/fonts/OpenSans-Regular.ttf'),
                })
        
            } catch (error) {
                console.log('Error: ', error);
            } finally {
                setIsReady(true);
            }
        }

        loadResources();
    }, [])
    
    return isReady;
};
