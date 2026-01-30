// constants/api.ts
export const API_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5025/api/todos',
  TIMEOUT: 10000,
  RETRY_COUNT: 3,
  RETRY_DELAY: 1000,
};
console.log('🔧 API_CONFIG.BASE_URL:', API_CONFIG.BASE_URL);
export const API_ENDPOINTS = {
  TODOS: {
    LIST: '/todos',
    GET: (id: number) => `/todos/${id}`,
    CREATE: '/todos/create-todo',
    UPDATE: (id: number) => `/todos/${id}`,
    DELETE: (id: number) => `/todos/${id}`,
    STATS: '/todos/stats/active',
  },
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  NOT_FOUND: 'Todo not found.',
  EMPTY_TITLE: 'Please enter a todo title.',
  UNKNOWN_ERROR: 'An unknown error occurred.',
};