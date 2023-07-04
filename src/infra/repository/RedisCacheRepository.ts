import RedisCacheProvider from "../provider/RedisCacheProvider";

abstract class RedisCacheRepository<T> {

    protected readonly redisCache: RedisCacheProvider;

    constructor(redisCache: RedisCacheProvider){
        this.redisCache = redisCache;
    }
}

export default RedisCacheRepository;