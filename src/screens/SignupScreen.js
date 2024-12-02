import React, { useState } from 'react';
import {
    View,
    TextInput,
    Button,
    StyleSheet,
    Text,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await createUserWithEmailAndPassword(auth, email.trim(), password);
            navigation.navigate('Login');
        } catch (err) {
            // Firebase error handling
            const errorMessage = {
                'auth/invalid-email': 'Invalid email address.',
                'auth/email-already-in-use': 'This email is already in use.',
                'auth/weak-password': 'Password should be at least 6 characters.',
            };
            setError(errorMessage[err.code] || 'Failed to create account. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>

            {error && <Text style={styles.error}>{error}</Text>}

            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                textContentType="emailAddress"
                returnKeyType="next"
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
                textContentType="password"
                returnKeyType="next"
            />
            <TextInput
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                style={styles.input}
                textContentType="password"
                returnKeyType="done"
            />

            {loading ? (
                <ActivityIndicator size="large" color="#007BFF" />
            ) : (
                <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
                    <Text style={styles.signupButtonText}>Sign Up</Text>
                </TouchableOpacity>
            )}

            <Text style={styles.loginPrompt}>
                Already have an account?{' '}
                <Text
                    style={styles.loginLink}
                    onPress={() => navigation.navigate('Login')}
                >
                    Login here
                </Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 16, backgroundColor: '#f9f9f9' },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' },
    input: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginBottom: 16,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#fff',
        borderRadius: 4,
    },
    error: { color: 'red', marginBottom: 16, textAlign: 'center' },
    signupButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 4,
        alignItems: 'center',
    },
    signupButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    loginPrompt: {
        marginTop: 20,
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
    },
    loginLink: { color: '#007BFF', fontWeight: 'bold' },
});

export default SignupScreen;
