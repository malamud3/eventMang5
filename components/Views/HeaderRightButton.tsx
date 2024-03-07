import React, { useState } from 'react';
import { TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import OptionsModal from "../Modal/OptionsModal/OptionsModal";
import WebViewModal from "../WebViewModal";

const HeaderRightButton: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [isOptionsModalVisible, setOptionsModalVisible] = useState(false);
    const [isPrivacyPolicyVisible, setPrivacyPolicyVisible] = useState(false);

    const openOptionsModal = () => setOptionsModalVisible(true);
    const closeOptionsModal = () => setOptionsModalVisible(false);

    const handlePrivacyPolicyPress = () => {
        closeOptionsModal();
        setPrivacyPolicyVisible(true);
    };

    const closePrivacyPolicyModal = () => setPrivacyPolicyVisible(false);

    return (
        <>
            <TouchableOpacity onPress={openOptionsModal} style={styles.button}>
                <Ionicons name="ellipsis-horizontal" size={24} color="#333" />
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isOptionsModalVisible}
                onRequestClose={closeOptionsModal}
            >
                <OptionsModal closeModal={closeOptionsModal} onPrivacyPolicy={handlePrivacyPolicyPress} />
            </Modal>
            <WebViewModal
                isVisible={isPrivacyPolicyVisible}
                onClose={closePrivacyPolicyModal}
                url="https://sites.google.com/view/gatherly/home"
            />
        </>
    );
};

const styles = StyleSheet.create({
    button: {
        marginRight: 15,
    },
});

export default HeaderRightButton;
