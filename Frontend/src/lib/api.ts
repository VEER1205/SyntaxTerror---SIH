// Grabs the base URL from your .env file using bracket notation, or defaults to localhost
export const API_BASE_URL = import.meta.env['VITE_API_URL'] || "http://localhost:8000";

/**
 * A wrapper around fetch() that automatically prepends the backend URL
 */
export async function fetchFromAPI(endpoint: string, options?: RequestInit) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}