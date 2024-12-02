import React, { useContext, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, TouchableOpacity, Image, Modal, TextInput } from 'react-native';
import { signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebaseConfig';  // Correct import of Firebase config
import { AuthContext } from '../context/AuthContext';  // Correct import of AuthContext

const ProfileScreen = ({ navigation }) => {
    const { user, setUser } = useContext(AuthContext);  // Access user and setUser from context

    // Modal state
    const [modalVisible, setModalVisible] = useState(false);
    const [newDisplayName, setNewDisplayName] = useState(user?.displayName || '');  // Default to current user display name

    const handleLogout = async () => {
        try {
            // Ask the user to confirm logout
            Alert.alert(
                "Logout Confirmation",
                "Are you sure you want to log out?",
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: "OK",
                        onPress: async () => {
                            await signOut(auth);
                            setUser(null); // Clear user from context
                            navigation.replace('Login'); // Navigate to Login screen
                        }
                    }
                ]
            );
        } catch (error) {
            console.error("Error during logout:", error);
            Alert.alert("Logout Failed", "An error occurred while logging out. Please try again.");
        }
    };

    const handleSaveNameChange = async () => {
        try {
            // Update profile with new display name
            await updateProfile(auth.currentUser, {
                displayName: newDisplayName,
            });

            // Update the context with the new display name
            setUser({
                ...user,
                displayName: newDisplayName,
            });

            Alert.alert('Profile Updated', 'Your profile name has been updated successfully');
            setModalVisible(false);  // Close the modal after saving changes
        } catch (error) {
            console.error("Error updating profile:", error);
            Alert.alert("Update Failed", "An error occurred while updating your profile. Please try again.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileHeader}>
                {/* Profile Picture */}
                <Image source={{ uri: user?.photoURL }} style={styles.profileImage} />
                <Text style={styles.welcomeText}>Welcome, {user?.displayName || user?.email}</Text>
            </View>

            {/* User Information */}
            <View style={styles.userInfoContainer}>
                <Text style={styles.infoText}>Email: {user?.email}</Text>
                <Text style={styles.infoText}>Joined: {new Date(user?.metadata?.creationTime).toLocaleDateString()}</Text>
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                    <Text style={styles.buttonText}>Edit Profile</Text>
                </TouchableOpacity>

                <Button title="Logout" onPress={handleLogout} color="#FF6347" />
            </View>

            {/* Modal for editing display name */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Edit Display Name</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Enter new display name"
                            value={newDisplayName}
                            onChangeText={setNewDisplayName}
                        />

                        <View style={styles.modalButtons}>
                            <TouchableOpacity onPress={handleSaveNameChange} style={styles.saveButton}>
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F4F4F9',
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 32,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16,
    },
    welcomeText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    userInfoContainer: {
        marginBottom: 24,
        alignItems: 'center',
    },
    infoText: {
        fontSize: 16,
        color: '#555',
        marginBottom: 8,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        marginBottom: 12,
        width: '80%',
        alignItems: 'center',
        shadowColor: '#000', // Shadow color
        shadowOffset: { width: 0, height: 4 }, // Shadow position
        shadowOpacity: 0.1, // Shadow opacity
        shadowRadius: 5, // Shadow blur
        elevation: 5, // Android shadow
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    // Modal styles
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    saveButton: {
        backgroundColor: '#6200EE',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    cancelButton: {
        backgroundColor: 'gray',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
});

export default ProfileScreen;
