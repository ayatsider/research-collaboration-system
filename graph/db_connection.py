from neo4j import GraphDatabase

# إعداد الاتصال بقاعدة البيانات
uri = "bolt://localhost:7687"  # لو شغالة على جهازك
user = "neo4j"
password = "0PQfVyaLF2NKe_3IxzVL-H_EDEvcpi6vdVKq35HsbDw"       # كلمة المرور اللي حطيتيها عند إنشاء DB

driver = GraphDatabase.driver(uri, auth=(user, password))

def close_driver():
    driver.close()
