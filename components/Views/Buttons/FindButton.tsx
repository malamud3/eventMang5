import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type FindButtonProps = {
    onPress: () => void;
};

const FindButton: React.FC<FindButtonProps> = ({ onPress }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Find</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
        elevation: 7, // Shadow on Android
        shadowColor: '#110606', // Shadow on iOS
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 5,
            height: 2,
        },
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default FindButton;
