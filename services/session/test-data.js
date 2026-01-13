import redisClient from './redis.js';
import neo4jDriver from '../collaboration-service/neo4j.js';

(async () => {
    const session = neo4jDriver.session();

    try {
        // **تأكد الاتصال بالـ Redis**
        await redisClient.connect();

        // بيانات الباحثين التجريبية
        const researchers = [
            { id: 1, name: 'Alice', email: 'alice@example.com' },
            { id: 2, name: 'Bob', email: 'bob@example.com' },
            { id: 3, name: 'Charlie', email: 'charlie@example.com' }
        ];

        // حفظ الباحثين في Neo4j و Redis
        for (const r of researchers) {
            await session.run(
                `MERGE (res:Researcher {id:$id}) SET res.name=$name, res.email=$email`,
                { id: r.id, name: r.name, email: r.email }
            );
            await redisClient.set(`researcher_${r.id}`, JSON.stringify(r));
        }

        // بيانات المشاريع التجريبية
        const projects = [
            { id: 101, title: 'AI Project', members: [1, 2] },
            { id: 102, title: 'Blockchain Study', members: [2, 3] }
        ];

        // حفظ المشاريع وربط الباحثين بالمشروع
        for (const p of projects) {
            await session.run(
                `MERGE (proj:Project {id:$id}) SET proj.title=$title`,
                { id: p.id, title: p.title }
            );

            for (const memberId of p.members) {
                await session.run(
                    `MATCH (res:Researcher {id:$memberId}), (proj:Project {id:$projId}) MERGE (res)-[:WORKS_ON]->(proj)`,
                    { memberId, projId: p.id }
                );
            }

            await redisClient.set(`project_${p.id}`, JSON.stringify(p));
        }

        console.log('✅ Test researchers and projects added successfully');

    } catch (err) {
        console.error(err);
    } finally {
        await session.close();
        await neo4jDriver.close();

        // غلق Redis بعد انتهاء كل شيء
        if (redisClient.isOpen) {
            await redisClient.quit();
        }
    }
})();
