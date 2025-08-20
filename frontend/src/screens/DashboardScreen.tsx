import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { fetchTodos } from "../services/api";
import theme from "../theme";

interface DashboardProps {
  setToken: (token: string | null) => void;
}

export default function Dashboard({ setToken }: DashboardProps) {
  const [todos, setTodos] = useState<any[]>([]);

  useEffect(() => {
    fetchTodos().then(setTodos).catch(console.error);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.todoItem,
              {
                borderLeftColor: item.completed
                  ? theme.colors.success
                  : theme.colors.danger,
              },
            ]}
          >
            <Text style={styles.todoText}>{item.title}</Text>
          </View>
        )}
      />

      <Button title="Logout" color={theme.colors.danger} onPress={() => setToken(null)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.title,
    fontWeight: "bold",
    marginBottom: theme.spacing.md,
    color: theme.colors.text,
  },
  todoItem: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    borderRadius: theme.borderRadius,
    borderLeftWidth: 5,
  },
  todoText: {
    fontSize: theme.typography.body,
    color: theme.colors.text,
  },
});
