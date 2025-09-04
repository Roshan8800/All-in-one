import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { supabase } from '../services/supabase';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert('Sign Out Error', error.message);
    }
    // The onAuthStateChange listener will handle navigation
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SmartSuite</Text>
      <Text style={styles.subtitle}>All-in-One Tools</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to About Screen"
          onPress={() => navigation.navigate('About')}
          disabled={loading}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={loading ? 'Signing Out...' : 'Sign Out'}
          onPress={handleSignOut}
          disabled={loading}
          color="#FF3B30"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '60%',
    marginVertical: 5,
  }
});

export default HomeScreen;
