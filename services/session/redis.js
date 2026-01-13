import { createClient } from 'redis';

const redisClient = createClient({
    url: 'rediss://default:AVAVAAIncDFkZDllY2ZkNjA5OTg0M2RlYmU3YjI1Mzc2NWNmOGRhOXAxMjA1MDE@accepted-mammoth-20501.upstash.io:6379'
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

export default redisClient;
