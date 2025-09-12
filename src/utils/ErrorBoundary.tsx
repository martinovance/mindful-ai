import { ErrorFallback } from "@/shared/GlobalErrorBoundary";
import { ErrorBoundary } from "react-error-boundary";

export const DashboardErrorBoundary = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <ErrorBoundary
    FallbackComponent={({ error, resetErrorBoundary }) => (
      <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
    )}
    onError={(error, info) => {
      console.error("Dashboard crashed:", error, info);
    }}
  >
    {children}
  </ErrorBoundary>
);

export const ProfileErrorBoundary = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <ErrorBoundary
    FallbackComponent={({ error, resetErrorBoundary }) => (
      <div role="alert" className="p-6 text-center text-red-600">
        <h2 className="text-lg font-bold mb-2">Profile couldn’t load</h2>
        <p className="mb-2 text-sm">Please refresh or try again later.</p>
        <pre className="text-xs mb-4">{error?.message ?? "Unknown error"}</pre>
        <button
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    )}
    onError={(error, info) => {
      console.error("Profile section crashed:", error, info);
    }}
  >
    {children}
  </ErrorBoundary>
);

export const SessionsErrorBoundary = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <ErrorBoundary
    FallbackComponent={({ error, resetErrorBoundary }) => (
      <div role="alert" className="p-6 text-center text-red-600">
        <h2 className="text-lg font-bold mb-2">Sessions unavailable</h2>
        <p className="mb-2 text-sm">We couldn’t load your session data.</p>
        <pre className="text-xs mb-4">{error?.message ?? "Unknown error"}</pre>
        <button
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Reload
        </button>
      </div>
    )}
    onError={(error, info) => {
      console.error("Sessions crashed:", error, info);
    }}
  >
    {children}
  </ErrorBoundary>
);
