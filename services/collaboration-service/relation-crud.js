// services/collaboration-service/relation-crud.js
const driver = require('./neo4j');

// إنشاء علاقة بين باحث ومشروع
async function createResearcherProjectRelation(researcherId, projectId, relationType = 'WORKS_ON') {
  const session = driver.session({ database: process.env.NEO4J_DATABASE || 'neo4j' });
  try {
    await session.run(
      `
      MATCH (r:Researcher {id: $researcherId})
      MATCH (p:Project {id: $projectId})
      CREATE (r)-[rel:${relationType}]->(p)
      RETURN r, p, rel
      `,
      { researcherId, projectId }
    );
    console.log(`Relation ${relationType} created between Researcher ${researcherId} and Project ${projectId}`);
  } catch (error) {
    console.error('Error creating researcher-project relation:', error);
  } finally {
    await session.close();
  }
}

// إنشاء علاقة بين باحث وباحث
async function createResearcherRelation(researcherId1, researcherId2, relationType = 'COLLABORATES_WITH') {
  const session = driver.session({ database: process.env.NEO4J_DATABASE || 'neo4j' });
  try {
    await session.run(
      `
      MATCH (r1:Researcher {id: $researcherId1})
      MATCH (r2:Researcher {id: $researcherId2})
      CREATE (r1)-[rel:${relationType}]->(r2)
      RETURN r1, r2, rel
      `,
      { researcherId1, researcherId2 }
    );
    console.log(`Relation ${relationType} created between Researcher ${researcherId1} and Researcher ${researcherId2}`);
  } catch (error) {
    console.error('Error creating researcher-researcher relation:', error);
  } finally {
    await session.close();
  }
}

// جلب كل العلاقات بين الباحثين والمشاريع
async function getAllResearcherProjectRelations() {
  const session = driver.session({ database: process.env.NEO4J_DATABASE || 'neo4j' });
  try {
    const result = await session.run(
      'MATCH (r:Researcher)-[rel]->(p:Project) RETURN r.id AS researcherId, p.id AS projectId, type(rel) AS relationType'
    );
    return result.records.map(record => ({
      researcherId: record.get('researcherId'),
      projectId: record.get('projectId'),
      relationType: record.get('relationType')
    }));
  } catch (error) {
    console.error('Error fetching researcher-project relations:', error);
    return [];
  } finally {
    await session.close();
  }
}

// حذف علاقة بين باحث ومشروع
async function deleteResearcherProjectRelation(researcherId, projectId, relationType = 'WORKS_ON') {
  const session = driver.session({ database: process.env.NEO4J_DATABASE || 'neo4j' });
  try {
    await session.run(
      `
      MATCH (r:Researcher {id: $researcherId})-[rel:${relationType}]->(p:Project {id: $projectId})
      DELETE rel
      `,
      { researcherId, projectId }
    );
    console.log(`Relation ${relationType} deleted between Researcher ${researcherId} and Project ${projectId}`);
  } catch (error) {
    console.error('Error deleting researcher-project relation:', error);
  } finally {
    await session.close();
  }
}

// حذف علاقة بين باحث وباحث
async function deleteResearcherRelation(researcherId1, researcherId2, relationType = 'COLLABORATES_WITH') {
  const session = driver.session({ database: process.env.NEO4J_DATABASE || 'neo4j' });
  try {
    await session.run(
      `
      MATCH (r1:Researcher {id: $researcherId1})-[rel:${relationType}]->(r2:Researcher {id: $researcherId2})
      DELETE rel
      `,
      { researcherId1, researcherId2 }
    );
    console.log(`Relation ${relationType} deleted between Researcher ${researcherId1} and Researcher ${researcherId2}`);
  } catch (error) {
    console.error('Error deleting researcher-researcher relation:', error);
  } finally {
    await session.close();
  }
}

module.exports = {
  createResearcherProjectRelation,
  createResearcherRelation,
  getAllResearcherProjectRelations,
  deleteResearcherProjectRelation,
  deleteResearcherRelation
};
