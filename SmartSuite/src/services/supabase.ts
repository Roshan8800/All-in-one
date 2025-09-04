import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fgnqpxcjjhyhgwuviuzn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnbnFweGNqamh5aGd3dXZpdXpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5OTAzMDcsImV4cCI6MjA3MjU2NjMwN30.7ngiUsEe8jTK5B1LI4WjQuUd421ikz_l1LVMznFuaoE';

// Initialize the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
