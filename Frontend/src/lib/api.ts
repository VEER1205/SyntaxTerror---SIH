const API_BASE_URL = import.meta.env['VITE_API_URL'] || "http://localhost:8000";

/**
 * A wrapper around fetch() that automatically prepends the backend URL.
 * Always sends cookies (credentials: "include") so the JWT cookie is forwarded
 * on every cross-origin request to the FastAPI backend.
 */
export async function fetchFromAPI(endpoint: string, options?: RequestInit) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    credentials: "include",   // ← required so cookies are sent cross-origin
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    // Try to pull the FastAPI `detail` field out of the error body
    let detail = response.statusText;
    try {
      const body = await response.json();
      detail = body?.detail ?? detail;
    } catch {
      // ignore JSON parse failure
    }
    throw new Error(detail);
  }

  return response.json();
}

export { API_BASE_URL };