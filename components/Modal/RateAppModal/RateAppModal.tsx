import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Rate from 'react-native-rate';
import { AirbnbRating } from 'react-native-ratings';

const RateAppModal = ({ isVisible, onClose }) => {
    const [rating, setRating] = useState(0);

    const handleRateApp = () => {
        // if (rating === 0) {
        //     // Optionally, display a message to prompt the user to select a rating
        //     return;
        // }
        //
        // const options = {
        //     AppleAppID: '<your_app_id>',
        //     GooglePackageName: '<your_app_package_name>',
        //     preferInApp: true,
        //     openAppStoreIfInAppFails: true,
        // };
        // Rate.rate(options, success => {
        //     if (success) {
        //         console.log('User rated the app');
        //     }
        // });
        onClose();
    };

    return (
        <Modal visible={isVisible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Enjoying our app?</Text>
                    <Text style={styles.modalText}>Please consider rating us on the  Google Play Store</Text>
                    <AirbnbRating
                        count={5}
                        reviews={['Terrible', 'Bad', 'OK', 'Good', 'Excellent']}
                        defaultRating={0}
                        size={20}
                        onFinishRating={rating => setRating(rating)}
                    />
                    <TouchableOpacity onPress={handleRateApp} style={styles.rateButton}>
                        <Text style={styles.rateButtonText}>Rate Now</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onClose} style={styles.notNowButton}>
                        <Text style={styles.notNowButtonText}>Not Now</Text>
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
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 22,
        marginBottom: 10,
    },
    modalText: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: -20
    },

    rateButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 8,
        marginVertical: 10,
    },
    rateButtonText: {
        color: 'white',
        textAlign: 'center',
    },
    notNowButton: {
        marginTop: 10,
    },
    notNowButtonText: {
        color: 'gray',
        textAlign: 'center',
    },
});

export default RateAppModal;
