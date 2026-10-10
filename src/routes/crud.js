const express = require("express");
const prisma = require("../prisma");

function parseValue(value, type) {
  if (value === undefined) return undefined;
  if (value === null || value === "") return type === "stringArray" ? [] : type === "string" ? "" : null;
  if (type === "color") {
    if (typeof value !== "string" || !/^#[0-9a-f]{6}$/i.test(value)) throw Object.assign(new Error("Color must be a hex color such as #191b29"), { status: 400 });
    return value.toUpperCase();
  }
  if (type === "date") return new Date(value);
  if (type === "int") return Number.parseInt(value, 10);
  if (type === "boolean") return value === true || value === "true";
  if (type === "stringArray") return Array.isArray(value) ? value : String(value).split("\n").map((item) => item.trim()).filter(Boolean);
  return value;
}

function createCrudRouter({ model, idField, fields, include, orderBy, searchFields = [], editableRelations = {} }) {
  const router = express.Router();
  const delegate = prisma[model];
  const dataFromBody = (body, partial = false) => Object.entries(fields).reduce((data, [field, config]) => {
    if (partial && body[field] === undefined) return data;
    if (!partial && body[field] === undefined && !config.required) return data;
    const parsed = parseValue(body[field], config.type || "string");
    if (config.required && (parsed === undefined || parsed === null || parsed === "")) {
      const error = new Error(`${field} is required`); error.status = 400; throw error;
    }
    if (config.values && parsed != null && !config.values.includes(parsed)) {
      const error = new Error(`${field} must be one of: ${config.values.join(", ")}`); error.status = 400; throw error;
    }
    if (parsed !== undefined) data[field] = parsed;
    return data;
  }, {});

  router.get("/", async (req, res, next) => { try {
    const query = typeof req.query.q === "string" ? req.query.q.trim() : "";
    const where = query && searchFields.length ? { OR: searchFields.map((field) => ({ [field]: { contains: query, mode: "insensitive" } })) } : undefined;
    res.json({ success: true, data: await delegate.findMany({ where, include, orderBy }) });
  } catch (error) { next(error); } });

  router.get("/:id", async (req, res, next) => { try {
    const record = await delegate.findUnique({ where: { [idField]: Number(req.params.id) }, include });
    if (!record) return res.status(404).json({ success: false, message: "Record not found" });
    res.json({ success: true, data: record });
  } catch (error) { next(error); } });


  async function save(body, recordId, partial) {
    return prisma.$transaction(async tx => {
      const data = dataFromBody(body, partial);
      const record = recordId == null ? await tx[model].create({ data }) : await tx[model].update({ where: { [idField]: recordId }, data });
      if (editableRelations.techStacks && body.techStackEntries !== undefined) {
        if (!Array.isArray(body.techStackEntries)) throw Object.assign(new Error("Invalid tech stacks"), { status: 400 });
        const entries = body.techStackEntries.map((item, index) => ({ [idField]: record[idField], techstackId: Number(item.techstackId), usageType: item.usageType || "GENERAL", displayOrder: index + 1 }));
        await tx[editableRelations.techStacks].deleteMany({ where: { [idField]: record[idField] } });
        if (entries.length) await tx[editableRelations.techStacks].createMany({ data: entries });
      }
      if (editableRelations.projects && body.linkedProjectIds !== undefined) {
        if (!Array.isArray(body.linkedProjectIds)) throw Object.assign(new Error("Invalid linked projects"), { status: 400 });
        await tx[editableRelations.projects].deleteMany({ where: { [idField]: record[idField] } });
        const entries = [...new Set(body.linkedProjectIds.map(Number))].map(projectId => ({ [idField]: record[idField], projectId }));
        if (entries.length) await tx[editableRelations.projects].createMany({ data: entries });
      }
      return tx[model].findUnique({ where: { [idField]: record[idField] }, include });
    });
  }
  router.post("/", async (req, res, next) => { try {
    res.status(201).json({ success: true, data: await save(req.body, null, false) });
  } catch (error) { next(error); } });
  router.put("/:id", async (req, res, next) => { try {
    res.json({ success: true, data: await save(req.body, Number(req.params.id), false) });
  } catch (error) { next(error); } });
  router.patch("/:id", async (req, res, next) => { try {
    res.json({ success: true, data: await save(req.body, Number(req.params.id), true) });
  } catch (error) { next(error); } });
  router.delete("/:id", async (req, res, next) => { try {
    await delegate.delete({ where: { [idField]: Number(req.params.id) } });
    res.json({ success: true, message: "Record deleted successfully" });
  } catch (error) { next(error); } });
  return router;
}

module.exports = createCrudRouter;
