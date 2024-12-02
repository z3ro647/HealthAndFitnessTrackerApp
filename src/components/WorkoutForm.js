import React, { useState, useContext } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { AuthContext } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const WorkoutForm = ({ navigation }) => {
    const [workoutType, setWorkoutType] = useState('');
    const [duration, setDuration] = useState('');
    const [calories, setCalories] = useState('');
    const { user } = useContext(AuthContext); // Logged-in user context

    const handleAddWorkout = async () => {
        if (!user) return; // Ensure user is logged in

        if (!workoutType || !duration || !calories) {
            Alert.alert('Error', 'Please fill all the fields before submitting.');
            return;
        }

        try {
            await addDoc(collection(db, 'workouts'), {
                workoutType,
                duration: parseFloat(duration),
                calories: parseFloat(calories),
                date: new Date().toISOString(),
                uid: user.uid, // User's UID
            });

            // Clear form fields
            setWorkoutType('');
            setDuration('');
            setCalories('');

            Alert.alert('Success', 'Workout added successfully.');
            navigation.goBack(); // Navigate back to the previous screen
        } catch (error) {
            console.error('Error adding workout:', error);
            Alert.alert('Error', 'An error occurred while adding the workout. Please try again.');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Add Workout</Text>
            
            {/* Workout Type Input */}
            <View style={styles.inputContainer}>
                <Ionicons name="fitness" size={24} color="#007BFF" style={styles.icon} />
                <TextInput
                    placeholder="Workout Type (e.g., Running)"
                    value={workoutType}
                    onChangeText={setWorkoutType}
                    style={styles.input}
                />
            </View>

            {/* Duration Input */}
            <View style={styles.inputContainer}>
                <Ionicons name="timer" size={24} color="#007BFF" style={styles.icon} />
                <TextInput
                    placeholder="Duration (minutes)"
                    value={duration}
                    onChangeText={setDuration}
                    keyboardType="numeric"
                    style={styles.input}
                />
            </View>

            {/* Calories Input */}
            <View style={styles.inputContainer}>
                <Ionicons name="flame" size={24} color="#FF4500" style={styles.icon} />
                <TextInput
                    placeholder="Calories Burned"
                    value={calories}
                    onChangeText={setCalories}
                    keyboardType="numeric"
                    style={styles.input}
                />
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={handleAddWorkout}>
                <Text style={styles.submitButtonText}>Add Workout</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f7f7f7',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 16,
        borderRadius: 8,
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        padding: 8,
    },
    submitButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 14,
        borderRadius: 30,
        marginTop: 20,
        alignItems: 'center',
        elevation: 5,
    },
    submitButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default WorkoutForm;
