// ModalContent.tsx
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import OptionButton from "../../Views/Buttons/OptionButton";

interface ModalContentProps {
    closeModal: () => void;
    onAbout?: () => void;
    onPrivacyPolicy?: () => void;
    onRateUs?: () => void;
    onShareUs?: () => void;
    onWhatsComing?: () => void;
}

const OptionsModal: React.FC<ModalContentProps> = ({
                                                       closeModal,
                                                       onAbout,
                                                       onPrivacyPolicy,
                                                       onRateUs,
                                                       onShareUs,
                                                       onWhatsComing
                                                   }) => {
    return (
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <OptionButton onPress={onAbout} iconName="information-circle-outline" text="About" />
                <OptionButton onPress={onPrivacyPolicy} iconName="shield-checkmark" text="Privacy Policy" />
                <OptionButton onPress={onRateUs} iconName="star" text="Rate Us" />
                <OptionButton onPress={onShareUs} iconName="share-social" text="Share Us" />
                <OptionButton onPress={onWhatsComing} iconName="flask-outline" text="What's Coming?" />
                <TouchableOpacity onPress={closeModal}>
                    <Text style={styles.closeButton}>Close</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

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
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    closeButton: {
        marginTop: 15,
        textAlign: "center",
        color: '#0078D4',
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default OptionsModal;
