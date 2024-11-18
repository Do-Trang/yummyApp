import {
    StyleSheet,
    Text,
    View,
    TextInput,
} from 'react-native'
import React from 'react'
import GlobalStyle from '../styles/GlobalStyle';
import colors from '../constants/colors';

const CustomTextInput = (props) => {
    return (
        <TextInput
            {...props}
            // editable={props.editable}
            style={[GlobalStyle.CustomFont, styles.textinput, props.style]}
            value={props.content}
            autoComplete={props.autoComplete}
            secureTextEntry={props.secureTextEntry}
        />
    )
}

export default CustomTextInput;

const styles = StyleSheet.create({
    textinput: {
        borderBottomWidth: 1,
        borderBottomColor: colors.primary,
        // paddingHorizontal: 16,
        width: '90%',
        color: colors.black,
    }
})