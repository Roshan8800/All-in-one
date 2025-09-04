import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SmartSuite</Text>
      <Text style={styles.version}>Version 1.0.0</Text>
      <View style={styles.creditContainer}>
        <Text style={styles.creditText}>Developed with ❤️ by</Text>
        <Text style={styles.author}>Roshan</Text>
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
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  version: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
  creditContainer: {
    alignItems: 'center',
  },
  creditText: {
    fontSize: 18,
  },
  author: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
});

export default AboutScreen;
