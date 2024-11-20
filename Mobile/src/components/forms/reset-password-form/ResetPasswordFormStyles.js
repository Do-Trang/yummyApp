import { StyleSheet } from 'react-native';
import colors from '../../../constants/colors';

const ResetPasswordStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    header: {
        position: 'relative',
    },
    svg: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    centerContent: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    logo: {
        width: 80,
        height: 80,
    },
    text: {
        fontSize: 30,
        color: colors.white,
        marginTop: 10,
    },
    formContainer: {
        marginHorizontal: 20,
        marginTop: 40,
    },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        marginBottom: 5,
        paddingVertical: 5,
    },
    icon: {
        marginRight: 10,
        color: colors.gray,
    },
    textInput: {
        flex: 1,
        height: 40,
        fontSize: 16, 
    },
    toggleIconContainer: {
        marginLeft: 10,
    },
    toggleIcon: {
        color: colors.black,
    },
    buttonContainer: {
        alignItems: 'center', 
        marginTop: 20,
    },
    submitButton: {
        backgroundColor: colors.primary,
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: "80%",
        alignItems: "center",
    },
    buttonText: {
        color: colors.white,
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default ResetPasswordStyles;