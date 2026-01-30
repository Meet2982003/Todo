// components/todo/TodoHeader.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

interface TodoHeaderProps {
  activeCount: number;
  totalCount: number;
}

export const TodoHeader: React.FC<TodoHeaderProps> = ({
  activeCount,
  totalCount,
}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>My Todos</Text>
      <Text style={styles.subtitle}>
        {activeCount} of {totalCount} remaining
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.primary,
    paddingVertical: 20,
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.background,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
});
