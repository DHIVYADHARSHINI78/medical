import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qnwuygdxxsppfuqjgdai.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFud3V5Z2R4eHNwcGZ1cWpnZGFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5MzYzNzksImV4cCI6MjA2NjUxMjM3OX0.Umh_9hefRY2XZIF7QQcu5Z7u5YabbYK-7_xHfALIqwo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
