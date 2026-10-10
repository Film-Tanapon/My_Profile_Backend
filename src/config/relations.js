const relations = {
  "project-tech-stacks": { model: "projectTechStack", keys: ["projectId", "techstackId"], data: ["usageType", "displayOrder"] },
  "intern-tech-stacks": { model: "internTechStack", keys: ["internId", "techstackId"], data: ["usageType", "displayOrder"] },
  "event-tech-stacks": { model: "eventTechStack", keys: ["eventId", "techstackId"], data: ["usageType", "displayOrder"] },
  "intern-projects": { model: "internProject", keys: ["internId", "projectId"], data: [] },
  "event-projects": { model: "eventProject", keys: ["eventId", "projectId"], data: [] },
};


module.exports=relations;
