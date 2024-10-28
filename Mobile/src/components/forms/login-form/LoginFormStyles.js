import { StyleSheet } from "react-native";
import colors from "../../../constants/colors";

export default StyleSheet.create({
  // container: {
  //     flex: 1,
  //     backgroundColor: colors.white,
  // },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  svg: {
    position: "absolute",
    top: 0,
  },
  centerContent: {
    position: "absolute",
    top: 80, // Adjust to center within the curve
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  halfCircle: {
    height: 350,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  logo: {
    width: 100,
    height: 100,
    margin: 10,
  },
  text: {
    fontSize: 56,
    color: colors.white,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  loginText: {
    fontSize: 24,
    marginVertical: 20,
  },
  accountContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  accountLabel: {
    fontSize: 16,
    color: colors.black,
    marginRight: 10,
  },
  accountIcon: {
    color: colors.black,
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  passwordLabel: {
    fontSize: 16,
    color: Colors.black,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    color: Colors.white,
  },
  toggleIconContainer: {
    marginLeft: 10,
  },
  toggleIcon: {
    color: Colors.black,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  loginButton: {
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
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginVertical: 10,
  },

  forgotPasswordText: {
    color: colors.primary,
    fontSize: 16,
  },
  accountContainer1: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },

  signUpText: {
    color: colors.primary,
    fontWeight: "bold",
  },
});
