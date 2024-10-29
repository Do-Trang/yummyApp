import { StyleSheet } from 'react-native';
import colors from '../../../constants/colors';

const RecoveryFormStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 16,
        backgroundColor: colors.white,
    },
    image: {
        width: 250,
        height: 250,
        marginVertical: 16, 
    },
    notificationText: {
        textAlign: 'center',
        marginBottom: 8,
    },
    instructionText: {
        textAlign: 'center',
        marginBottom: 16,
    },
    label: {
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly', 
        marginVertical: 18,
    },
    otpInput: {
        width: 50, 
        height: 50,
        borderBottomWidth: 2,
        borderColor: colors.primary,
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 18,
    },
    timerText: {
        marginVertical: 8,
    },
    submitButton: {
        backgroundColor: colors.primary,
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: "80%",
        alignItems: "center",
    },
    submitButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    resendText: {
        textAlign: 'center',
        marginTop: 8,
        color: colors.primary,
    },
  });

  export default RecoveryFormStyles;
