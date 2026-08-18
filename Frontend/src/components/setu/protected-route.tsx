import { useEffect, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { isAllowed, type UserRole } from "@/lib/auth";

interface ProtectedRouteProps {
  /** Roles that are allowed to access this route */
  allowedRoles: UserRole[];
  children: ReactNode;
}

/**
 * Wraps a page component with authentication + role checks.
 *
 * Behaviour:
 * - While session is resolving → show a centered spinner
 * - Not authenticated → redirect to /login
 * - Authenticated but wrong role → show 403 Forbidden page
 * - Authenticated and correct role → render children
 */
export function ProtectedRoute({ allowedRoles, children }: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      void navigate({ to: "/login" });
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <span className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-xs text-muted-foreground">Verifying session…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    // Render a blank placeholder while navigate() takes effect
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <span className="text-xs text-muted-foreground">Redirecting…</span>
      </div>
    );
  }

  if (!isAllowed(user.role, allowedRoles)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-sm text-center">
          <div className="mx-auto mb-4 grid size-16 place-items-center rounded-2xl bg-risk-soft text-2xl font-bold text-risk-foreground">
            403
          </div>
          <h1 className="text-xl font-bold text-foreground">Access Denied</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your account (<code className="font-mono text-xs">{user.role}</code>) doesn't have
            permission to view this page.
          </p>
          <a
            href="/login"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-white hover:bg-primary-dark"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
