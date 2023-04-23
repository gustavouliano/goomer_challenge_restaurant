import dotenv from 'dotenv';
import ExpressAdapter from './infra/http/ExpressAdapter';

dotenv.config();

const httpServer = new ExpressAdapter();
httpServer.on('get', '/', () => {
    return {msg: 'test'};
})
httpServer.listen(Number(process.env.PORT));