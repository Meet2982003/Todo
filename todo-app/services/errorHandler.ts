// services/errorHandler.ts
import { AxiosError } from 'axios';
import { ApiError } from '../types';
import { ERROR_MESSAGES } from '../constants/api';

export const errorHandler = {
  handle(error: unknown): ApiError {
    if (error instanceof AxiosError) {
      const status = error.response?.status;
      const message = error.response?.data?.message || error.message;

      return {
        message: this.getErrorMessage(status, message),
        code: error.code,
        status,
      };
    }

    if (error instanceof Error) {
      return {
        message: error.message,
      };
    }

    return {
      message: ERROR_MESSAGES.UNKNOWN_ERROR,
    };
  },

   getErrorMessage(status?: number, defaultMessage?: string): string {
    switch (status) {
      case 400:
        return 'Bad request';
      case 401:
        return 'Unauthorized';
      case 403:
        return 'Forbidden';
      case 404:
        return ERROR_MESSAGES.NOT_FOUND;
      case 500:
        return ERROR_MESSAGES.SERVER_ERROR;
      case 503:
        return 'Service unavailable';
      default:
        return defaultMessage || ERROR_MESSAGES.UNKNOWN_ERROR;
    }
  },
};