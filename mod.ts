/**
 * @module
 * This module exposes the `Router` class
 */

/** Extends the standard Request object to include route parameters. */
export interface TinyRequest extends Request {
	params: Record<string, string>;
}

/** Sync/Async HTTP handler. It takes a `TinyRequest` object and returns either a `Response` or a `Promise<Response>`. */
export type TinyHTTPHandler = (
	request: TinyRequest,
) => Response | Promise<Response>;

/** Standard Sync/Async HTTP handler. It takes a `Request` object and returns either a `Response` or a `Promise<Response>`. */
export type HTTPHandler = (request: Request) => Response | Promise<Response>;

/** A tiny HTTP router */
export class Router {
	private routes: Map<RegExp, TinyHTTPHandler> = new Map();

	constructor() {}

	/** Returns a handler function that has the routing logic */
	handler(): HTTPHandler {
		return (req: Request): Response | Promise<Response> => {
			const url = new URL(req.url);
			const method = req.method.toUpperCase();
			const routeKey = `${method} ${url.pathname}`;

			// Match the incoming request with registered routes
			for (const [pattern, handler] of this.routes) {
				const match = routeKey.match(pattern);
				if (match) {
					// If matched, extract params and create TinyRequest with params
					// @ts-ignore: extend type
					req.params = match.groups || {};
					return handler(req as TinyRequest);
				}
			}

			// If no match, return a 404 response
			return new Response(`Cannot ${method} ${url.pathname}`, { status: 404 });
		};
	}

	/** Adds a route with dynamic parameter matching */
	private addRoute(method: string, path: string, handler: TinyHTTPHandler) {
		// NOTE: RegEx magic. Be careful
		const pattern = new RegExp(
			`^${method.toUpperCase()} ${path.replace(/{(\w+)}/g, "(?<$1>[^/]+)")}$`,
		);
		this.routes.set(pattern, handler);
	}

	/** Add route with custom method */
	custom(method: string, path: string, handler: TinyHTTPHandler) {
		this.addRoute(method, path, handler);
	}

	/** Add route with `GET` method */
	get(path: string, handler: TinyHTTPHandler) {
		this.addRoute("GET", path, handler);
	}

	/** Add route with `POST` method */
	post(path: string, handler: TinyHTTPHandler) {
		this.addRoute("POST", path, handler);
	}

	/** Add route with `PATCH` method */
	patch(path: string, handler: TinyHTTPHandler) {
		this.addRoute("PATCH", path, handler);
	}

	/** Add route with `PUT` method */
	put(path: string, handler: TinyHTTPHandler) {
		this.addRoute("PUT", path, handler);
	}

	/** Add route with `DELETE` method */
	delete(path: string, handler: TinyHTTPHandler) {
		this.addRoute("DELETE", path, handler);
	}
}
