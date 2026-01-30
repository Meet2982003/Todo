// hooks/useTodos.ts
import { useState, useCallback, useEffect } from 'react';
import { Todo, CreateTodoPayload, UpdateTodoPayload } from '../types';
import { todoService } from '../services/todoService';
import { errorHandler } from '../services/errorHandler';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch todos
  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await todoService.getAllTodos();
      setTodos(data);
    } catch (err) {
      const apiError = errorHandler.handle(err);
      setError(apiError.message);
      console.error('Fetch error:', apiError);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create todo
  const addTodo = useCallback(async (payload: CreateTodoPayload) => {
    try {
      setError(null);
      const newTodo = await todoService.createTodo(payload);
      setTodos((prev) => [newTodo, ...prev]);
      return newTodo;
    } catch (err) {
      const apiError = errorHandler.handle(err);
      setError(apiError.message);
      throw err;
    }
  }, []);

  // Update todo
  const updateTodo = useCallback(
    async (id: number, payload: UpdateTodoPayload) => {
      try {
        setError(null);
        const updated = await todoService.updateTodo(id, payload);
        setTodos((prev) =>
          prev.map((todo) => (todo.id === id ? updated : todo))
        );
        return updated;
      } catch (err) {
        const apiError = errorHandler.handle(err);
        setError(apiError.message);
        throw err;
      }
    },
    []
  );

  // Delete todo
  const deleteTodo = useCallback(async (id: number) => {
    try {
      setError(null);
      await todoService.deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      const apiError = errorHandler.handle(err);
      setError(apiError.message);
      throw err;
    }
  }, []);

  // Toggle completion
  const toggleTodo = useCallback(
    async (id: number, completed: boolean) => {
      return updateTodo(id, { completed: !completed });
    },
    [updateTodo]
  );

  // Load todos on mount
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return {
    todos,
    loading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    fetchTodos,
  };
};