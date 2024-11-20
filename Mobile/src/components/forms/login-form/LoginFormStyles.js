import { StyleSheet } from "react-native";
import Colors from "../../../constants/colors";

export default StyleSheet.create({
    container: {
        justifyContent: "center",
        flexDirection: "column",
    },

    introContainer: {
        flex: 1,
        justifyContent: "center",
        marginBottom: 20
    },
    svg: {
        position: "absolute",
        top: 0,
    },

    centerContent: {
        position: "absolute",
        top: 40,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    logo: {
        width: 80,
        height: 80,
    },
    text: {
        fontSize: 30,
        color: Colors.white,
        marginTop: 10,
    },

    loginText: {
        textAlign: 'center',
        fontSize: 35,
        marginBottom: 5,
        marginTop: 180,
        color: Colors.black,
        fontFamily: 'Arial',
        fontWeight: 'bold',
    },

    formContainer: {
        paddingHorizontal: 20,
    },

    accountContainer: {
        flexDirection: "column",
        alignItems: "flex-start",
        marginVertical: 10,
    },
    accountLabel: {
        fontSize: 16,
        color: Colors.black,
        marginBottom: 5,
    },
    accountIcon: {
        position: 'absolute',
        left: 10,
        color: Colors.gray,
    },
    textInput: {
        width: '100%',
        color: Colors.black,
        borderWidth: 1,
        borderRadius: 15,
        height: 50,
        paddingRight: 40,
        paddingLeft: 40,
        borderColor: Colors.black,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
    },

    passwordContainer: {
        flexDirection: "column",
        alignItems: "flex-start",
        marginTop: 10,
    },
    passwordInput: {
        flex: 1,
        color: Colors.black,
        borderWidth: 1,
        borderRadius: 15,
        width:300,
        height:50,
        paddingRight: 40,
        paddingLeft: 40,
    },
    passwordLabel: {
        fontSize: 16,
        color: Colors.black,
        marginBottom: 10,
    },
    lockIcon: {
        position: 'absolute',
        left: 10,
        color: Colors.gray,
    },
    toggleIconContainer: {
        position: 'absolute',
        right: 10,
        padding: 5,
    },
    toggleIcon: {
        color: Colors.black,
    },

    forgotPasswordButton: {
        alignSelf: "flex-end",
        marginVertical: 1,
    },
    
    forgotPasswordText: {
        color: Colors.primary,
        fontSize: 16,
    },

    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        marginRight: 5,
    },
    rememberMeText: {
        marginLeft: 5,
    },

    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 20,
    },
    loginButton: {
        backgroundColor: Colors.primary,
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: "80%",
        alignItems: "center",
    },
    buttonText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: "bold",
    },
  

    signupView: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
    },

    signUpText: {
        color: Colors.primary,
        fontWeight: "bold",
    },
});
