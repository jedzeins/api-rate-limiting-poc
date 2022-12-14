import { createClient } from 'redis';
import { REDIS_CONFIG } from '../../config';

const client = createClient({socket:{
    port:REDIS_CONFIG.port,
    host:REDIS_CONFIG.host
},}); //{socket:{port:REDIS_CONFIG.port,host:REDIS_CONFIG.host}}

client.on('error', (err) => console.log('Redis Client Error', err));

export default client;

export type RedisClientType = typeof client;

export const cacheHealthCheck = async (): Promise<boolean> => {
    try {
        client.connect()
        await client.PING();
        console.log(`[redis]: Cache is running at ${REDIS_CONFIG.host}:${REDIS_CONFIG.port}`);
        client.quit();
        return true;
    } catch(e) {
        console.error(e);
        return false;
    }
}