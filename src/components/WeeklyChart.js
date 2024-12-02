import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { AuthContext } from '../context/AuthContext';
import { BarChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';

const WorkoutChartScreen = () => {
    const [weeklyWorkoutData, setWeeklyWorkoutData] = useState(new Array(7).fill(0));
    const [weeklyWaterData, setWeeklyWaterData] = useState(new Array(7).fill(0));
    const { user } = useContext(AuthContext); // Get the logged-in user

    useEffect(() => {
        if (!user) return; // Ensure user is logged in

        // Fetch workout data
        const workoutQuery = query(
            collection(db, 'workouts'),
            where('uid', '==', user.uid) // Filter workouts for the logged-in user
        );

        const unsubscribeWorkout = onSnapshot(workoutQuery, (snapshot) => {
            const data = snapshot.docs.map((doc) => doc.data());
            const weeklyWorkoutSummary = new Array(7).fill(0);

            data.forEach((workout) => {
                const day = new Date(workout.date).getDay();
                weeklyWorkoutSummary[day] += workout.duration;
            });

            setWeeklyWorkoutData(weeklyWorkoutSummary);
        });

        // Fetch water intake data
        const waterQuery = query(
            collection(db, 'waterIntake'),
            where('uid', '==', user.uid) // Filter water intake for the logged-in user
        );

        const unsubscribeWater = onSnapshot(waterQuery, (snapshot) => {
            const data = snapshot.docs.map((doc) => doc.data());
            const weeklyWaterSummary = new Array(7).fill(0);

            data.forEach((entry) => {
                const day = new Date(entry.date).getDay();
                weeklyWaterSummary[day] += entry.amount;
            });

            setWeeklyWaterData(weeklyWaterSummary);
        });

        return () => {
            unsubscribeWorkout();
            unsubscribeWater();
        };
    }, [user]);

    return (
        <ScrollView style={styles.container}>
            {/* Weekly Workout Progress Section */}
            <LinearGradient
                colors={['#f7a6b6', '#ff2b94']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.chartContainer}
            >
                <Text style={styles.title}>Weekly Workout Progress</Text>
                <BarChart
                    data={{
                        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                        datasets: [
                            {
                                data: weeklyWorkoutData,
                            },
                        ],
                    }}
                    width={Dimensions.get('window').width - 32} // Chart width
                    height={220} // Chart height
                    yAxisLabel=""
                    yAxisSuffix=" min"
                    chartConfig={{
                        backgroundColor: '#e26a00',
                        backgroundGradientFrom: '#fb8c00',
                        backgroundGradientTo: '#ffa726',
                        decimalPlaces: 0, // No decimal places
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: { borderRadius: 16 },
                    }}
                    style={styles.chart}
                />
            </LinearGradient>

            {/* Weekly Water Intake Section */}
            <LinearGradient
                colors={['#64b5f6', '#1565c0']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.chartContainer}
            >
                <Text style={styles.title}>Weekly Water Intake</Text>
                <BarChart
                    data={{
                        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                        datasets: [
                            {
                                data: weeklyWaterData,
                            },
                        ],
                    }}
                    width={Dimensions.get('window').width - 32} // Chart width
                    height={220} // Chart height
                    yAxisLabel=""
                    yAxisSuffix=" ml"
                    chartConfig={{
                        backgroundColor: '#0091EA',
                        backgroundGradientFrom: '#4FC3F7',
                        backgroundGradientTo: '#0288D1',
                        decimalPlaces: 0, // No decimal places
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: { borderRadius: 16 },
                    }}
                    style={styles.chart}
                />
            </LinearGradient>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f0f0f0',
    },
    chartContainer: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 24,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 16,
        textAlign: 'center',
    },
    chart: {
        borderRadius: 16,
        marginTop: 10,
    },
});

export default WorkoutChartScreen;
