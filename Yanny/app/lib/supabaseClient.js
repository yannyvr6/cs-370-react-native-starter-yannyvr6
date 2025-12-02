import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://foueonivzttceyeshqml.supabase.co';
const SUPABASE_ANON_KEY = 'sb_secret_gIHsoKcWttk2iDlnqYVy4g_4MIfx-Wo';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
