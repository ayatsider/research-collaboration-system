import { loginUser, getUserFromSession, logoutUser, isLoggedIn } from './session.js';

(async () => {
    // مستخدم وهمي
    const user = { id: 1, name: 'Alice', email: 'alice@example.com' };

    // تسجيل دخول
    const sessionId = await loginUser(user);
    console.log('Session ID:', sessionId);

    // التحقق من وجود session
    const loggedIn = await isLoggedIn(sessionId);
    console.log('Is logged in?', loggedIn);

    // استرجاع بيانات المستخدم
    const userData = await getUserFromSession(sessionId);
    console.log('User data:', userData);

    // تسجيل خروج
    await logoutUser(sessionId);
    const loggedInAfterLogout = await isLoggedIn(sessionId);
    console.log('Is logged in after logout?', loggedInAfterLogout);
})();

