// components/todo/TodoInput.tsx
import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { COLORS } from "../../constants/colors";
import { PLACEHOLDERS } from "../../constants/messages";

interface TodoInputProps {
  onAdd: (title: string, description?: string) => Promise<void>;
  loading?: boolean;
}

export const TodoInput: React.FC<TodoInputProps> = ({ onAdd, loading }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAdd = async () => {
    if (!title.trim()) {
      alert("Please enter a todo title");
      return;
    }

    try {
      await onAdd(title, description);
      setTitle("");
      setDescription("");
      setIsExpanded(false);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={PLACEHOLDERS.TODO_TITLE}
          placeholderTextColor={COLORS.text_disabled}
          value={title}
          onChangeText={setTitle}
          onFocus={() => setIsExpanded(true)}
          editable={!loading}
        />
        <TouchableOpacity
          style={[styles.addButton, loading && styles.addButtonDisabled]}
          onPress={handleAdd}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.background} />
          ) : (
            <Text style={styles.addButtonText}>+</Text>
          )}
        </TouchableOpacity>
      </View>

      {isExpanded && (
        <TextInput
          style={styles.descriptionInput}
          placeholder={PLACEHOLDERS.TODO_DESCRIPTION}
          placeholderTextColor={COLORS.text_disabled}
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={2}
          editable={!loading}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: COLORS.text_primary,
  },
  descriptionInput: {
    marginTop: 8,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: COLORS.text_primary,
    maxHeight: 80,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonDisabled: {
    opacity: 0.6,
  },
  addButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.background,
  },
});
