/**
 * API Client with Request/Response Interceptors
 * Handles authentication, error handling, and request/response transformation
 */

import { API_CONFIG, STORAGE_KEYS } from '../config/apiConfig';

class APIClient {
  constructor(config = API_CONFIG) {
    this.baseURL = config.baseURL;
    this.timeout = config.timeout;
    this.retries = config.retries;
    this.retryDelay = config.retryDelay;
    this.token = null;
    this.refreshToken = null;
    this.loadTokens();
  }

  /**
   * Load tokens from localStorage
   */
  loadTokens() {
    this.token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    this.refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  /**
   * Save tokens to localStorage
   */
  saveTokens(token, refreshToken) {
    this.token = token;
    this.refreshToken = refreshToken;
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    if (refreshToken) {
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    }
  }

  /**
   * Clear tokens from storage
   */
  clearTokens() {
    this.token = null;
    this.refreshToken = null;
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  /**
   * Build request headers with auth token
   */
  buildHeaders(headers = {}) {
    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...headers,
    };

    if (this.token) {
      defaultHeaders.Authorization = `Bearer ${this.token}`;
    }

    return defaultHeaders;
  }

  /**
   * Make a request with retry logic
   */
  async request(endpoint, options = {}, retryCount = 0) {
    const url = `${this.baseURL}${endpoint}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        headers: this.buildHeaders(options.headers),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      // Handle 401 Unauthorized - try to refresh token
      if (response.status === 401 && this.refreshToken) {
        const refreshed = await this.refreshAccessToken();
        if (refreshed && retryCount < this.retries) {
          await new Promise(resolve => setTimeout(resolve, this.retryDelay));
          return this.request(endpoint, options, retryCount + 1);
        }
      }

      return this.handleResponse(response);
    } catch (error) {
      clearTimeout(timeout);

      // Retry on network error
      if (retryCount < this.retries && error.name !== 'AbortError') {
        await new Promise(resolve => 
          setTimeout(resolve, this.retryDelay * Math.pow(2, retryCount))
        );
        return this.request(endpoint, options, retryCount + 1);
      }

      throw this.handleError(error);
    }
  }

  /**
   * Handle API response
   */
  async handleResponse(response) {
    let data;
    const contentType = response.headers.get('content-type');

    if (contentType?.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      const error = new Error(data.message || 'API Error');
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  }

  /**
   * Handle errors
   */
  handleError(error) {
    if (error.name === 'AbortError') {
      return new Error('Request timeout');
    }

    if (error instanceof TypeError) {
      return new Error('Network error. Please check your connection.');
    }

    return error;
  }

  /**
   * Refresh access token
   */
  async refreshAccessToken() {
    try {
      const response = await fetch(`${this.baseURL}/api/v1/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.refreshToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        this.saveTokens(data.token, data.refresh_token || this.refreshToken);
        return true;
      }

      this.clearTokens();
      return false;
    } catch (_err) {
      this.clearTokens();
      return false;
    }
  }

  /**
   * GET request
   */
  get(endpoint, headers) {
    return this.request(endpoint, { method: 'GET', headers });
  }

  /**
   * POST request
   */
  post(endpoint, data, headers) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      headers,
    });
  }

  /**
   * PUT request
   */
  put(endpoint, data, headers) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers,
    });
  }

  /**
   * DELETE request
   */
  delete(endpoint, headers) {
    return this.request(endpoint, { method: 'DELETE', headers });
  }

  /**
   * PATCH request
   */
  patch(endpoint, data, headers) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers,
    });
  }
}

// Export singleton instance
export const apiClient = new APIClient();
export default APIClient;
