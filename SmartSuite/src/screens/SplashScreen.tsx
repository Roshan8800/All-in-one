import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import Logo from '../assets/logo.svg';

// This is now a simple presentational component.
// Its display is controlled by the AppNavigator based on the auth loading state.
const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2F4F4F" />
      <Logo width={120} height={120} />
      <Text style={styles.appName}>SmartSuite</Text>
      <Text style={styles.createdBy}>Created by - Roshan</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2F4F4F', // Same as logo background for a seamless look
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
  },
  createdBy: {
    fontSize: 16,
    color: 'white',
    position: 'absolute',
    bottom: 40,
  },
});

export default SplashScreen;
