// بدل: const redisClient = require('./redis');
import redisClient from './redis.js';

(async () => {
    await redisClient.connect();

    await redisClient.set('hello', 'hello online redis');
    const value = await redisClient.get('hello');
    console.log('Value from Redis:', value);

    await redisClient.quit();
})();
