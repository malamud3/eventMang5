import React, { useState } from 'react';
import { Image, View, Text, FlatList, StyleSheet, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import EventF, { EventType } from "../../models/Event";
import LinearGradientBackground from "../../components/Views/Colors/LinearGradientBackground";
import { MaterialIcons } from "@expo/vector-icons";
import debounce from 'lodash/debounce';
import {NavigationProp} from "@react-navigation/native";
import FindEventModal from '../../components/Modal/FindEventModal/FindEventModal';
import {LinearGradient} from "expo-linear-gradient";

export const data: EventF[] = [
    {
        id: '1',
        name: 'Sunset Beach Picnic',
        type: EventType.GirlsOnly,
        dateTime: new Date('2024-03-12T17:30:00'),
        location: 'Golden Sands Beach',
        description: 'Ladies, let\'s celebrate the end of the week with a magical sunset beach picnic! Bring your favorite snacks and drinks, cozy blankets, and let\'s unwind by the ocean together. Don\'t miss this chance to relax and recharge! 🌅🧺🥂',
        invited: []
    },
    {
        id: '2',
        name: 'Boys Night Out',
        type: EventType.BoysOnly,
        dateTime: new Date('2024-03-15T20:00:00'),
        location: 'Location 2',
        description: 'Calling all the guys! It\'s time for a night out filled with good drinks, great music, and even better company. Get ready for some epic memories! 🍻🎶',
        invited: []
    },
    {
        id: '3',
        name: 'Poker Tournament',
        type: EventType.Poker,
        dateTime: new Date('2024-03-20T19:00:00'),
        location: 'Location 3',
        description: 'Feeling lucky? Join us for a thrilling poker tournament this Saturday night. Prizes, snacks, and intense card games await! ♠️♥️♣️♦️',
        invited: []
    },
    {
        id: '4',
        name: 'Beach Cleanup',
        type: EventType.Sea,
        dateTime: new Date('2024-03-25T10:00:00'),
        location: 'Location 4',
        description: 'Let\'s give back to Mother Nature! Join us for a beach cleanup session and help keep our coastline beautiful and pristine. Gloves and trash bags will be provided. 🌊🌿',
        invited: []
    },
    {
        id: '5',
        name: 'Family BBQ Day',
        type: EventType.BBQ,
        dateTime: new Date('2024-04-01T12:00:00'),
        location: 'Location 5',
        description: 'Calling all families! Bring the kids and grandparents for a day of delicious BBQ, outdoor games, and quality time together. Let\'s make unforgettable memories! 🍔👨‍👩‍👧‍👦🎉',
        invited: []
    },
];
export const eventTypeImages: Record<EventType, any> = {
    GirlsOnly: require('../../assets/GirlsOnly.png'),
    BoysOnly: require('../../assets/BoysOnly.png'),
    Poker: require('../../assets/Poker.png'),
    Sea: require('../../assets/Sea.png'),
    BBQ: require('../../assets/BBQ.png')
};

type HomeScreenProps = {
    navigation: NavigationProp<any>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState<EventF[]>(data);
    const [isModalVisible, setIsModalVisible] = useState(false); // Add state for modal visibility
    const handleEventFound = (event: EventF) => {
        // Add the found event to the list
        setFilteredData([...filteredData, event]);

    };
    const renderItem = ({ item }: { item: EventF }) => (
        <TouchableOpacity style={styles.itemWrapper} onPress={() => navigation.navigate('Confirm', { event: item })}>
            <View style={styles.itemContainer}>
                <LinearGradient
                    colors={['#219fa8','#ffffff','#219fa8']}
                    start={{ x: 0, y: -1}} // Start from the top
                    end={{ x: 0.7, y: 1.8 }}   // End at the bottom
                    style={styles.gradient} // Add a gradient background for a sleek look
                />
                <View style={styles.itemContent}>
                    <Image source={eventTypeImages[item.type]} style={styles.image} />
                    <View style={styles.textContainer}>
                        <Text style={styles.dateTime}>{new Date(item.dateTime).toDateString()}</Text>
                        <Text style={styles.name}>{item.name}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    const debouncedSearch = debounce((query: string) => {
        const filtered = data.filter(event => event.name.toLowerCase().includes(query.toLowerCase()));
        setFilteredData(filtered);
    }, 300);

    const handleSearch = (text: string) => {
        setSearchQuery(text);
        debouncedSearch(text);
    };
    const handleAddEventCode = () => {
        setIsModalVisible(true); // Open the modal when the button is pressed
    };
    const handleClose = ()  => {
        setIsModalVisible(false); // Close the modal when the button is pressed
    }
    return (
        <LinearGradientBackground>
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <MaterialIcons name="search" size={24} color="#999" style={styles.searchIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Search by event name"
                        placeholderTextColor="#999"
                        onChangeText={handleSearch}
                        value={searchQuery}
                    />
                </View>
                <FlatList
                    data={filteredData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
                <View style={styles.bottomButtonContainer}>
                    <TouchableOpacity
                       style={[styles.bottomButton]}
                       onPress={() => navigation.navigate('MainNav', { screen: 'Create' })} // Navigate to NewEvent screen
                    >
                        <Text style={styles.bottomButtonText}>Create New Event</Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.bottomButton]}
                        onPress={handleAddEventCode}
                    >
                        <Text style={styles.bottomButtonText}
                        >Add Event Code</Text>
                    </TouchableOpacity>

                    <FindEventModal
                        isVisible={isModalVisible}
                        onClose={() => setIsModalVisible(false)}
                        onEventFound={handleEventFound}
                        filteredData={filteredData} // Pass filteredData as prop
                    />

                </View>
            </View>
        </LinearGradientBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingBottom: 20,

    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: '#fff',
        borderRadius: 25,
        paddingLeft: 10,
        paddingRight: 15,
        marginTop: 15,
    },
    searchIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        color: '#333',
        fontSize: 16,
        paddingVertical: 12,
    },
    itemWrapper: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5.84,
    },
    itemContainer: {
        width: '100%',
        borderRadius: 18,
        marginBottom: 20,
        marginTop:2,
        overflow: 'hidden', // Ensure content does not overflow
        backgroundColor: '#f6f1f1', // Set background color to black
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
        opacity: 70, // Adjust opacity as needed

    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 1,
        paddingHorizontal: 5,
        borderRadius: 8,
        paddingVertical: 5,
    },
    image: {
        width: 120,
        height: 100,
        marginRight: 16,
        borderRadius: 15,
    },
    textContainer: {
        flex: 1,
    },
    dateTime: {
        fontSize: 16,
        color: '#545252',
        marginBottom: 4,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    bottomButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    bottomButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(37,156,253,0.51)',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.84,
        marginHorizontal: 5,
    },
    bottomButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});


export default HomeScreen;
