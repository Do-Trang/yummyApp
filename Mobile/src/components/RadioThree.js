import * as React from 'react';
import { View } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';
import colors from '../constants/colors';
import {
    StyleSheet,
} from 'react-native';

const RadioThree = (props) => {
    return (
        <View style={props.style} >
            <RadioButton.Group
                onValueChange={newValue => props.setChecked(newValue)} value={props.checked}>
                <View style={[styles.row]}>
                    <View style={[styles.row]}>
                        <Text>❔</Text>
                        <RadioButton value={1} color={colors.primary} />
                    </View>
                    <View style={[styles.row]}>
                        <Text>✅</Text>
                        <RadioButton value={2} color={colors.primary} />
                    </View>
                    <View style={[styles.row]}>
                        <Text>❌</Text>
                        <RadioButton value={3} color={colors.primary} />
                    </View>
                </View>
            </RadioButton.Group>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default RadioThree;