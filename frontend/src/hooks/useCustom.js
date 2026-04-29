/**
 * Custom Hooks
 * Reusable hooks for common frontend operations
 */

import { useState, useCallback, useEffect } from 'react';
import { apiClient } from '../api/apiClient';
import { STORAGE_KEYS } from '../config/apiConfig';

/**
 * useAuth Hook - Manage authentication state
 */
export function useAuth() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      try {
        const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
        const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
        
        if (userData && token) {
          setUser(JSON.parse(userData));
          setIsAuthenticated(true);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.post('/api/v1/auth/login', {
        email,
        password,
      });
      apiClient.saveTokens(response.token, response.refresh_token);
      setUser(response.user);
      setIsAuthenticated(true);
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.user));
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    apiClient.clearTokens();
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  }, []);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
  };
}

/**
 * useFetch Hook - Handle async data fetching
 */
export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get(url);
        if (isMounted) {
          setData(response);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setData(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (url) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [url, options.skip]);

  const refetch = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get(url);
      setData(response);
      setError(null);
    } catch (err) {
      setError(err);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  return { data, isLoading, error, refetch };
}

/**
 * useAsync Hook - Generic async operation hook
 */
export function useAsync(asyncFunction, immediate = true) {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setStatus('pending');
    setData(null);
    setError(null);
    try {
      const response = await asyncFunction(...args);
      setData(response);
      setStatus('success');
      return response;
    } catch (err) {
      setError(err);
      setStatus('error');
      throw err;
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      asyncFunction().then(response => {
        setData(response);
        setStatus('success');
      }).catch(err => {
        setError(err);
        setStatus('error');
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { execute, status, data, error };
}

/**
 * useLocalStorage Hook - Manage localStorage
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (_err) {
      console.error(_err);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (_err) {
      console.error(_err);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}

/**
 * useDebounce Hook - Debounce value changes
 */
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

/**
 * usePrevious Hook - Track previous value
 */
// Note: `usePrevious` removed — not used in the codebase to avoid lint rules
