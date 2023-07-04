import { createClient } from "redis";
import LoggerProvider from "./LoggerProvider";
import AppError from "../errors/AppError";

class RedisCacheProvider {

    private readonly client;

    constructor() {
        this.client = createClient();
        this.client.on('error', err => {
            LoggerProvider.getInstance().error(`Redis client error: ${err}`);
            throw new AppError(err);
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