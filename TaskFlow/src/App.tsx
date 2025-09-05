import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import TasksScreen from './screens/TasksScreen';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TasksScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
