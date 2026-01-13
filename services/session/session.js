import redisClient from './redis.js';
import { v4 as uuidv4 } from 'uuid'; // لإنشاء session IDs عشوائية

// تأكد من اتصال Redis
await redisClient.connect();

// تسجيل دخول مستخدم وهمي
export async function loginUser(user) {
    const sessionId = uuidv4(); // إنشاء معرف جلسة عشوائي
    // حفظ بيانات المستخدم في Redis مع Session ID
    await redisClient.set(`session_${sessionId}`, JSON.stringify(user));
    return sessionId; // نرجع الـ session ID للمستخدم
}

// استرجاع بيانات مستخدم من Session ID
export async function getUserFromSession(sessionId) {
    const data = await redisClient.get(`session_${sessionId}`);
    if (!data) return null;
    return JSON.parse(data);
}

// حذف session (تسجيل خروج)
export async function logoutUser(sessionId) {
    await redisClient.del(`session_${sessionId}`);
}

// التحقق من وجود session
export async function isLoggedIn(sessionId) {
    const exists = await redisClient.exists(`session_${sessionId}`);
    return exists === 1;
}
