import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useStore";

/**
 * useAuthGuard(options)
 * options: { redirectTo, redirectIfAuthenticated = true, redirectIfNotAuthenticated = false }
 * Devuelve { user, isAuthenticated, setAuth, clearAuth } (delegado al useAuthStore)
 */
export default function useAuthGuard(options = {}) {
  const navigate = useNavigate();
  const {
    redirectTo = null,
    redirectIfAuthenticated = false,
    redirectIfNotAuthenticated = false,
  } = options;

  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const setAuth = useAuthStore((s) => s.setAuth);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  // Run redirects on mount / when auth changes
  useEffect(() => {
    if (redirectTo) {
      if (redirectIfAuthenticated && isAuthenticated) {
        navigate(redirectTo, { replace: true });
      } else if (redirectIfNotAuthenticated && !isAuthenticated) {
        navigate(redirectTo, { replace: true });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isAuthenticated,
    redirectTo,
    redirectIfAuthenticated,
    redirectIfNotAuthenticated,
  ]);

  const logout = useCallback(() => {
    clearAuth();
    if (redirectTo) {
      navigate(redirectTo, { replace: true });
    }
  }, [clearAuth]);

  // expose store-backed API
  return { user, isAuthenticated, setAuth, clearAuth, logout };
}
