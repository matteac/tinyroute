/**
 * @module
 * This module exposes the `Router` class
 */

/** Sync/Async HTTP handler. It takes a Request object and returns either a Response or a Promise<Response>. */
export type HTTPHandler = (request: Request) => Response | Promise<Response>;

/** A tiny http router */
export class Router {
	private routes: Map<string, HTTPHandler> = new Map();
	constructor() {}

	/** Returns a handler function that has the routing logic */
	handler(): HTTPHandler {
		return (req: Request): Response | Promise<Response> => {
			const url = new URL(req.url);
			const method = req.method.toUpperCase();
			const handler = this.routes.get(`${method} ${url.pathname}`);
			if (handler) {
				return handler(req);
			}
			return new Response(`Cannot ${method} ${url.pathname}`, { status: 404 });
		};
	}

	/** Add route with custom method */
	custom(method: string, path: string, handler: HTTPHandler) {
		this.routes.set(`${method.toUpperCase()} ${path}`, handler);
	}

	/** Add route with `GET` method */
	get(path: string, handler: HTTPHandler) {
		this.routes.set(`GET ${path}`, handler);
	}

	/** Add route with `POST` method */
	post(path: string, handler: HTTPHandler) {
		this.routes.set(`POST ${path}`, handler);
	}

	/** Add route with `PATCH` method */
	patch(path: string, handler: HTTPHandler) {
		this.routes.set(`PATCH ${path}`, handler);
	}

	/** Add route with `PUT` method */
	put(path: string, handler: HTTPHandler) {
		this.routes.set(`PUT ${path}`, handler);
	}

	/** Add route with `DELETE` method */
	delete(path: string, handler: HTTPHandler) {
		this.routes.set(`DELETE ${path}`, handler);
	}
}
