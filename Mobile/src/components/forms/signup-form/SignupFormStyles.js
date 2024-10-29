import { StyleSheet } from 'react-native';
import colors from '../../../constants/colors';

const SignupFormStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
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
      marginTop: 60,
    },
    logo: {
      width: 100,
      height: 100,
    },
    text: {
      fontSize: 36,
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
      borderColor: colors.border,
      marginBottom: 15,
      paddingVertical: 5,
    },
    icon: {
      marginRight: 10,
      color: colors.icon,
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
      color: colors.icon,
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
    loginRedirect: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 15,
    },
    loginText: {
      color: colors.primary,
      fontWeight: 'bold',
    },
  });

  export default SignupFormStyles;
