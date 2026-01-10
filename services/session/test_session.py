from session_store import create_session, get_user, delete_session

# إنشاء جلسة
sid = create_session("R1")
print("Session ID:", sid)

# استرجاع المستخدم
user = get_user(sid)
print("User from session:", user)

# حذف الجلسة
delete_session(sid)
print("Deleted session, check:", get_user(sid))
