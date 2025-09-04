import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { supabase } from '../services/supabase';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const SignUpScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert('Sign Up Error', error.message);
    } else if (data.session) {
      // This case handles auto-confirmation if enabled in Supabase
      Alert.alert('Success', 'You have been signed up successfully!');
    }
    else if (data.user) {
      // This case handles when email confirmation is required
      Alert.alert('Success', 'Please check your email for a confirmation link to complete your sign up.');
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title={loading ? 'Creating account...' : 'Sign Up'} onPress={signUpWithEmail} disabled={loading} />
      </View>
      <Pressable onPress={() => navigation.navigate('SignIn')} disabled={loading}>
        <Text style={styles.link}>Already have an account? Sign In</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  buttonContainer: {
    marginVertical: 10,
  },
  link: {
    color: '#007AFF',
    textAlign: 'center',
    marginTop: 10,
  }
});

export default SignUpScreen;
