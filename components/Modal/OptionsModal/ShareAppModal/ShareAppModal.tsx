import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Share } from 'react-native';

interface ShareAppModalProps {
    isVisible: boolean;
    onClose: () => void;
    shareMessage?: string;
}
const ShareAppModal: React.FC<ShareAppModalProps> = ({ isVisible, onClose, shareMessage }) => {

    const handleShareApp = async () => {
        try {
            const shareOptions = {
                title: 'Share via',
                message: shareMessage || 'Check out this cool app!',
                //url: 'https://google.com', // URL of the app to be shared
            };
            await Share.share(shareOptions);
        } catch (error) {
            console.log('Error sharing:', error.message);
        }
    };
    return (
        <Modal visible={isVisible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Share the App</Text>
                    <Text style={styles.modalText}>Share our app with your friends and family on social networks.</Text>
                    <TouchableOpacity onPress={handleShareApp} style={styles.shareButton}>
                        <Text style={styles.shareButtonText}>Share Now</Text>
                    </TouchableOpacity>
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
        fontSize: 18,
        marginBottom: 10,
    },
    modalText: {
        marginBottom: 20,
        textAlign: 'center',
    },
    shareButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    shareButtonText: {
        color: 'white',
        textAlign: 'center',
    },
    closeButton: {
        marginTop: 10,
    },
    closeButtonText: {
        color: 'blue',
        textAlign: 'center',
    },
});

export default ShareAppModal;
