import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';

interface WebViewModalProps {
    isVisible: boolean;
    onClose: () => void;
    url: string; // Add URL prop
}

const WebViewModal: React.FC<WebViewModalProps> = ({ isVisible, onClose, url }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <WebView
                        source={{ uri: url }}
                        style={styles.webView}
                        onError={(syntheticEvent) => {
                            const { nativeEvent } = syntheticEvent;
                            console.warn('WebView error: ', nativeEvent);
                        }}
                    />
                    <TouchableOpacity onPress={onClose}>
                        <Text style={styles.closeButton}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

// Define styles
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        margin: 80
    },
    webView: {
        flex: 1,
        padding: 170,

    },
    closeButton: {
        marginTop: 15,
        textAlign: "center",
        color: '#0078D4',
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default WebViewModal;
