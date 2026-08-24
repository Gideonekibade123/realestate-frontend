import { API } from "./api";

export async function authFetch(url, options = {}, auth) {
  const { token, refreshToken, updateToken, logout } = auth;

  const doFetch = (accessToken) =>
    fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${accessToken}`,
      },
    });

  let res = await doFetch(token);

  if (res.status === 401) {
    if (!refreshToken) {
      logout();
      throw new Error("Session expired. Please log in again.");
    }

    const refreshRes = await fetch(API.tokenRefresh, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!refreshRes.ok) {
      logout();
      throw new Error("Session expired. Please log in again.");
    }

    const refreshData = await refreshRes.json();
    updateToken(refreshData.access);

    res = await doFetch(refreshData.access);
  }

  return res;
}