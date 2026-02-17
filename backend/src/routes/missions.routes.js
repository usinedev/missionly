import { Router } from "express";
import { MISSIONS } from "../data/missions.data.js";
import { normalizeString } from "../utils/normalize.js";

const router = Router();

router.get("/", (req, res) => {
  const q = req.query.q ?? "";
  const category = req.query.category ?? "all";
  const page = Math.max(1, parseInt(req.query.page ?? "1", 10));
  const perPage = Math.max(1, Math.min(50, parseInt(req.query.perPage ?? "6", 10)));

  const nq = normalizeString(q);

  const filtered = MISSIONS.filter((m) => {
    const matchCategory = category === "all" || m.category === category;
    const matchQuery =
      !nq ||
      normalizeString(m.title).includes(nq) ||
      normalizeString(m.company?.name).includes(nq) ||
      (m.tags || []).some((t) => normalizeString(t).includes(nq));

    return matchCategory && matchQuery;
  });

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));

  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * perPage;
  const items = filtered.slice(start, start + perPage);

  res.json({ items, page: safePage, perPage, totalPages, totalItems });
});

router.get("/:id", (req, res) => {
  const mission = MISSIONS.find((m) => m.id === req.params.id);
  if (!mission) return res.status(404).json({ message: "Mission introuvable." });
  res.json(mission);
});

export default router;
