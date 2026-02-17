import { apiGet } from "./api.js";

export async function getMissions({ q = "", category = "all", page = 1, perPage = 6 } = {}) {
  const params = new URLSearchParams({
    q,
    category,
    page: String(page),
    perPage: String(perPage),
  });

  return apiGet(`/api/missions?${params.toString()}`);
}

export async function getMissionById(id) {
  return apiGet(`/api/missions/${id}`);
}
