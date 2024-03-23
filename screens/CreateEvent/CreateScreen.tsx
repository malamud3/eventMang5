import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView} from 'react-native';
import EventF, { EventType } from "../../models/Event";
import LinearGradientBackground from "../../components/Views/Colors/LinearGradientBackground";
import { eventTypeImages } from "../HomeScreen/HomeScreen";
import EventTypeModal from "../../components/Modal/EventTypeModal/EventTypeModal";
import MyDatePicker from "../../components/Modal/DateModal/MyDatePicker";
import {NavigationProp} from "@react-navigation/native";
import {createEvent} from "../../services/FirebaseService";
import {generateRandomUuid} from "../../Utils/GenerateRandomUuid";
import ShareAppModal from "../../components/Modal/OptionsModal/ShareAppModal/ShareAppModal";

type CreateNewScreenProps = {
    navigation: NavigationProp<any>;
};


const CreateScreen: React.FC<CreateNewScreenProps> = ({ navigation }) => {
    const [event, setEvent] = useState<EventF>({
        id: '',
        name: '',
        type: EventType.Sea,
        dateTime: new Date(),
        location: '',
        description: '',
        invited: null,
    });
    const [selectedEventType, setSelectedEventType] = useState<EventType | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [eventCode, setEventCode] = useState('');
    const [isShareModalVisible, setIsShareModalVisible] = useState(false);

    const handleInputChange = (key: keyof EventF, value: string) => {
        setEvent({
            ...event,
            [key]: value,
        });
    };
    const handleSelectEventType = (eventType: EventType) => {
        setEvent({
            ...event,
            type: eventType,
        });
        setSelectedEventType(eventType);
    };

    const handleSubmit = async () => {
        //setEventCode(generateRandomUuid()); // Generate event code
        await createEvent(generateRandomUuid(), event.name, event.type, event.dateTime, event.location, event.description, event.invited)
            .then(() => {
                console.log('New Event Data:', event);
                setIsShareModalVisible(true); // Show the modal after creating the event
                navigation.navigate('Home');
            })
            .catch(error => {
                console.error('Error creating event:', error);
                // Handle error
            });
    };

    const handleShareModalClose = () => {
        setIsModalVisible(false);
    };
    return (
        <LinearGradientBackground>
            <KeyboardAvoidingView style={styles.container}>
                <Text style={styles.title}>Create Event</Text>

                <TouchableOpacity style={styles.selectedButton} onPress={() => setIsModalVisible(true)} >
                    {selectedEventType ?
                        <Image
                            source={eventTypeImages[selectedEventType]}
                            style={styles.image}
                        /> :
                        <Image
                            source={require('../../assets/Event_select.png')}
                            style={styles.image}
                        />
                    }
                </TouchableOpacity>

                <EventTypeModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} onSelectEventType={handleSelectEventType} />
                <MyDatePicker onDateTimeChange={(dateTime: Date) => setEvent({ ...event, dateTime })} />

                <Text style={styles.inputTitle}>Event Name</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#AAAAAA"
                    placeholder="Event Name"
                    value={event.name}
                    onChangeText={(text) => handleInputChange('name', text)}
                />

                <Text style={styles.inputTitle}>Location</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#AAAAAA"
                    placeholder="Location"
                    value={event.location}
                    onChangeText={(text) => handleInputChange('location', text)}
                />

                <Text style={styles.inputTitle}>Description</Text>
                <TextInput
                    style={[styles.input, styles.largeInput]}
                    placeholderTextColor="#AAAAAA"
                    placeholder="Description"
                    multiline
                    value={event.description}
                    onChangeText={(text) => handleInputChange('description', text)}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                >
                    <Text style={styles.buttonText}>Invite</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>

            {/*<ShareAppModal*/}
            {/*    isVisible={isShareModalVisible}*/}
            {/*    onClose={() => {*/}
            {/*        setIsShareModalVisible(false);*/}
            {/*        navigation.navigate('Home');*/}
            {/*    }}*/}
            {/*    shareMessage={`You're invited to our event! Use the code: ${eventCode}`}*/}
            {/*/>*/}

        </LinearGradientBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        margin: 4,
    },
    inputTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
    },
    selectedButton: {
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        width: '80%',
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#333333', // Background color
        color: '#AAAAAA', // Text color
    },
    largeInput: {
        height: 50,
    },
    button: {
        backgroundColor: 'blue',
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 10,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    image: {
        width:350,
        height:200,
        borderRadius: 30,
    },
});

export default CreateScreen;
