import redisClient from './redis.js';

(async () => {
    await redisClient.connect();

    const keys = await redisClient.keys('*'); // جلب كل المفاتيح
    for (const key of keys) {
        await redisClient.del(key);
        console.log('Deleted:', key);
    }

    await redisClient.quit();
})();
