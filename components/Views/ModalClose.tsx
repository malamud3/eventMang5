import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type ModalHeaderProps = {
    onClose: () => void;
};

const ModalClose: React.FC<ModalHeaderProps> = ({ onClose }) => (
    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>✕</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
    },
    closeButtonText: {
        fontSize: 24,
        color: '#007AFF',
    },
});

export default ModalClose;
