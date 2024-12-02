import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WorkoutItem = ({ workout }) => (
    <View style={styles.container}>
        <Text style={styles.text}>
            {workout.workoutType} - {workout.duration} min - {workout.calories} cal
        </Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    text: {
        fontSize: 16,
    },
});

export default WorkoutItem;
