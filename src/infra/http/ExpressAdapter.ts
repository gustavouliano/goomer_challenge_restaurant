import HttpMethods from './HttpMethods';
import HttpServer from './HttpServer';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

class ExpressAdapter implements HttpServer {
	constructor(private readonly app = express()) {
		this.app.use(express.json());
	}

	on(method: HttpMethods, url: string, callback: Function): void {
		this.app[method](url, async (req: Request, res: Response) => {
			const output = await callback(req.params, req.body);
			res.json(output);
		});
	}

	listen(port: number): void {
		this.app.listen(port, () => {
			console.log(`Server is running at port ${port}`);
		});
	}

	error(fn: Function): void {
		this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
			const response = fn(err);
			return res.json(response);
		});
	}
}

export default ExpressAdapter;
