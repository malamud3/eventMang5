import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

type EventInputProps = {
    value: string;
    onChangeText: (text: string) => void;
};

const EventInput: React.FC<EventInputProps> = ({ value, onChangeText }) => {
    return (
        <TextInput
            style={styles.input}
            placeholder="Enter Event Code"
            value={value}
            onChangeText={onChangeText}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#545050',
        borderRadius: 10,
        width: '100%',
        backgroundColor: '#ffffff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 20,
        elevation: 6, // Shadow on Android
        shadowColor: '#110606', // Shadow on iOS
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 5,
            height: 2,
        },
    },
});

export default EventInput;
