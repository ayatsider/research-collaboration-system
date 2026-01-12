// services/collaboration-service/researcher-crud.js
const driver = require('./neo4j'); // نتأكد إنه نفس الملف neo4j.js

// إنشاء باحث جديد
async function createResearcher(name, id) {
  const session = driver.session({ database: process.env.NEO4J_DATABASE || 'neo4j' });
  try {
    await session.run(
      'CREATE (:Researcher {name: $name, id: $id})',
      { name, id }
    );
    console.log(`Researcher ${name} created.`);
  } catch (error) {
    console.error('Error creating researcher:', error);
  } finally {
    await session.close();
  }
}

// جلب كل الباحثين
async function getAllResearchers() {
  const session = driver.session({ database: process.env.NEO4J_DATABASE || 'neo4j' });
  try {
    const result = await session.run('MATCH (r:Researcher) RETURN r.name AS name, r.id AS id');
    return result.records.map(record => ({
      name: record.get('name'),
      id: record.get('id')
    }));
  } catch (error) {
    console.error('Error fetching researchers:', error);
    return [];
  } finally {
    await session.close();
  }
}

// جلب باحث حسب الاسم
async function getResearcherByName(name) {
  const session = driver.session({ database: process.env.NEO4J_DATABASE || 'neo4j' });
  try {
    const result = await session.run(
      'MATCH (r:Researcher {name: $name}) RETURN r.name AS name, r.id AS id',
      { name }
    );
    if (result.records.length === 0) return null;
    const record = result.records[0];
    return { name: record.get('name'), id: record.get('id') };
  } catch (error) {
    console.error('Error fetching researcher by name:', error);
    return null;
  } finally {
    await session.close();
  }
}

// تحديث رقم الباحث أو أي حقل (هنا بس الرقم موجود)
async function updateResearcherField(name, newId) {
  const session = driver.session({ database: process.env.NEO4J_DATABASE || 'neo4j' });
  try {
    const result = await session.run(
      'MATCH (r:Researcher {name: $name}) SET r.id = $newId RETURN r.name AS name, r.id AS id',
      { name, newId }
    );
    if (result.records.length === 0) return null;
    const record = result.records[0];
    console.log(`Updated ${name}: ${record.get('id')}`);
    return { name: record.get('name'), id: record.get('id') };
  } catch (error) {
    console.error('Error updating researcher field:', error);
    return null;
  } finally {
    await session.close();
  }
}

// حذف باحث
async function deleteResearcher(name) {
  const session = driver.session({ database: process.env.NEO4J_DATABASE || 'neo4j' });
  try {
    await session.run(
      'MATCH (r:Researcher {name: $name}) DETACH DELETE r',
      { name }
    );
    console.log(`Researcher ${name} deleted.`);
  } catch (error) {
    console.error('Error deleting researcher:', error);
  } finally {
    await session.close();
  }
}

module.exports = {
  createResearcher,
  getAllResearchers,
  getResearcherByName,
  updateResearcherField,
  deleteResearcher
};

