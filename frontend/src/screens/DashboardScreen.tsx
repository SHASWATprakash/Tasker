import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { apiRequest } from "../services/api";

export default function DashboardScreen({ navigation }: any) {
  const [todos, setTodos] = useState<any[]>([]);

  useEffect(() => {
    apiRequest("/todos")
      .then(setTodos)
      .catch(console.error);
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Your Todos</Text>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>- {item.title}</Text>}
      />
    </View>
  );
}
