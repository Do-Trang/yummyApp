import { StyleSheet } from 'react-native';
import Colors from "../../constants/colors";

const ChatStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: Colors.primary,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.7,
        shadowRadius: 3,
        elevation: 5,
    },
    headerText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    chatArea: {
        flexGrow: 1,
        padding: 10,
    },
    messageContainer: {
        marginVertical: 5,
        padding: 10,
        borderRadius: 15,
        maxWidth: '80%',
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: Colors.home1,
    },
    botMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#e5e5e5',
    },
    messageText: {
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: '#fff',
        position: 'absolute', // Keep it fixed
        bottom: 10, // Move above the navbar
        left: 0,
        right: 0,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        paddingHorizontal: 15,
        marginRight: 10,
    },
    sendButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    centerButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    backButton: {
        position: 'absolute',
        left: 10,
        top: '50%',
        transform: [{ translateY: -10 }],
        zIndex: 1,
    },
});

export default ChatStyles;
