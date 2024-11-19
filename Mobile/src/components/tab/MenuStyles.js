import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        paddingTop: 20,
    },
    scrollView: {
        paddingVertical: 5,
        borderBottomWidth: 1.5,
        borderBottomColor: '#E6E6E6',
    },
    scrollViewContent: {
        paddingHorizontal: 5,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    username: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 5,
        marginTop: 1,
    },
    backButton: {
        marginLeft: 1,
    },
    button: {
        marginHorizontal: 5,
        paddingBottomVertical: 10,
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 14,
        color: 'gray',
        fontWeight: '700'
    },
    selectedButtonText: {
        color: 'purple',
    },
});

export default styles;