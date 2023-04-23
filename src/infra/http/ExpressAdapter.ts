import HttpMethods from "./HttpMethods";
import HttpServer from "./HttpServer";
import express, { Express, Request, Response } from 'express';

class ExpressAdapter implements HttpServer {
    
    constructor(private readonly app = express()) {
        this.app.use(express.json());
    }
    
    on(method: HttpMethods, url: string, callback: Function): void {
        this.app[method](url, (req: Request, res: Response) => {
            try {
                const output = callback(req.params, req.body);
                res.json(output);
            } catch (error: any) {
                res.status(error.statusCode || 422).json({
                    message: error.message
                })
            }
        });
    }
    
    listen(port: number): void {
        this.app.listen(port, () => {
            console.log(`Server is running at port ${port}`);
        });
    }
}

export default ExpressAdapter;