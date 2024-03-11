import React, { useState, useCallback } from 'react';
import { TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import OptionsModal from './Modal/OptionsModal/OptionsModal';
import WebViewModal from "./WebViewModal";
import ShareAppModal from "./Modal/OptionsModal/ShareAppModal/ShareAppModal";
import RateAppModal from "./Modal/OptionsModal/RateAppModal/RateAppModal";
import WhatsNewModal from "./Modal/OptionsModal/WhatsNewModal/WhatsNewModal";

interface Props {
    navigation: any;
}

const HeaderRightButton: React.FC<Props> = ({ navigation }) => {
    const [isOptionsModalVisible, setOptionsModalVisible] = useState(false);
    const [isRateAppModalVisible, setRateAppModalVisible] = useState(false); // State for RateAppModal
    const [isShareAppModalVisible, setShareAppModalVisible] = useState(false); // State for RateAppModal
    const [isWhatsNewModalVisible, setWhatsNewModalVisible] = useState(false); // State for WhatsNewModal
    const [isWebViewModalVisible, setWebViewModalVisible] = useState<{ isVisible: boolean; url: string } | null>(null);


    const openOptionsModal = useCallback(() => setOptionsModalVisible(true), []);
    const closeOptionsModal = useCallback(() => setOptionsModalVisible(false), []);

    const closeWebViewModal = useCallback(() => setWebViewModalVisible(null),[setWebViewModalVisible]);

    const openRateAppModal = useCallback(() => setRateAppModalVisible(true), []);
    const closeRateAppModal = useCallback(() => setRateAppModalVisible(false), []);

    const openShareAppModal = useCallback(() => setShareAppModalVisible(true), []);
    const closeShareAppModal = useCallback(() => setShareAppModalVisible(false), []);

    const openWhatsNewModal = useCallback(() => setWhatsNewModalVisible(true), []);
    const closeWhatsNewModal = useCallback(() => setWhatsNewModalVisible(false), []);

    //Preventing unnecessary re-renders -> no changes -> useCallback
    const handleModalOpen = useCallback((url: string) => {
        closeOptionsModal();
        setWebViewModalVisible({ isVisible: true, url });
    }, [closeOptionsModal, setWebViewModalVisible]);

    const handleRateUs = useCallback(() => {
        closeOptionsModal(); // Close options modal when Rate Us is clicked
        openRateAppModal(); // Open Rate App modal
    }, [closeOptionsModal, openRateAppModal]);

    const handleShareUs = useCallback(() => {
        closeOptionsModal(); // Close options modal when Rate Us is clicked
        openShareAppModal(); // Open Rate App modal
    }, [closeOptionsModal, openShareAppModal]);

    const handleWhatsComing = useCallback(() => {
        closeOptionsModal(); // Close options modal when Rate Us is clicked
        openWhatsNewModal(); // Open Rate App modal
    }, [closeOptionsModal, openWhatsNewModal]);

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
                    onWhatsComing={handleWhatsComing}
                />
            </Modal>
            {isWebViewModalVisible && (
                <WebViewModal
                    key={isWebViewModalVisible.url}
                    isVisible={isWebViewModalVisible.isVisible}
                    onClose={closeWebViewModal}
                    url={isWebViewModalVisible.url}
                />
            )}
            <RateAppModal isVisible={isRateAppModalVisible} onClose={closeRateAppModal} />
            <ShareAppModal isVisible={isShareAppModalVisible} onClose={closeShareAppModal} />
            <WhatsNewModal isVisible={isWhatsNewModalVisible} onClose={closeWhatsNewModal} />
        </>
    );
};

const styles = StyleSheet.create({
    button: {
        marginRight: 15,
    },
});

export default HeaderRightButton;
