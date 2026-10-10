require('dotenv/config');
const fs = require('node:fs');
const path = require('node:path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const snapshot = JSON.parse(fs.readFileSync(path.join(__dirname, 'seed-data.json'), 'utf8').replace(/^\uFEFF/, ''));
const entities = [
  ['profile', 'profileId', 'profiles'], ['techStack', 'techstackId', 'tech_stacks'],
  ['project', 'projectId', 'projects'], ['intern', 'internId', 'internships'],
  ['event', 'eventId', 'events'], ['socialLink', 'socialLinkId', 'social_links'],
  ['education', 'educationId', 'educations'],
];
const relations = {
  projectTechStack: ['projectId', 'techstackId'], internTechStack: ['internId', 'techstackId'],
  eventTechStack: ['eventId', 'techstackId'], internProject: ['internId', 'projectId'],
  eventProject: ['eventId', 'projectId'],
};
const dateFields = ['startDate', 'endDate'];
async function main() {
  await prisma.$transaction(async tx => {
    const ids = {};
    for (const [model, id, table] of entities) {
      ids[id] = new Map();
      for (const source of snapshot[model]) {
        const { [id]: originalId, ...data } = source;
        for (const field of dateFields) if (data[field]) data[field] = new Date(data[field]);
        if (data.profileId != null) data.profileId = ids.profileId.get(data.profileId);
        let where;
        if (model === 'techStack' || model === 'project') where = { slug: data.slug };
        else if (model === 'socialLink') where = { profileId_platform: { profileId: data.profileId, platform: data.platform } };
        else if (model === 'intern') {
          const existing = await tx.intern.findFirst({ where: { companyName: data.companyName, startDate: data.startDate, endDate: data.endDate } });
          where = { [id]: existing?.[id] ?? originalId };
        } else if (model === 'event') {
          const existing = await tx.event.findFirst({ where: { title: data.title, startDate: data.startDate } });
          where = { [id]: existing?.[id] ?? originalId };
        } else where = { [id]: originalId };
        const row = await tx[model].upsert({ where, create: { [id]: originalId, ...data }, update: data });
        ids[id].set(originalId, row[id]);
      }
      // Explicit snapshot IDs must not cause future inserts to reuse an existing ID.
      await tx.$executeRawUnsafe(`SELECT setval(pg_get_serial_sequence('"${table}"', '${id === 'techstackId' ? 'techstack_id' : id.replace(/Id$/, '_id').replace(/([A-Z])/g, '_$1').toLowerCase()}'), COALESCE((SELECT MAX("${id === 'techstackId' ? 'techstack_id' : id.replace(/Id$/, '_id').replace(/([A-Z])/g, '_$1').toLowerCase()}") FROM "${table}"), 1), EXISTS (SELECT 1 FROM "${table}"))`);
    }
    for (const [model, fields] of Object.entries(relations)) {
      for (const source of snapshot[model]) {
        const data = { ...source };
        for (const field of fields) {
          data[field] = ids[field].get(source[field]);
          if (data[field] == null) throw new Error(`Missing ${field} for ${model}`);
        }
        const key = Object.fromEntries(fields.map(field => [field, data[field]]));
        await tx[model].upsert({ where: { [fields.join('_')]: key }, create: data, update: data });
      }
    }
  }, { timeout: 60000 });
  console.log('Seeded Docker snapshot:', Object.fromEntries(Object.entries(snapshot).map(([model, rows]) => [model, rows.length])));
}
main().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => prisma.$disconnect());
