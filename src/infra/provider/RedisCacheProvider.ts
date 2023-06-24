import { createClient } from "redis";

class RedisCacheProvider {

    private readonly client;
    private readonly connected: boolean = false;

    constructor(){
        this.client = createClient();
        this.client.on('error', err => {
            console.log('Redis Client Error', err);
        });
        this.client.connect();
    }

    public async save(key: string, value: any): Promise<void> {
        await this.client.set(key, JSON.stringify(value));
    }

    public async recover<T>(key: string): Promise<T | null> {
        const data = await this.client.get(key);
        if (!data){
            return null;
        }
        const parsedData = JSON.parse(data) as T;
        return parsedData;
    }

    public async invalidate(key: string): Promise<void> {
        await this.client.del(key);
    }

    public async connect(){
        this.client.connect();
    }

    public async close(){
        this.client.disconnect();
    }

}

export default RedisCacheProvider;