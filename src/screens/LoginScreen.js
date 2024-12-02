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
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        setLoading(true);
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email.trim(), password);
        } catch (err) {
            // Provide user-friendly error messages
            const errorMessage = {
                'auth/invalid-email': 'Invalid email address.',
                'auth/user-not-found': 'No user found with this email.',
                'auth/wrong-password': 'Incorrect password. Please try again.',
            };
            setError(errorMessage[err.code] || 'Failed to log in. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Login to continue</Text>

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
            <View style={styles.passwordContainer}>
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    style={[styles.input, styles.passwordInput]}
                    textContentType="password"
                />
                <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.showPasswordButton}
                >
                    <Text style={styles.showPasswordText}>
                        {showPassword ? 'Hide' : 'Show'}
                    </Text>
                </TouchableOpacity>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#007BFF" />
            ) : (
                <Button title="Login" onPress={handleLogin} />
            )}

            <Text style={styles.signupPrompt}>
                Don't have an account?{' '}
                <Text
                    style={styles.signupLink}
                    onPress={() => navigation.navigate('Signup')}
                >
                    Sign up
                </Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 16, backgroundColor: '#f9f9f9' },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' },
    subtitle: { fontSize: 16, color: '#666', marginBottom: 20, textAlign: 'center' },
    input: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginBottom: 16,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#fff',
        borderRadius: 4,
    },
    passwordContainer: {
        position: 'relative',
        justifyContent: 'center',
    },
    passwordInput: { paddingRight: 50 },
    showPasswordButton: {
        position: 'absolute',
        right: 10,
        padding: 10,
    },
    showPasswordText: { color: '#007BFF', fontWeight: 'bold' },
    error: { color: 'red', marginBottom: 16, textAlign: 'center' },
    signupPrompt: {
        marginTop: 20,
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
    },
    signupLink: { color: '#007BFF', fontWeight: 'bold' },
});

export default LoginScreen;
