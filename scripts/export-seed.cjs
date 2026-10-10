const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const models = ['profile','socialLink','education','techStack','project','intern','event','projectTechStack','internTechStack','eventTechStack','internProject','eventProject'];
const imageFields = new Set(['profileImageURL','coverImageURL','institutionLogoURL','iconURL','imageURL','gallery','companyLogoURL']);
async function main() {
  const data = await prisma.$transaction(async tx => {
    const snapshot = {};
    for (const model of models) {
      snapshot[model] = (await tx[model].findMany()).map(row => Object.fromEntries(Object.entries(row).filter(([key]) => !imageFields.has(key) && !['createdAt','updatedAt'].includes(key))));
    }
    return snapshot;
  }, { isolationLevel: 'RepeatableRead' });
  process.stdout.write(JSON.stringify(data, null, 2));
}
main().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => prisma.$disconnect());
