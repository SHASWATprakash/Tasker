// src/screens/AnalyticsScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from "react-native";
import { PieChart, BarChart } from "react-native-chart-kit";
import { getTodoAnalytics } from "../services/api";
import theme from "../theme";

const { width } = Dimensions.get("window");
const chartWidth = width - 32; // padding

export default function AnalyticsScreen() {
  const [loading, setLoading] = useState(true);
  const [pieChartData, setPieChartData] = useState<any[]>([]);
  const [barLabels, setBarLabels] = useState<string[]>([]);
  const [barValues, setBarValues] = useState<number[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const res = await getTodoAnalytics();
        setTotal(res.total);

        // Pie data
        const pie = res.pieData.map((p) => ({
          name: p.name,
          population: p.value,
          color: p.name === "Completed" ? theme.colors.success : theme.colors.danger,
          legendFontColor: theme.colors.text,
          legendFontSize: 14,
        }));
        setPieChartData(pie);

        // Bar data
        setBarLabels(res.barData.map((b) => b.userId));
        setBarValues(res.barData.map((b) => b.tasks));
      } catch (e: any) {
        setError(e?.message || "Failed to load analytics");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Todo Analytics</Text>
      <Text style={styles.subtitle}>Total Todos: {total}</Text>

      {loading && <ActivityIndicator size="large" color={theme.colors.primary} />}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {!loading && !error && (
        <>
          {/* Pie: Completed vs Pending */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Completed vs Pending</Text>
            <PieChart
              data={pieChartData}
              width={chartWidth}
              height={220}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="12"
              chartConfig={{
                decimalPlaces: 0,
                color: () => theme.colors.text,
                labelColor: () => theme.colors.text,
              }}
              hasLegend
              center={[0, 0]}
            />
          </View>

          {/* Bar: Todos per user */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Todos per User</Text>
            <BarChart
              width={chartWidth}
              height={260}
              chartConfig={{
                decimalPlaces: 0,
                color: () => theme.colors.primary,
                labelColor: () => theme.colors.text,
                propsForBackgroundLines: { strokeDasharray: "" },
              }}
              data={{
                labels: barLabels,
                datasets: [{ data: barValues }],
              }}
              showValuesOnTopOfBars
              fromZero
              withInnerLines
              style={{ borderRadius: theme.borderRadius }} yAxisLabel={""} yAxisSuffix={""}            />
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: 16, paddingBottom: 32 },
  title: {
    fontSize: theme.typography.title,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: 6,
  },
  subtitle: { color: theme.colors.muted, marginBottom: 16 },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius,
    padding: 12,
    marginBottom: 16,
    elevation: 2,
  },
  cardTitle: {
    fontWeight: "600",
    fontSize: theme.typography.subtitle,
    marginBottom: 8,
    color: theme.colors.text,
  },
  error: { color: theme.colors.danger, marginVertical: 8 },
});
