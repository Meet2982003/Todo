// app/(tabs)/index.tsx
import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { TodoInput } from "../../components/todo/TodoInput";
import { TodoList } from "../../components/todo/TodoList";
import { COLORS } from "../../constants/colors";
import { useTodos } from "../../hooks/useTodos";
import { TodoHeader } from "../../components/todo/TodoHeader";

export default function HomeScreen() {
  const {
    todos,
    loading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    fetchTodos,
  } = useTodos();

  const activeCount = todos.filter((t) => !t.completed).length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <TodoHeader activeCount={activeCount} totalCount={todos.length} />
      <TodoInput
        onAdd={(title: string, description?: string) =>
          addTodo({ title, description })
        }
        loading={loading}
      />
      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        loading={loading}
        error={error}
        onRetry={fetchTodos}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
