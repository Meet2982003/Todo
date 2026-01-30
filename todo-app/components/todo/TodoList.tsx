// components/todo/TodoList.tsx
import React from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Todo } from "../../types/todo";
import { TodoItem } from "./TodoItem";
import { COLORS } from "../../constants/colors";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number, completed: boolean) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onDelete,
  loading,
  error,
  onRetry,
}) => {
  if (loading && todos.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading todos...</Text>
      </View>
    );
  }

  if (error && todos.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        {onRetry && (
          <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  if (todos.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>
          No todos yet. Add one to get started!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={todos}
      renderItem={({ item }) => (
        <TodoItem
          todo={item}
          onToggle={onToggle}
          onDelete={onDelete}
          loading={loading}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      style={styles.list}
      contentContainerStyle={styles.listContent}
      scrollEnabled={true}
      nestedScrollEnabled={true}
    />
  );
};

import { TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 8,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.text_secondary,
    textAlign: "center",
  },
  loadingText: {
    fontSize: 14,
    color: COLORS.text_secondary,
    marginTop: 12,
  },
  errorText: {
    fontSize: 14,
    color: COLORS.danger,
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 6,
    marginTop: 12,
  },
  retryText: {
    color: COLORS.background,
    fontWeight: "600",
  },
});
