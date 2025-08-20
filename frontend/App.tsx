import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./src/navigations/AuthNavigator";
import MainNavigator from "./src/navigations/MainNavigator";

export default function App() {
  const [token, setToken] = useState<string | null>(null);

  return (
    <NavigationContainer>
      {token ? (
        <MainNavigator setToken={setToken} />
      ) : (
        <AuthNavigator setToken={setToken} />
      )}
    </NavigationContainer>
  );
}
