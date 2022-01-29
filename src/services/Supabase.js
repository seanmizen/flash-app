import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const Supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_PUBLIC_KEY
);

export default Supabase;
