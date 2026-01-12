// services/collaboration-service/project-crud.js
const driver = require('./neo4j'); // نتأكد إنه نفس الملف neo4j.js

// إنشاء مشروع جديد
async function createProject(title, id) {
  const session = driver.session({ database: process.env.NEO4J_DATABASE || 'neo4j' });
  try {
    await session.run(
      'CREATE (:Project {title: $title, id: $id})',
      { title, id }
    );
    console.log(`Project ${title} created.`);
  } catch (error) {
    console.error('Error creating project:', error);
  } finally {
    await session.close();
  }
}

// جلب كل المشاريع
async function getAllProjects() {
  const session = driver.session({ database: process.env.NEO4J_DATABASE || 'neo4j' });
  try {
    const result = await session.run('MATCH (p:Project) RETURN p.title AS title, p.id AS id');
    return result.records.map(record => ({
      title: record.get('title'),
      id: record.get('id')
    }));
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  } finally {
    await session.close();
  }
}

// جلب مشروع حسب العنوان
async function getProjectByTitle(title) {
  const session = driver.session({ database: process.env.NEO4J_DATABASE || 'neo4j' });
  try {
    const result = await session.run(
      'MATCH (p:Project {title: $title}) RETURN p.title AS title, p.id AS id',
      { title }
    );
    if (result.records.length === 0) return null;
    const record = result.records[0];
    return { title: record.get('title'), id: record.get('id') };
  } catch (error) {
    console.error('Error fetching project by title:', error);
    return null;
  } finally {
    await session.close();
  }
}

// تحديث رقم المشروع
async function updateProjectId(title, newId) {
  const session = driver.session({ database: process.env.NEO4J_DATABASE || 'neo4j' });
  try {
    const result = await session.run(
      'MATCH (p:Project {title: $title}) SET p.id = $newId RETURN p.title AS title, p.id AS id',
      { title, newId }
    );
    if (result.records.length === 0) return null;
    const record = result.records[0];
    console.log(`Updated ${title}: ${record.get('id')}`);
    return { title: record.get('title'), id: record.get('id') };
  } catch (error) {
    console.error('Error updating project ID:', error);
    return null;
  } finally {
    await session.close();
  }
}

// حذف مشروع
async function deleteProject(title) {
  const session = driver.session({ database: process.env.NEO4J_DATABASE || 'neo4j' });
  try {
    await session.run(
      'MATCH (p:Project {title: $title}) DETACH DELETE p',
      { title }
    );
    console.log(`Project ${title} deleted.`);
  } catch (error) {
    console.error('Error deleting project:', error);
  } finally {
    await session.close();
  }
}

module.exports = {
  createProject,
  getAllProjects,
  getProjectByTitle,
  updateProjectId,
  deleteProject
};
