/**
 * Error Boundary Component
 * Catches and handles errors in component tree
 */

import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0,
    };
  }

  static getDerivedStateFromError(_error) {
    return { hasError: true };
  }

<<<<<<< Updated upstream
  componentDidCatch(_error, _errorInfo) {
=======
  componentDidCatch(_error, errorInfo) {
    this.setState(prevState => ({
      error: _error,
      errorInfo,
      errorCount: prevState.errorCount + 1,
    }));
  }

  componentDidCatch(error, errorInfo) {
>>>>>>> Stashed changes
    this.setState(prevState => ({
      error: _error,
      errorInfo: _errorInfo,
      errorCount: prevState.errorCount + 1,
    }));

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', _error, _errorInfo);
    }

    // You can also log error to an error reporting service here
    // reportErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>

            <h1 className="mt-4 text-xl font-semibold text-center text-gray-900">
              Something went wrong
            </h1>

            <p className="mt-2 text-sm text-center text-gray-600">
              We're sorry for the inconvenience. An error occurred while rendering this page.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mt-4 p-3 bg-gray-100 rounded border border-gray-300">
                <p className="text-xs font-mono text-red-600 overflow-auto max-h-32">
                  {this.state.error.toString()}
                </p>
              </div>
            )}

            <div className="mt-6 flex gap-3">
              <button
                onClick={this.handleReset}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Try again
              </button>

              <button
                onClick={() => (window.location.href = '/')}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition"
              >
                Go Home
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <p className="mt-4 text-xs text-center text-gray-500">
                Error Count: {this.state.errorCount}
              </p>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
