import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const MyDatePicker = ({ onDateTimeChange }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [pickerType, setPickerType] = useState('');

    const handleDateChange = (event, selected) => {
        if (selected) {
            if (pickerType === 'date') {
                setSelectedDate(selected);
            } else if (pickerType === 'time') {
                setSelectedTime(selected);
            }
            onDateTimeChange(pickerType === 'date' ? selected : selectedTime);
        }
        setShowPicker(false);
    };

    return (
        <KeyboardAvoidingView style={styles.container} >
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button]}
                    onPress={() => { setShowPicker(true); setPickerType('date'); }}>
                    <Text style={[styles.buttonText]}>Select Date</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button]}
                    onPress={() => { setShowPicker(true); setPickerType('time'); }}>
                    <Text style={[styles.buttonText]}>Select Time</Text>
                </TouchableOpacity>
            </View>
            {showPicker && (
                <DateTimePicker
                    value={pickerType === 'date' ? selectedDate : selectedTime}
                    mode={pickerType === 'date' ? 'date' : 'time'}
                    is24Hour={true}
                    display='default'
                    onChange={handleDateChange}
                />
            )}
            <View style={styles.selectionContainer}>
                <Text style={styles.selectionText}>
                    Selected Date: {selectedDate.toLocaleDateString()}{'\n'}
                    Selected Time: {selectedTime.toLocaleTimeString()}
                </Text>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#4285F4',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginHorizontal: 10,
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    selectionContainer: {
        alignItems: 'center',
    },
    selectionText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default MyDatePicker;
