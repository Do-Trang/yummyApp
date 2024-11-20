import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const PersonalCardStyles = StyleSheet.create({
    profileHeader: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    cover: {
        width: width,
        height: undefined,
        aspectRatio: 1,
        overflow: 'hidden',
        objectFit: 'contain'
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(246, 246, 246, 0.8)',
    },
    scrollContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        position: 'absolute',
        top: 200,
        left: 0,
        right: 0,
        bottom: 0,
        padding: 20,
         borderColor: 'red'
    },
    avatar: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    avatarContainer: {
        position: 'absolute',
        width: 100, 
        height: 100,
        top: 150,
        borderRadius: 50,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#fff',
        alignSelf: 'center',
        zIndex: 2,
        marginLeft: -50,
    },
    textContainer: {
        marginTop: 70,
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    account: {
        fontSize: 16,
        color: '#777',
    },
    scrollContent: {
        width: '100%',
        marginTop: 50,
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
});

export default PersonalCardStyles;