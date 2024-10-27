import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Keyboard = ({ onNumberPress, onClear, onDelete }) => {
    const numbers = [
        1, 2, 3,
        4, 5, 6,
        7, 8, 9,
        'Clear', 0, 'Delete'
    ];

    return (
        <View>
            {numbers.map((item, index) => (
                <TouchableOpacity 
                    key={index}
                    onPress={() => {
                        if (item === 'Clear') {
                            onClear();
                        } else if (item === 'Delete') {
                            onDelete();
                        } else {
                            onNumberPress(item);
                        }
                    }}
                >
                    <Text>{item}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default Keyboard;
