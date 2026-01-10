import redis
import uuid

# الاتصال بالـ Redis
r = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)

# إنشاء جلسة جديدة
def create_session(user_id):
    session_id = str(uuid.uuid4())  # معرف فريد للجلسة
    r.set(session_id, user_id, ex=3600)  # تخزين الجلسة لمدة ساعة
    return session_id

# استرجاع بيانات الجلسة
def get_user(session_id):
    return r.get(session_id)

# حذف الجلسة
def delete_session(session_id):
    r.delete(session_id)
