// services/collaboration-service/test-crud.js
const researcherCrud = require('./researcher-crud');
const projectCrud = require('./project-crud');
const relationCrud = require('./relation-crud');

async function main() {
  console.log('--- Test CRUD Operations ---');

  try {
    // 1️⃣ جلب كل الباحثين الحاليين
    const allResearchers = await researcherCrud.getAllResearchers();
    console.log('All researchers:', allResearchers);

    // 2️⃣ إنشاء باحث جديد
    const newResearcher = { name: 'Lina', id: 'R4' };
    await researcherCrud.createResearcher(newResearcher.name, newResearcher.id);
    console.log('New researcher created:', newResearcher);

    // 3️⃣ ربط الباحث الجديد بالمشاريع الموجودة
    const allProjects = await projectCrud.getAllProjects();
    for (const project of allProjects) {
      await relationCrud.createResearcherProjectRelation(newResearcher.id, project.id);
    }
    console.log(`Researcher ${newResearcher.id} linked to all existing projects.`);

    // 4️⃣ ربط الباحث الجديد بالباحثين الحاليين (علاقات تعاون)
    for (const researcher of allResearchers) {
      await relationCrud.createResearcherRelation(newResearcher.id, researcher.id);
    }
    console.log(`Researcher ${newResearcher.id} linked to all existing researchers.`);

    // 5️⃣ جلب كل علاقات الباحثين بالمشاريع للتأكد
    const allRelations = await relationCrud.getAllResearcherProjectRelations();
    console.log('All researcher-project relations:', allRelations);

  } catch (error) {
    console.error('Error during CRUD test:', error);
  }
}

main();