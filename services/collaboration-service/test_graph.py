from researcher_functions import add_researcher, add_project, assign_to_project, collaborate
from db_connection import close_driver

# إضافة باحثين
add_researcher("R4", "Dr. Ahmad")
add_researcher("R5", "Dr. Sara")

# إضافة مشروع
add_project("P3", "Research Collaboration System2")

# ربط الباحثين بالمشروع
assign_to_project("R4", "P3")
assign_to_project("R5", "P1")

# إنشاء تعاون بين الباحثين
collaborate("R4", "R5")

# غلق الاتصال بالـ Neo4j
close_driver()
