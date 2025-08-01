import React from 'react';

export class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any, info: any) {
    // Optionally log error
  }
  render() {
    if (this.state.hasError) {
      return <div className="p-8 text-red-700 bg-red-100 rounded">Something went wrong. Please reload the page.</div>;
    }
    return this.props.children;
  }
}