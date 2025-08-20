import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/DashboardScreen";
import AnalyticsScreen from "../screens/AnalyticsScreen";

export type MainTabParamList = {
  Dashboard: undefined;
  Analytics: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainNavigator({ setToken }: { setToken: (t: string | null) => void }) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard">
        {(props: any) => <Dashboard {...props} setToken={setToken} />}
      </Tab.Screen>
      <Tab.Screen name="Analytics" component={AnalyticsScreen} />
    </Tab.Navigator>
  );
}
