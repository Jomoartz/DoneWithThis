import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://clekmpjiclzmvgrcfvqx.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsZWttcGppY2x6bXZncmNmdnF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMwNzc3ODYsImV4cCI6MjAzODY1Mzc4Nn0.Huh7dyMH2Zie3O9NHW6IVzuZgfURtwP3erzTwrfk-VM'; // Replace with your Supabase anon key
const supabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabaseClient;
