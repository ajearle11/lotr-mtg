// src/utils/api.ts
const API_BASE = "https://magicapi-r777.onrender.com";

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${path}`;

  const isFormData = options.body instanceof FormData;

  const res = await fetch(url, {
    ...options,
    headers: {
      ...(isFormData
        ? {} 
        : { "Content-Type": "application/json" }),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export default apiFetch;
