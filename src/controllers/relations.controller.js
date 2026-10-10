const service=require('../services/relations.service');
const relations=require('../config/relations');
exports.list = async (req, res, next) => { try {
  const config = relations[req.params.relation];
  if (!config) return res.status(404).json({ success: false, message: "Relation not found" });
  res.json({ success: true, data: await service.list(config) });
} catch (error) { next(error); } };

exports.create = async (req, res, next) => { try {
  const config = relations[req.params.relation];
  if (!config) return res.status(404).json({ success: false, message: "Relation not found" });
  const data = {};
  for (const key of config.keys) {
    if (req.body[key] === undefined) return res.status(400).json({ success: false, message: `${key} is required` });
    data[key] = Number(req.body[key]);
  }
  for (const field of config.data) if (req.body[field] !== undefined) data[field] = field === "displayOrder" ? Number(req.body[field]) : req.body[field];
  res.status(201).json({ success: true, data: await service.create(config,data) });
} catch (error) { next(error); } };

exports.remove = async (req, res, next) => { try {
  const config = relations[req.params.relation];
  if (!config) return res.status(404).json({ success: false, message: "Relation not found" });
  const values = config.keys.map((key) => Number(req.query[key]));
  if (values.some(Number.isNaN)) return res.status(400).json({ success: false, message: `Query requires ${config.keys.join(" and ")}` });
  await service.remove(config,values);
  res.json({ success: true, message: "Relation deleted successfully" });
} catch (error) { next(error); } };

