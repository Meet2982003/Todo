// types/todo.ts
export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoPayload {
  title: string;
  description?: string;
}

export interface UpdateTodoPayload {
  title?: string;
  description?: string;
  completed?: boolean;
}

export interface TodoFilter {
  status: 'all' | 'active' | 'completed';
  searchText: string;
}