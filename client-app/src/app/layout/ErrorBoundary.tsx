import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
  // Define any props required by your ErrorBoundary component
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ hasError: true, error });
    // You can log the error to a logging service here if needed
  }

  render() {
    if (this.state.hasError) {
      // You can customize the error UI here
      return <div>An error occurred: {this.state.error?.message}</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
