const KEY = "missionly_auth";

export function getAuth() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || null;
  } catch {
    return null;
  }
}

export function setAuth(user) {
  localStorage.setItem(KEY, JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem(KEY);
}