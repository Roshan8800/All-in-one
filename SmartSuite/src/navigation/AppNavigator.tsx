import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';

import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import TodoScreen from '../screens/TodoScreen';
import CalculatorScreen from '../screens/CalculatorScreen';

export type RootStackParamList = {
  Home: undefined;
  About: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Todo: undefined;
  Calculator: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {session ? (
          // Main App Stack (for logged-in users)
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: 'SmartSuite' }}
            />
            <Stack.Screen name="About" component={AboutScreen} />
            <Stack.Screen name="Todo" component={TodoScreen} options={{ title: 'My To-Do List' }} />
            <Stack.Screen name="Calculator" component={CalculatorScreen} options={{ title: 'Calculator' }} />
          </>
        ) : (
          // Auth Stack (for logged-out users)
          <>
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
