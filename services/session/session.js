// services/session/session.js
import redisClient from './redis.js';
import { v4 as uuidv4 } from 'uuid';

export async function loginUser(user) {
  const sessionId = uuidv4();
  await redisClient.set(
    `session_${sessionId}`,
    JSON.stringify(user),
    { EX: 3600 } // صلاحية ساعة واحدة
  );
  return sessionId;
}

export async function getUserFromSession(sessionId) {
  const data = await redisClient.get(`session_${sessionId}`);
  return data ? JSON.parse(data) : null;
}

export async function logoutUser(sessionId) {
  await redisClient.del(`session_${sessionId}`);
}

export async function isLoggedIn(sessionId) {
  return (await redisClient.exists(`session_${sessionId}`)) === 1;
}

