import { StyleSheet } from 'react-native';
import { configureFonts, DefaultTheme, DarkTheme } from 'react-native-paper';
import Colors from './constants/colors';

const fontConfig = {
    web: {
        regular: { fontFamily: 'iCielLudema-Regular' },
        medium: { fontFamily: 'iCielLudema-Regular' },
        light: { fontFamily: 'iCielLudema-Regular' },
        thin: { fontFamily: 'iCielLudema-Regular' },
        bold: { fontFamily: 'iCielLudema-Bold' },
    },
    ios: {
        regular: { fontFamily: 'iCielLudema-Regular' },
        medium: { fontFamily: 'iCielLudema-Regular' },
        light: { fontFamily: 'iCielLudema-Regular' },
        thin: { fontFamily: 'iCielLudema-Regular' },
        bold: { fontFamily: 'iCielLudema-Bold' },
    },
    android: {
        regular: { fontFamily: 'iCielLudema-Regular' },
        medium: { fontFamily: 'iCielLudema-Regular' },
        light: { fontFamily: 'iCielLudema-Regular' },
        thin: { fontFamily: 'iCielLudema-Regular' },
        bold: { fontFamily: 'iCielLudema-Bold' },
    }
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBar: {
        height: 60,
        position: 'absolute',
    },
    btn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 4,
        borderColor: Colors.white,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
    },
    linearGradient: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    text: {
        fontSize: 12,
        textAlign: 'center',
        color: Colors.secondary,
    },
});
const theme = {...DefaultTheme, fonts: configureFonts(fontConfig),};
const darkTheme = {...DarkTheme, fonts: configureFonts(fontConfig),}

export { fontConfig, styles, theme, darkTheme };