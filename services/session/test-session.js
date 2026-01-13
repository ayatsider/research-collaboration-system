// services/session/test-session.js
import { loginUser, getUserFromSession } from './session.js';

async function test() {
  const user = { id: 'R1', name: 'Eman' };

  const sessionId = await loginUser(user);
  console.log('Session ID:', sessionId);

  const storedUser = await getUserFromSession(sessionId);
  console.log('Stored user:', storedUser);
}

test();



