import express from 'express';
import {
  loginUser,
  logoutUser,
  getUserFromSession
} from '../session/session.js';

const router = express.Router();

// login حقيقي (مش وهمي)
router.post('/login', async (req, res) => {
    const user = req.body; // user جاي من UI
    const sessionId = await loginUser(user);
    res.json({ sessionId });
});

// logout
router.post('/logout', async (req, res) => {
    const { sessionId } = req.body;
    await logoutUser(sessionId);
    res.json({ message: 'Logged out' });
});

// get current user from session
router.get('/me/:sessionId', async (req, res) => {
    const user = await getUserFromSession(req.params.sessionId);
    res.json(user);
});

export default router;
