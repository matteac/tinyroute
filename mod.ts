/**
 * @module
 * This module exposes the `Router` class
 */


/** A tiny http router */
export class Router {
    private routes: Map<string, (req: Request) => Response> = new Map()
    constructor() { }

    /** Returns a handler function that has the routing logic */
    handler(): (req: Request) => Response {
        return (req: Request) => {
            const url = new URL(req.url)
            const method = req.method.toUpperCase()
            const handler = this.routes.get(`${method} ${url.pathname}`)
            if (handler) {
                return handler(req)
            }
            return new Response(`Cannot ${method} ${url.pathname}`, { status: 404 })
        }
    }

    /** Add route with custom method */
    custom(method: string, path: string, handler: (_req: Request) => Response) {
        this.routes.set(`${method.toUpperCase()} ${path}`, handler)
    }

    /** Add route with GET method */
    get(path: string, handler: (_req: Request) => Response) {
        this.routes.set(`GET ${path}`, handler)
    }

    /** Add route with POST method */
    post(path: string, handler: (_req: Request) => Response) {
        this.routes.set(`POST ${path}`, handler)
    }

    /** Add route with PATCH method */
    patch(path: string, handler: (_req: Request) => Response) {
        this.routes.set(`PATCH ${path}`, handler)
    }

    /** Add route with PUT method */
    put(path: string, handler: (_req: Request) => Response) {
        this.routes.set(`PUT ${path}`, handler)
    }

    /** Add route with `DELETE` method */
    delete(path: string, handler: (_req: Request) => Response) {
        this.routes.set(`DELETE ${path}`, handler)
    }
}
