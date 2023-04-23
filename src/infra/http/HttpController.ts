import HttpServer from "./HttpServer";

class HttpController {
    
    constructor(readonly httpServer: HttpServer){
        httpServer.on('get', '/restaurants', (params: any, body: any) => {
            
        });
        httpServer.listen(Number(process.env.PORT));
    }
}

export default HttpController;