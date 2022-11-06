import { Button, Text, View } from "react-native";
import { useLoginViewModel } from "./useLoginViewModel";

import { styles } from "./styles";

export function Login() {
  const { user, handleSignInWithGoogle, handleSignOut } = useLoginViewModel();

  return (
    <View style={styles.container}>
      <Text>{user?.email}</Text>
      {user && <Button title="Sair" onPress={handleSignOut} />}
      {!user && <Button title="Login" onPress={handleSignInWithGoogle} />}
    </View>
  );
}
