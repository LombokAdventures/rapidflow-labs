import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    console.error("[ErrorBoundary] Error caught:", error);
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[ErrorBoundary] Uncaught error:", error);
    console.error("[ErrorBoundary] Error info:", errorInfo);
    console.error("[ErrorBoundary] Component stack:", errorInfo.componentStack);

    this.setState({
      error,
      errorInfo,
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          backgroundColor: "#1a1625",
          color: "#fff",
          fontFamily: "system-ui, -apple-system, sans-serif"
        }}>
          <div style={{
            maxWidth: "600px",
            padding: "2rem",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            borderRadius: "1rem",
            border: "1px solid rgba(255, 255, 255, 0.1)"
          }}>
            <h1 style={{
              fontSize: "2rem",
              fontWeight: "700",
              marginBottom: "1rem",
              background: "linear-gradient(to right, #9b87f5, #7dd3fc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Oops! Something went wrong
            </h1>
            <p style={{
              marginBottom: "1.5rem",
              color: "rgba(255, 255, 255, 0.7)",
              lineHeight: "1.6"
            }}>
              We encountered an error while loading the page. Please try refreshing the browser.
            </p>
            <details style={{
              marginTop: "1rem",
              padding: "1rem",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
              color: "rgba(255, 255, 255, 0.6)"
            }}>
              <summary style={{ cursor: "pointer", fontWeight: "600", marginBottom: "0.5rem" }}>
                Error Details (for developers)
              </summary>
              <pre style={{
                overflow: "auto",
                padding: "0.5rem",
                fontSize: "0.75rem",
                lineHeight: "1.4"
              }}>
                {this.state.error && this.state.error.toString()}
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </details>
            <button
              onClick={() => window.location.reload()}
              style={{
                marginTop: "1.5rem",
                padding: "0.75rem 1.5rem",
                background: "linear-gradient(to right, #9b87f5, #7dd3fc)",
                border: "none",
                borderRadius: "0.5rem",
                color: "#fff",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "1rem"
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
