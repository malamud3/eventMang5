import React, {useEffect, useState} from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import EventF from "../../../models/Event";
import { findEventById } from "../../../services/FirebaseService";
import ModalClose from "../../Views/ModalClose";
import ModalTitle from "../../Views/Text/ModalTitle";
import EventInput from "../../Views/TextInput/EventInput";
import FindButton from "../../Views/Buttons/FindButton";
import { getAnalytics, logEvent } from 'firebase/analytics';
import firebase from "firebase/compat";

type FindEventModalProps = {
    isVisible: boolean;
    onClose: () => void;
    onEventFound: (event: EventF) => void; // Callback function
    filteredData: EventF[]; // Pass filteredData as prop
};

const FindEventModal: React.FC<FindEventModalProps> = ({ isVisible, onClose ,onEventFound, filteredData}) => {
    const [eventId, setEventId] = useState('');

// // Initialize analytics instance after Firebase app initialization
//     const analytics = getAnalytics();
//
//     useEffect(() => {
//         if (!isVisible) {
//             setEventId('');
//         } else if (analytics) { // Check if analytics is initialized
//             // logEvent(analytics, 'event_found', {
//             //     found_event_id: eventId,
//             //     search_result: true,
//             // });
//         } else {
//             console.error('Firebase Analytics not initialized'); // Log error
//         }
//     }, [isVisible]);

    const handleFindEvent = async () => {

        if (eventId.length === 0) {
            alert('Please add the event code');
            return;
        }
        const event = await findEventById(eventId);
        if (!event) {
            alert('Event not found');
            return;
        }
        const isEventAlreadyAdded = filteredData.some(item => item.id === event.id);
        if (isEventAlreadyAdded) {
            alert('Event already in the list');
            return;
        }

        onEventFound(event); // Call the callback function if event is found
        onClose(); // Close the modal
    };

    return (
        <Modal animationType="fade" transparent={true} visible={isVisible} onRequestClose={onClose}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <ModalClose onClose={onClose} />
                    <ModalTitle title="Find Event" />
                    <EventInput value={eventId} onChangeText={setEventId} />
                    <FindButton onPress={handleFindEvent} />
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
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical: 30,
        paddingHorizontal: 20,
        width: '80%',
        alignItems: 'center',
        elevation: 5, // Shadow on Android
        shadowColor: '#110606', // Shadow on iOS
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 10,
            height: 2,
        },
    },
});

export default FindEventModal;
