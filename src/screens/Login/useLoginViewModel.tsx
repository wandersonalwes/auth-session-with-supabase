import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import * as AuthSession from "expo-auth-session";
import { supabase, supabaseConfig } from "../../lib/supabase";

export const useLoginViewModel = () => {
  const [user, setUser] = useState<User | null>();

  const handleSignInWithGoogle = async () => {
    const proxyRedirectUri = AuthSession.makeRedirectUri({ useProxy: true });
    const redirectUri = AuthSession.makeRedirectUri({ useProxy: false });
    const provider = "google";

    const response = await AuthSession.startAsync({
      authUrl: `${supabaseConfig.url}/auth/v1/authorize?provider=${provider}&redirect_to=${proxyRedirectUri}`,
      returnUrl: redirectUri,
    });

    if (response.type !== "success") return;

    await supabase.auth.setSession({
      access_token: response.params.access_token,
      refresh_token: response.params.refresh_token,
    });
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    setUser(null);
    console.log(error);
  };

  useEffect(() => {
    async function load() {
      const { data } = await supabase.auth.getUser();
      if (data.user) setUser(data.user);
    }

    load();
  }, []);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        setUser(session?.user);
      }

      if (event === "SIGNED_OUT") setUser(null);
    });
  }, []);

  return {
    user,
    handleSignInWithGoogle,
    handleSignOut,
  };
};
