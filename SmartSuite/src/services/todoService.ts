import { supabase } from './supabase';
import { Alert } from 'react-native';

// Define the type for our todo items for type safety
export type Todo = {
  id: string;
  user_id: string;
  task: string;
  is_completed: boolean;
  created_at: string;
};

// Fetch all todos for the current user, ordered by creation time
export const getTodos = async (): Promise<Todo[]> => {
  const { data: todos, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    Alert.alert('Error fetching tasks', error.message);
    return [];
  }
  return todos || [];
};

// Add a new todo for the current user
export const addTodo = async (task: string): Promise<Todo | null> => {
  // Supabase automatically knows the user from the session,
  // and RLS policies ensure they can only insert for themselves.
  const { data: newTodo, error } = await supabase
    .from('todos')
    .insert({ task }) // user_id is inferred by the session and RLS policy
    .select()
    .single();

  if (error) {
    Alert.alert('Error adding task', error.message);
    return null;
  }
  return newTodo;
};

// Update a todo's completion status
export const updateTodo = async (id: string, is_completed: boolean): Promise<Todo | null> => {
  const { data: updatedTodo, error } = await supabase
    .from('todos')
    .update({ is_completed })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    Alert.alert('Error updating task', error.message);
    return null;
  }
  return updatedTodo;
};

// Delete a todo by its ID
export const deleteTodo = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id);

  if (error) {
    Alert.alert('Error deleting task', error.message);
  }
};
