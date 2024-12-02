import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { AuthContext } from '../context/AuthContext';

const HistoryScreen = () => {
    const [history, setHistory] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (!user) return;
        const historyQuery = query(
            collection(db, 'bmiHistory'),
            where('uid', '==', user.uid)
        );
        const unsubscribe = onSnapshot(historyQuery, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setHistory(data);
        });
        return () => unsubscribe();
    }, [user]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>History</Text>
            <FlatList
                data={history}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Text style={styles.item}>
                        {item.date} - BMI: {item.bmi} ({item.category})
                    </Text>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
    item: { padding: 8, borderBottomWidth: 1 },
});

export default HistoryScreen;
