"use server";

import { getSession } from "./auth";

const API_HOST = "https://admin-dashboard-4kfg.onrender.com";

export async function fetchData(
  url: string,
  method: "GET" | "POST" | "PATCH" | "DELETE" = "GET",
  ttlInHrs = 1,
  body: any = null,
  headers: Record<string, string> = {},
  nextCacheConfig: RequestInit["next"] = {}
) {
  const session = await getSession();
  const token = session?.token;

  const requestHeaders: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...headers,
  };

  const config: RequestInit = {
    method,
    headers: requestHeaders,
    ...(body && { body: JSON.stringify(body) }),
    next: {
      revalidate: 3600 * ttlInHrs,
      ...nextCacheConfig,
    },
  };

  try {
    const res = await fetch(`${API_HOST}${url}`, config);
    if (!res.ok) {
      const err = await res.json();
      throw err;
    }
    return await res.json();
  } catch (err) {
    throw err;
  }
}
