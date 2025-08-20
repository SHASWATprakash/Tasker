import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { apiRequest } from "../services/api";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

export default function AnalyticsScreen() {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    apiRequest("/todos/analytics")
      .then(setChartData)
      .catch(console.error);
  }, []);

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>Todo Analytics</Text>
      {chartData.length > 0 && (
        <PieChart
          data={chartData.map((item) => ({
            name: item.status,
            population: item.count,
            color: item.status === "completed" ? "green" : "red",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
          }))}
          width={Dimensions.get("window").width - 40}
          height={220}
          chartConfig={{
            color: () => `rgba(0,0,0,1)`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />
      )}
    </View>
  );
}
