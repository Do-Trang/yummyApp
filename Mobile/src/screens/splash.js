import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import colors from '../constants/colors';
import GlobalStyle from '../styles/GlobalStyle';

function Splash({ navigation }) {
    React.useEffect(() => {
        setTimeout(() => {
             navigation.replace('LoginScreen');
//            navigation.replace('AnimTab1');
        }, 1000);
    }, []);

    return (
        <View style={styles.body}>
            <Image style={styles.logo} source={require('../../assets/app.png')}/>
            <Text style={[GlobalStyle.CustomFont, styles.text]}> AnChi </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
    },
    logo: {
        width: 100,
        height: 100,
        margin: 10
    },
    text: {
        fontSize: 56,
        color: colors.white,
    },
});

export default Splash;