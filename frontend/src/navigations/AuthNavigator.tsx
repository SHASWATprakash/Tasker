import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";

export type AuthStackParamList = {
  Login: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

export default function AuthNavigator({ setToken }: { setToken: (t: string | null) => void }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login">
        {(props) => <LoginScreen {...props} setToken={setToken} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
