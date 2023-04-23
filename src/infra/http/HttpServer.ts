import HttpMethods from "./HttpMethods";

interface HttpServer {
    on(method: HttpMethods, url: string, callback: Function): void;
    listen(port: number): void;
}

export default HttpServer;