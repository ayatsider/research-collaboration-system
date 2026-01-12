const researcherCrud = require('./researcher-crud');
const projectCrud = require('./project-crud');
const relationCrud = require('./relation-crud');

async function seedData() {
  // حذف كل شيء
  const driver = require('./neo4j');
  const session = driver.session();
  await session.run('MATCH (n) DETACH DELETE n');
  await session.close();

  // إنشاء باحثين
  const researchers = [
    { name: 'Eman', id: 'R1' },
    { name: 'Ayat', id: 'R2' },
    { name: 'Sara', id: 'R3' },
  ];

  for (const r of researchers) {
    await researcherCrud.createResearcher(r.name, r.id);
  }

  // إنشاء مشاريع
  const projects = [
    { title: 'AI Project', id: 'P1' },
    { title: 'Cybersecurity Project', id: 'P2' },
  ];

  for (const p of projects) {
    await projectCrud.createProject(p.title, p.id);
  }

  // إنشاء علاقات جاهزة
  await relationCrud.createRelation('Researcher', 'R1', 'Project', 'P1', 'WORKS_ON');
  await relationCrud.createRelation('Researcher', 'R2', 'Project', 'P2', 'WORKS_ON');

  console.log('Seed data created successfully.');
}

seedData();

