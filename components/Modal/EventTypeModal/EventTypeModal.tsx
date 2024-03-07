import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList, Animated, Easing } from 'react-native';
import { EventType } from "../../../models/Event";
import ModalClose from "../../Views/ModalClose";

type EventTypeModalProps = {
    isVisible: boolean;
    onClose: () => void;
    onSelectEventType: (eventType: EventType) => void;
};

const eventTypesData = [
    { id: EventType.GirlsOnly, label: "Girls Only" },
    { id: EventType.BoysOnly, label: "Boys Only" },
    { id: EventType.Poker, label: "Poker" },
    { id: EventType.Sea, label: "Sea" },
    { id: EventType.BBQ, label: "BBQ" },
];

const EventTypeModal: React.FC<EventTypeModalProps> = ({ isVisible, onClose, onSelectEventType }) => {
    const scaleValue = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        if (isVisible) {
            Animated.timing(scaleValue, {
                toValue: 1,
                duration: 300,
                easing: Easing.elastic(1),
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(scaleValue, {
                toValue: 0,
                duration: 200,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start();
        }
    }, [isVisible, scaleValue]);

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <Animated.View style={[styles.modalContent, { transform: [{ scale: scaleValue }] }]}>
                    <ModalClose onClose={onClose} />
                    <FlatList
                        data={eventTypesData}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.modalItem} onPress={() => {
                                onSelectEventType(item.id);
                                onClose(); // Close modal after selecting an item
                            }}>
                                <Text style={styles.modalItemText}>{item.label}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 20,
        width: '80%',
        alignItems: 'center',
        elevation: 5,
    },
    modalItem: {
        paddingVertical: 15,
        width: '100%',
        alignItems: 'center',
    },
    modalItemText: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    closeButtonText: {
        fontSize: 24,
        color: '#333',
    },
});

export default EventTypeModal;
