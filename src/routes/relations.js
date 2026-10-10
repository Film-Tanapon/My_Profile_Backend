const express = require("express");
const prisma = require("../prisma");
const router = express.Router();

const relations = {
  "project-tech-stacks": { model: "projectTechStack", keys: ["projectId", "techstackId"], data: ["usageType", "displayOrder"] },
  "intern-tech-stacks": { model: "internTechStack", keys: ["internId", "techstackId"], data: ["usageType", "displayOrder"] },
  "event-tech-stacks": { model: "eventTechStack", keys: ["eventId", "techstackId"], data: ["usageType", "displayOrder"] },
  "intern-projects": { model: "internProject", keys: ["internId", "projectId"], data: [] },
  "event-projects": { model: "eventProject", keys: ["eventId", "projectId"], data: [] },
};

router.get("/:relation", async (req, res, next) => { try {
  const config = relations[req.params.relation];
  if (!config) return res.status(404).json({ success: false, message: "Relation not found" });
  res.json({ success: true, data: await prisma[config.model].findMany() });
} catch (error) { next(error); } });

router.post("/:relation", async (req, res, next) => { try {
  const config = relations[req.params.relation];
  if (!config) return res.status(404).json({ success: false, message: "Relation not found" });
  const data = {};
  for (const key of config.keys) {
    if (req.body[key] === undefined) return res.status(400).json({ success: false, message: `${key} is required` });
    data[key] = Number(req.body[key]);
  }
  for (const field of config.data) if (req.body[field] !== undefined) data[field] = field === "displayOrder" ? Number(req.body[field]) : req.body[field];
  res.status(201).json({ success: true, data: await prisma[config.model].create({ data }) });
} catch (error) { next(error); } });

router.delete("/:relation", async (req, res, next) => { try {
  const config = relations[req.params.relation];
  if (!config) return res.status(404).json({ success: false, message: "Relation not found" });
  const values = config.keys.map((key) => Number(req.query[key]));
  if (values.some(Number.isNaN)) return res.status(400).json({ success: false, message: `Query requires ${config.keys.join(" and ")}` });
  await prisma[config.model].deleteMany({ where: Object.fromEntries(config.keys.map((key, index) => [key, values[index]])) });
  res.json({ success: true, message: "Relation deleted successfully" });
} catch (error) { next(error); } });

module.exports = router;
