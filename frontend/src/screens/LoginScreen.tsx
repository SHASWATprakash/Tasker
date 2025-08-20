import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { loginUser } from "../services/api";
import theme from "../theme";

export default function LoginScreen({ navigation, setToken }: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await loginUser(username, password);
      console.log("Login response:", res);

      if (res?.token) {
        setToken(res.token);
        navigation.navigate("Dashboard"); // ✅ safe navigation
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} color={theme.colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: theme.typography.title,
    fontWeight: "bold",
    marginBottom: theme.spacing.md,
    color: theme.colors.text,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.muted,
    borderRadius: theme.borderRadius,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.card,
  },
  error: {
    color: theme.colors.danger,
    marginBottom: theme.spacing.sm,
    textAlign: "center",
  },
});
