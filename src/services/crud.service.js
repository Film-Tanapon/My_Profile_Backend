const prisma = require('../config/prisma');
const parseValue = require('../utils/parse-value');
module.exports = function createCrudService({model,idField,fields,include,orderBy,searchFields=[],editableRelations={}}) {
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

  return {
    list(query) {
      const where=query && searchFields.length ? {OR:searchFields.map(field=>({[field]:{contains:query,mode:'insensitive'}}))} : undefined;
      return delegate.findMany({where,include,orderBy});
    },
    get(id) { return delegate.findUnique({where:{[idField]:id},include}); },
    save,
    remove(id) { return delegate.delete({where:{[idField]:id}}); }
  };
};
