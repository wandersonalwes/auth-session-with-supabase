import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_PUBLIC_KEY, SUPABASE_URL } from "../../env";

export const supabaseConfig = {
  url: SUPABASE_URL,
  publicKey: SUPABASE_PUBLIC_KEY,
};

export const supabase = createClient(
  supabaseConfig.url,
  supabaseConfig.publicKey,
  {
    auth: {
      detectSessionInUrl: false,
      storage: AsyncStorage,
    },
  }
);
