import { createClient } from "@supabase/supabase-js";

const URL = "https://dcianpjlatncvuiepugt.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjaWFucGpsYXRuY3Z1aWVwdWd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIxMTA4NDgsImV4cCI6MTk5NzY4Njg0OH0.k6KziaxSz3UQu30FUNXlllCuD3v_xmwTeok4GFBupAM";

export const supabase = createClient(URL, API_KEY);