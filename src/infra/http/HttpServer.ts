import HttpMethods from './HttpMethods';

/**
 * Interface responsible for providing methods for creating a new server.
 */
interface HttpServer {

	/**
	 * Create a new route.
	 * @param method    - the HTTP Method.
	 * @param url       - the URL route.
	 * @param callback  - the route function.
	 */
	on(method: HttpMethods, url: string, callback: Function): void;

	/**
	 * Initialize a port to connection.
	 * @param port 
	 */
	listen(port: number): void;

	/**
	 * Function triggered when an error occurs.
	 * @param fn 
	 */
	error(fn: Function): void;
}

export default HttpServer;
