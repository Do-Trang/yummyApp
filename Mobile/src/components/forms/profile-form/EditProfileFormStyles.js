import {StyleSheet} from 'react-native';
import Colors from "../../../constants/colors";

const profileFormStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollContainer: {
        paddingBottom: 50,
        paddingHorizontal: 10,
        flexGrow: 1,
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 110,
        borderWidth: 2,
        borderColor: '#ddd',
        marginBottom: 5,
    },
    editAvatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    uploadButton: {
        paddingHorizontal: 5,
        borderRadius: 5,
    },
    uploadButtonText: {
        color:"#007BFF"
    },
    icon: {
        position: "absolute",
        left: 10,
        color: "gray",
        top: 8
    },
    inputContainer: {
        position: "relative",
        width: "100%",
        justifyContent: "center",
    },
    label: {
        fontSize: 16,
        marginVertical: 5,
        color: Colors.black,
    },
    input: {
        height: 40,
        borderColor: Colors.gray,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: Colors.white,
        paddingLeft: 40,
        paddingRight: 10,
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    radioGroupContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: -5,
        marginBottom: 20
    },
    calendar: {
        position: 'absolute',
        right: 10,
        top: 5
    },
    date: {
        color: Colors.black,
        paddingLeft: 30
    },
    datePickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ddd',
        borderWidth: 1,
        backgroundColor: Colors.white,
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
    },
    genderIcon: {
        marginLeft: 8,
        marginRight: 4,
    },
    textArea: {
        borderColor: Colors.gray,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        minHeight: 60,      
        textAlignVertical: 'top',
    },
});

export default profileFormStyles;