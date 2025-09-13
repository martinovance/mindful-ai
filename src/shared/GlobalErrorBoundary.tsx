import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import MindLogo from "@/assets/Images/MindLogo.webp";
import { Button } from "@/components/ui/button";

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="h-screen flex flex-col items-center justify-center px-6 bg-background text-foreground">
      <div className="flex items-center gap-3">
        <img
          src={MindLogo}
          loading="lazy"
          alt="app-logo"
          className="h-10 w-10"
        />
        <p className="text-lg font-bold text-foreground">Mindful AI</p>
      </div>
      <div
        role="alert"
        className="lg:w-[800px] flex flex-col items-center justify-center p-6 text-center"
      >
        <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
        <p className="heighttext-sm mb-4 text-red-600">
          {error?.message ?? "Unknown error"}
        </p>
        <Button
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-[#0D80F2] text-white rounded-lg cursor-pointer"
        >
          Try again
        </Button>
      </div>
    </div>
  );
}

export default function AppErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) => {
        console.error("App crashed:", error, info);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
