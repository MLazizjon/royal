import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mdpdplffvzfzdiowykbf.supabase.co';
const supabaseKey = 'sb_publishable_11qxh_2V49Kqp7NHL2E6Og_J4e571o9'; // copy tugmasidan olgan to'liq key

export const supabase = createClient(supabaseUrl, supabaseKey); 