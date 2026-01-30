// components/todo/TodoItem.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Todo } from "../../types/todo";
import { COLORS, SHADOWS } from "../../constants/colors";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number, completed: boolean) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  loading?: boolean;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  loading,
}) => {
  return (
    <View style={[styles.item, SHADOWS.small]}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => onToggle(todo.id, todo.completed)}
        disabled={loading}
      >
        <View
          style={[
            styles.checkboxInner,
            todo.completed && styles.checkboxCompleted,
          ]}
        >
          {todo.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text
          style={[styles.title, todo.completed && styles.titleCompleted]}
          numberOfLines={1}
        >
          {todo.title}
        </Text>
        {todo.description && (
          <Text
            style={[
              styles.description,
              todo.completed && styles.descriptionCompleted,
            ]}
            numberOfLines={2}
          >
            {todo.description}
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(todo.id)}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={COLORS.danger} size="small" />
        ) : (
          <Text style={styles.deleteText}>✕</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.background,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 8,
    marginHorizontal: 16,
  },
  checkbox: {
    marginRight: 12,
  },
  checkboxInner: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxCompleted: {
    backgroundColor: COLORS.primary,
  },
  checkmark: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.text_primary,
    marginBottom: 4,
  },
  titleCompleted: {
    color: COLORS.text_disabled,
    textDecorationLine: "line-through",
  },
  description: {
    fontSize: 13,
    color: COLORS.text_secondary,
  },
  descriptionCompleted: {
    color: COLORS.text_disabled,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  deleteText: {
    fontSize: 20,
    color: COLORS.danger,
    fontWeight: "bold",
  },
});
