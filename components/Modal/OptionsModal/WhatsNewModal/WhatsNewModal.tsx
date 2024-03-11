import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

interface Props {
    isVisible: boolean;
    onClose: () => void;
}

const WhatsNewModal: React.FC<Props> = ({ isVisible, onClose }) => {
    return (
        <Modal visible={isVisible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>What's New</Text>
                    <Text style={styles.newFeature}>- Event will support to manage need logistic to the event</Text>
                    <Text style={styles.newFeature}>- User can invite from friend list</Text>
                    <Text style={styles.newFeature}>- More event types</Text>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    newFeature: {
        fontSize: 16,
        marginBottom: 5,
    },
    closeButton: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 20,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default WhatsNewModal;
