import React from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, info) {
        console.error("ErrorBoundary caught an error:", error, info);
    }

    render() {
        if (this.state.hasError) {
            const isChunkLoadError =
                this.state.error?.message?.includes("Loading chunk");

            return (
                <div style={{ textAlign: "center", padding: "2rem" }}>
                    {isChunkLoadError ? (
                        <>
                            <h1>Oops! A part of the app failed to load.</h1>
                            <p>Please refresh the page to try again.</p>
                            <button onClick={() => window.location.reload()}>
                                Refresh Page
                            </button>
                        </>
                    ) : (
                        <>
                            <h1>Something went wrong.</h1>
                            <p>
                                We're working to fix it. Please try again later.
                            </p>
                            <Link to={"/"}>Go to home page</Link>
                        </>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
