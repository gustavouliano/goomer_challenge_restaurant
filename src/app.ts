import dotenv from 'dotenv';
import ExpressAdapter from './infra/http/ExpressAdapter';
import HttpController from './infra/http/HttpController';

dotenv.config();

const httpServer = new ExpressAdapter();
new HttpController(httpServer);