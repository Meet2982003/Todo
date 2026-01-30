import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { COLORS } from "@/constants/colors";
import { useTodos } from "@/hooks/useTodos";
import { StyleSheet, View } from "react-native";

export default function StatsScreen() {
  const { todos, loading } = useTodos();

  const totalTodos = todos.length;
  const completedTodos = todos.filter((t) => t.completed).length;
  const activeTodos = totalTodos - completedTodos;
  const completionRate =
    totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  const StatCard = ({
    label,
    value,
    color,
  }: {
    label: string;
    value: string | number;
    color: string;
  }) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <ThemedText style={styles.statValue}>{value}</ThemedText>
      <ThemedText style={styles.statLabel}>{label}</ThemedText>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Statistics</ThemedText>
      </View>

      <View style={styles.statsGrid}>
        <StatCard
          label="Total Todos"
          value={totalTodos}
          color={COLORS.primary}
        />
        <StatCard
          label="Completed"
          value={completedTodos}
          color={COLORS.success}
        />
        <StatCard label="Active" value={activeTodos} color={COLORS.warning} />
        <StatCard
          label="Completion %"
          value={`${completionRate}%`}
          color={COLORS.info}
        />
      </View>

      {loading && (
        <ThemedText style={styles.loadingText}>Loading...</ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: COLORS.background,
  },
  header: {
    marginBottom: 24,
  },
  statsGrid: {
    gap: 12,
  },
  statCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
  },
  statValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.text_primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.text_secondary,
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    color: COLORS.text_secondary,
  },
});
