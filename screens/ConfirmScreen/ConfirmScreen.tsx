import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { eventTypeImages } from '../HomeScreen/HomeScreen';
import LinearGradientBackground from '../../components/Views/Colors/LinearGradientBackground';
import EventF from "../../models/Event";
import { addInvitedUserToEvent } from "../../services/FirebaseService";
import { SvgXml } from "react-native-svg";
import PeopleComing from "../../components/Views/SVG/PeopleComing";
import {NavigationProp} from "@react-navigation/native";

interface ConfirmScreenProps {
    route: {
        params: {
            event: EventF
        }
    }
    navigation: NavigationProp<any>;

}
const ConfirmScreen: React.FC<ConfirmScreenProps> = ({ route, navigation }) => {
    const { event } = route.params;

    const handleConfirmation = async () => {
        try {
            console.log('Event confirmed:', event.id);
            await addInvitedUserToEvent(event.id, "userId");
            navigation.navigate('Home');
        } catch (error) {
            console.error("Error confirming event:", error);
            // Handle error
        }        // Add your confirmation logic here
    };
    const renderEventInfo = () => {
        return (
            <View style={styles.eventInfo}>
                {renderInfoLabel('Date', new Date(event.dateTime).toDateString(), require('../../assets/Date.png'))}
                {renderInfoLabel('Location', event.location, require('../../assets/Location.png'))}
            </View>
        );
    };
    const renderInfoLabel = (label: string, text: string, iconSource: any) => {
        return (
            <View style={styles.infoLabelContainer}>
                <Image source={iconSource} style={styles.icon} />
                <Text style={styles.infoText}>{text}</Text>
            </View>
        );
    };

    return (
        <LinearGradientBackground>
            <View style={styles.container}>
                <Text style={styles.eventTitle}>{event.name}</Text>
                <View style={styles.peopleComing} >
                    <SvgXml xml={PeopleComing} />
                    <Text style={styles.peopleComingText}>12 people coming</Text>
                </View>
                <Image source={eventTypeImages[event.type]} style={styles.image} />
                <View style={styles.contentContainer}>
                    <Text style={styles.description}>{event.description}</Text>
                    {renderEventInfo()}
                    <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmation}>
                        <Text style={styles.confirmButtonText}>I'M COMING</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </LinearGradientBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    image: {
        marginTop: 20,
        width: 300,
        height: 200,
        borderRadius: 20,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    eventTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginTop: 25
    },
    description: {
        fontSize: 16,
        color: '#FFFFFF',
        padding: 40,
        marginTop: -90

    },
    eventInfo: {
        marginEnd: 80,
        marginTop: -10
    },
    infoLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    infoText: {
        fontSize: 16,
        color: '#FFFFFF',
        marginBottom: 10,
        paddingHorizontal: 30
    },
    confirmButton: {
        backgroundColor: '#1E90FF',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 30,
        marginTop: 10
    },
    peopleComing: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fdfdff',
        paddingHorizontal: 14,
        paddingVertical: 1.5,
        borderRadius: 30,
        marginTop: 10
    },
    peopleComingText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#400e6e',
        padding: 2,
        textAlign: 'center',
    },
    confirmButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
    },
    infoLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        marginLeft: 40
    },
    icon: {
        backgroundColor: 'rgba(23,1,1,0.22)',
        width: 60,
        height: 60,
        marginRight: -10,
    },
    infoLabelText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});

export default ConfirmScreen;
