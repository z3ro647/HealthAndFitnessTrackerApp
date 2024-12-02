import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, query, where, onSnapshot, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { AuthContext } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons'; // Add this if you want to use icons

const DashboardScreen = ({ navigation }) => {
    const [workouts, setWorkouts] = useState([]);
    const [waterIntake, setWaterIntake] = useState(0); // Track water intake
    const { user } = useContext(AuthContext); // Get the logged-in user

    useEffect(() => {
        if (!user) return; // Ensure user is logged in

        // Query workouts based on the logged-in user's UID
        const workoutsQuery = query(
            collection(db, 'workouts'),
            where('uid', '==', user.uid)
        );

        const unsubscribeWorkouts = onSnapshot(workoutsQuery, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setWorkouts(data);
        });

        // Fetch water intake for today
        const today = new Date().toISOString().split('T')[0];
        const waterDocRef = doc(db, 'waterIntake', `${user.uid}_${today}`);
        const fetchWaterIntake = async () => {
            const docSnap = await getDoc(waterDocRef);
            if (docSnap.exists()) {
                setWaterIntake(docSnap.data().amount);
            } else {
                setWaterIntake(0); // Default to 0 if no record exists
            }
        };
        fetchWaterIntake();

        return () => unsubscribeWorkouts();
    }, [user]);

    const addWater = async () => {
        if (!user) return;

        const today = new Date().toISOString().split('T')[0];
        const waterDocRef = doc(db, 'waterIntake', `${user.uid}_${today}`);
        const newAmount = waterIntake + 250; // Increment by 250ml

        await setDoc(waterDocRef, { uid: user.uid, date: today, amount: newAmount });
        setWaterIntake(newAmount);
    };

    const today = new Date().toISOString().split('T')[0]; // Today's date
    const todayWorkouts = workouts.filter(
        (workout) => workout.date.split('T')[0] === today
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Today's Summary</Text>

            {/* Water Intake Section */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Water Intake</Text>
                <View style={styles.waterTracker}>
                    <Ionicons name="water" size={24} color="#007BFF" />
                    <Text style={styles.waterText}>{waterIntake} ml</Text>
                </View>
                <TouchableOpacity style={styles.waterButton} onPress={addWater}>
                    <Text style={styles.waterButtonText}>Add 250ml</Text>
                </TouchableOpacity>
            </View>

            {/* Add Workout Button */}
            <TouchableOpacity style={styles.addWorkoutButton} onPress={() => navigation.navigate('AddWorkout')}>
                <Text style={styles.addWorkoutButtonText}>Add Workout</Text>
            </TouchableOpacity>

            {/* Workouts for Today */}
            {todayWorkouts.length > 0 ? (
                <FlatList
                    data={todayWorkouts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.workoutItem}>
                            <Text style={styles.workoutText}>
                                {item.workoutType} - {item.duration} min - {item.calories} cal
                            </Text>
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.noWorkoutsText}>No workouts logged for today.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 16, 
        backgroundColor: '#f9f9f9' 
    },
    title: { 
        fontSize: 26, 
        fontWeight: 'bold', 
        marginBottom: 16, 
        textAlign: 'center', 
        color: '#333' 
    },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    cardTitle: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        marginBottom: 12, 
        color: '#333' 
    },
    waterTracker: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 10 
    },
    waterText: { 
        fontSize: 20, 
        marginLeft: 10, 
        color: '#007BFF' 
    },
    waterButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    waterButtonText: { 
        color: '#fff', 
        fontWeight: 'bold', 
        fontSize: 16 
    },
    addWorkoutButton: {
        backgroundColor: '#28a745',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    addWorkoutButtonText: { 
        color: '#fff', 
        fontWeight: 'bold', 
        fontSize: 16 
    },
    workoutItem: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        marginHorizontal: 16,  // Add horizontal margin to ensure shadow isn't clipped
    },
    workoutText: { 
        fontSize: 16, 
        color: '#333' 
    },
    noWorkoutsText: { 
        fontSize: 16, 
        color: '#777', 
        textAlign: 'center', 
        marginTop: 20 
    },
});


export default DashboardScreen;