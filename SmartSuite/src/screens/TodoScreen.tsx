import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  type Todo,
} from '../services/todoService';
import { useAuth } from '../context/AuthContext';

// A simple Checkbox component for the UI
const Checkbox = ({ isChecked, onPress }: { isChecked: boolean; onPress: () => void }) => (
  <TouchableOpacity style={[styles.checkboxBase, isChecked && styles.checkboxChecked]} onPress={onPress}>
    {isChecked && <Text style={styles.checkmark}>✓</Text>}
  </TouchableOpacity>
);

const TodoScreen = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState('');
  const [loading, setLoading] = useState(true);
  const { session } = useAuth();

  useEffect(() => {
    // Only fetch todos if the user is logged in.
    if (session) {
      fetchTodos();
    } else {
      setLoading(false);
    }
  }, [session]);

  const fetchTodos = async () => {
    setLoading(true);
    const fetchedTodos = await getTodos();
    setTodos(fetchedTodos);
    setLoading(false);
  };

  const handleAddTask = async () => {
    if (task.trim() === '') {
      Alert.alert('Error', 'Task cannot be empty.');
      return;
    }
    const newTodo = await addTodo(task);
    if (newTodo) {
      setTodos([newTodo, ...todos]);
      setTask('');
    }
  };

  const handleToggleComplete = async (id: string, is_completed: boolean) => {
    const updatedTodo = await updateTodo(id, !is_completed);
    if (updatedTodo) {
      setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
    }
  };

  const handleDeleteTask = async (id: string) => {
    // Optimistically remove the task from the UI
    const originalTodos = todos;
    setTodos(todos.filter(todo => todo.id !== id));
    await deleteTodo(id);
    // If delete fails, we could potentially add it back, but for now this is fine.
  };

  if (loading) {
    return <ActivityIndicator style={styles.centered} size="large" />;
  }

  if (!session) {
    return (
        <View style={styles.centered}>
            <Text>Please sign in to manage your tasks.</Text>
        </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          value={task}
          onChangeText={setTask}
        />
        <Button title="Add" onPress={handleAddTask} />
      </View>
      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Checkbox isChecked={item.is_completed} onPress={() => handleToggleComplete(item.id, item.is_completed)} />
            <Text style={[styles.taskText, item.is_completed && styles.completedTaskText]}>
              {item.task}
            </Text>
            <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  deleteText: {
    color: 'red',
  },
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#007AFF',
    marginRight: 15,
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
  },
  checkmark: {
    color: 'white',
    fontWeight: 'bold',
  }
});

export default TodoScreen;
