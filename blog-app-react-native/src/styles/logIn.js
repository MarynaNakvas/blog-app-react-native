import { StyleSheet } from 'react-native';

import { THEME } from '../theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        height: 40,
        fontSize: 18,
        width: '90%',
        borderColor: THEME.MAIN_COLOR,
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
    textWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textLink: {
        color: THEME.MAIN_COLOR,
        fontSize: 18,
        marginLeft: 10,
    },
    buttons: {
        width: '90%',
        paddingVertical: 15,
    },
    signUpButton: {
        marginTop: 10,
    },
})
