from db_connection import driver

# إضافة باحث جديد
def add_researcher(id, name):
    with driver.session() as session:
        session.run(
            "CREATE (:Researcher {id:$id, name:$name})",
            id=id, name=name
        )

# إضافة مشروع جديد
def add_project(id, title):
    with driver.session() as session:
        session.run(
            "CREATE (:Project {id:$id, title:$title})",
            id=id, title=title
        )

# ربط الباحث بمشروع
def assign_to_project(researcher_id, project_id):
    with driver.session() as session:
        session.run("""
            MATCH (r:Researcher {id:$r_id}), (p:Project {id:$p_id})
            CREATE (r)-[:WORKS_ON]->(p)
        """, r_id=researcher_id, p_id=project_id)

# إنشاء تعاون بين باحثين
def collaborate(r1_id, r2_id):
    with driver.session() as session:
        session.run("""
            MATCH (r1:Researcher {id:$r1_id}), (r2:Researcher {id:$r2_id})
            CREATE (r1)-[:COLLABORATES_WITH]->(r2)
        """, r1_id=r1_id, r2_id=r2_id)
