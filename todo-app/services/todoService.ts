// services/todoService.ts
import { apiClient } from './api';
import { API_ENDPOINTS } from '../constants/api';
import { Todo, CreateTodoPayload, UpdateTodoPayload } from '../types';

export const todoService = {
  // Get all todos
  async getAllTodos(): Promise<Todo[]> {
    try {
      const response = await apiClient.get<Todo[]>(API_ENDPOINTS.TODOS.LIST);
      return response.data;
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  },

  // Get single todo
  async getTodoById(id: number): Promise<Todo> {
    try {
      const response = await apiClient.get<Todo>(API_ENDPOINTS.TODOS.GET(id));
      return response.data;
    } catch (error) {
      console.error(`Error fetching todo ${id}:`, error);
      throw error;
    }
  },

  // Create todo
  async createTodo(payload: CreateTodoPayload): Promise<Todo> {
    try {
      const response = await apiClient.post<Todo>(
        API_ENDPOINTS.TODOS.CREATE,
        payload
      );
      console.log('✅ Todo created:', response.data.id);
      return response.data;
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  },

  // Update todo
  async updateTodo(id: number, payload: UpdateTodoPayload): Promise<Todo> {
    try {
      const response = await apiClient.put<Todo>(
        API_ENDPOINTS.TODOS.UPDATE(id),
        payload
      );
      console.log('✅ Todo updated:', id);
      return response.data;
    } catch (error) {
      console.error(`Error updating todo ${id}:`, error);
      throw error;
    }
  },

  // Delete todo
  async deleteTodo(id: number): Promise<void> {
    try {
      await apiClient.delete(API_ENDPOINTS.TODOS.DELETE(id));
      console.log('✅ Todo deleted:', id);
    } catch (error) {
      console.error(`Error deleting todo ${id}:`, error);
      throw error;
    }
  },

  // Get active todos count
  async getActiveCount(): Promise<number> {
    try {
      const response = await apiClient.get<number>(API_ENDPOINTS.TODOS.STATS);
      return response.data;
    } catch (error) {
      console.error('Error fetching active count:', error);
      throw error;
    }
  },
};