const createCrudRouter = require("./crud");
module.exports = createCrudRouter({
  model: "project", idField: "projectId", editableRelations: { techStacks: "projectTechStack" },
  fields: { title: { required: true }, slug: { required: true }, shortDescription: {}, description: {}, role: {}, status: {}, imageURL: {}, themeColor: { type: "color" }, dotColor: { type: "color" }, fontColor: { type: "color" }, gallery: { type: "stringArray" }, webURL: {}, repositoryURL: {}, startDate: { type: "date" }, endDate: { type: "date" }, featured: { type: "boolean" }, displayOrder: { type: "int" } },
  include: { techStacks: { include: { techStack: true }, orderBy: { displayOrder: "asc" } }, internships: true, events: true },
  orderBy: [{ displayOrder: "asc" }, { startDate: "desc" }], searchFields: ["title", "description", "role"],
});
