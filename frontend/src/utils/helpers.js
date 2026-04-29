/**
 * Utility Functions
 * Helper functions for common operations
 */

/**
 * Format date to readable string
 */
export function formatDate(date, format = 'MMM DD, YYYY') {
  if (!date) return '';
  
  const d = new Date(date);
  const month = d.toLocaleString('default', { month: 'short' });
  const day = String(d.getDate()).padStart(2, '0');
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  
  return format
    .replace('MMM', month)
    .replace('DD', day)
    .replace('YYYY', year)
    .replace('HH', hours)
    .replace('mm', minutes);
}

/**
 * Format time duration
 */
export function formatDuration(ms) {
  if (ms < 1000) return `${Math.round(ms)}ms`;
  if (ms < 60000) return `${Math.round(ms / 1000)}s`;
  if (ms < 3600000) return `${Math.round(ms / 60000)}m`;
  return `${Math.round(ms / 3600000)}h`;
}

/**
 * Format number with comma separators
 */
export function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Format currency
 */
export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

/**
 * Truncate text
 */
export function truncateText(text, length = 50) {
  if (!text) return '';
  return text.length > length ? `${text.substring(0, length)}...` : text;
}

/**
 * Validate email
 */
export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Validate phone number
 */
export function validatePhone(phone) {
<<<<<<< Updated upstream
  const re = /^[\d\s+()-]{10,}$/;
=======
  const re = /^[\d\s\-+()]{10,}$/;
>>>>>>> Stashed changes
  return re.test(phone);
}

/**
 * Get initials from name
 */
export function getInitials(name) {
  if (!name) return '?';
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

/**
 * Generate random ID
 */
export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Deep clone object
 */
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (obj instanceof Object) {
    const cloned = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepClone(obj[key]);
      }
    }
    return cloned;
  }
}

/**
 * Merge objects
 */
export function mergeObjects(target, source) {
  const result = { ...target };
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (typeof source[key] === 'object' && source[key] !== null) {
        result[key] = mergeObjects(result[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }
  }
  return result;
}

/**
 * Debounce function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function
 */
export function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Sleep/delay promise
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Get query parameter
 */
export function getQueryParam(param) {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(param);
}

/**
 * Set query parameter
 */
export function setQueryParam(param, value) {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(param, value);
  window.history.replaceState({}, '', `?${searchParams.toString()}`);
}

/**
 * Group array by property
 */
export function groupBy(array, key) {
  return array.reduce((groups, item) => {
    const group = groups[item[key]] || [];
    group.push(item);
    groups[item[key]] = group;
    return groups;
  }, {});
}

/**
 * Remove duplicates from array
 */
export function removeDuplicates(array, key) {
  const seen = new Set();
  return array.filter(item => {
    const identifier = key ? item[key] : item;
    if (seen.has(identifier)) return false;
    seen.add(identifier);
    return true;
  });
}

export default {
  formatDate,
  formatDuration,
  formatNumber,
  formatCurrency,
  truncateText,
  validateEmail,
  validatePhone,
  getInitials,
  generateId,
  deepClone,
  mergeObjects,
  debounce,
  throttle,
  sleep,
  getQueryParam,
  setQueryParam,
  groupBy,
  removeDuplicates,
};
