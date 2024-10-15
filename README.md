# TinyRoute
A tiny http routing library

## Example
With Deno
``` ts
import { Router, type TinyRequest } from "@matteac/tinyroute";

const router = new Router();

router.get("/", (_req) => new Response("Hello, World!"));
router.get("/{param}", (request: TinyRequest) => new Response(`GET /{param} where param = ${req.params.param}`))

Deno.serve(router.handler());
// or
Bun.serve({
    fetch: router.handler(),
});
```
