import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yapvvidhcloxvlupgwpu.supabase.co'
const supabaseAnonKey = 'sb_publishable_jUn-SMtWEB5a10dIMTg--Q_inhLJyZX' // Skrinshotingizdagi yangi Publishable key

export const supabase = createClient(supabaseUrl, supabaseAnonKey)