const createCrudRouter = require("./crud");
module.exports = createCrudRouter({
  model: "event", idField: "eventId", editableRelations: { techStacks: "eventTechStack", projects: "eventProject" },
  fields: { title: { required: true }, eventType: {}, organizer: {}, description: {}, role: {}, location: {}, workMode: { type: "enum", values: ["ONSITE", "REMOTE", "HYBRID"] }, imageURL: {}, themeColor: { type: "color" }, dotColor: { type: "color" }, fontColor: { type: "color" }, gallery: { type: "stringArray" }, eventURL: {}, certificateURL: {}, result: {}, startDate: { type: "date", required: true }, endDate: { type: "date" }, featured: { type: "boolean" } },
  include: { techStacks: { include: { techStack: true }, orderBy: { displayOrder: "asc" } }, projects: true },
  orderBy: { startDate: "desc" }, searchFields: ["title", "organizer", "description", "location"],
});
