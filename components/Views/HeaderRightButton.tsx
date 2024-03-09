import React, { useState, useCallback } from 'react';
import { TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import OptionsModal from '../Modal/OptionsModal/OptionsModal';
import WebViewModal from '../WebViewModal';
import RateAppModal from "../Modal/RateAppModal/RateAppModal";
import ShareAppModal from "../Modal/ShareAppModal/ShareAppModal";

interface Props {
    navigation: any;
}

const HeaderRightButton: React.FC<Props> = ({ navigation }) => {
    const [isOptionsModalVisible, setOptionsModalVisible] = useState(false);
    const [isRateAppModalVisible, setRateAppModalVisible] = useState(false); // State for RateAppModal
    const [isShareAppModalVisible, setShareAppModalVisible] = useState(false); // State for RateAppModal

    const [modalContent, setModalContent] = useState<{ isVisible: boolean; url: string } | null>(null);

    const openOptionsModal = useCallback(() => setOptionsModalVisible(true), []);
    const closeOptionsModal = useCallback(() => setOptionsModalVisible(false), []);

    const closeModal = useCallback(() => {
        setModalContent(null)
    }, [setModalContent]);

    const openRateAppModal = useCallback(() => setRateAppModalVisible(true), []);
    const closeRateAppModal = useCallback(() => setRateAppModalVisible(false), []);


    const openShareAppModal = useCallback(() => setShareAppModalVisible(true), []);
    const closeShareAppModal = useCallback(() => setShareAppModalVisible(false), []);

    //Preventing unnecessary re-renders -> no changes -> useCallback
    const handleModalOpen = useCallback((url: string) => {
        closeOptionsModal();
        setModalContent({ isVisible: true, url });
    }, [closeOptionsModal, setModalContent]);

    const handleRateUs = useCallback(() => {
        closeOptionsModal(); // Close options modal when Rate Us is clicked
        openRateAppModal(); // Open Rate App modal
    }, [closeOptionsModal, openRateAppModal]);

    const handleShareUs = useCallback(() => {
        closeOptionsModal(); // Close options modal when Rate Us is clicked
        openShareAppModal(); // Open Rate App modal
    }, [closeOptionsModal, openShareAppModal]);

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
                <OptionsModal
                    closeModal={closeOptionsModal}
                    onPrivacyPolicy={() => handleModalOpen('https://sites.google.com/view/gatherly/home')}
                    onAbout={() => handleModalOpen('https://sites.google.com/view/about-gatherly/home')}
                    onRateUs={handleRateUs}
                    onShareUs={handleShareUs}
                />
            </Modal>
            {modalContent && (
                <WebViewModal
                    key={modalContent.url}
                    isVisible={modalContent.isVisible}
                    onClose={closeModal}
                    url={modalContent.url}
                />
            )}
            <RateAppModal isVisible={isRateAppModalVisible} onClose={closeRateAppModal} />
            <ShareAppModal isVisible={isShareAppModalVisible} onClose={closeShareAppModal} />
        </>
    );
};

const styles = StyleSheet.create({
    button: {
        marginRight: 15,
    },
});

export default HeaderRightButton;
