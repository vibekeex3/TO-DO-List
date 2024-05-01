const API_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsdHNjdnBlZ2F2YWxmaXBpbHR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA4NzkwMzgsImV4cCI6MjAyNjQ1NTAzOH0.OtQVLrGZwnj9Kslj9nMC74uOpD4uQNQUdxojbmVcf3w'
const PROJECT_URL = 'https://zltscvpegavalfipiltu.supabase.co'

import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(PROJECT_URL, API_KEY)
