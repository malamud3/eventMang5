// OptionButton.tsx
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import {Ionicons} from "@expo/vector-icons";

interface OptionButtonProps {
    onPress?: () => void;
    iconName: string;
    text: string;
}

const OptionButton: React.FC<OptionButtonProps> = ({ onPress, iconName, text }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.optionContainer}>
                <Ionicons name={iconName as any} size={24} color="#333" style={styles.optionIcon} />
                <Text style={styles.optionText}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    optionContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    optionText: {
        fontSize: 16,
        color: "#333",
        marginRight: 10, // Add margin between text and icon
    },
    optionIcon: {
        marginRight: 10,
    },
});

export default OptionButton;
