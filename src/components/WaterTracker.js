import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const WaterTracker = () => {
    const [waterCount, setWaterCount] = useState(0);

    const handleAddWater = () => setWaterCount(waterCount + 1);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Water Intake</Text>
            <Text>{waterCount} / 8 glasses</Text>
            <Button title="Add Glass" onPress={handleAddWater} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginVertical: 16, alignItems: 'center' },
    title: { fontSize: 18, marginBottom: 8 },
});

export default WaterTracker;
