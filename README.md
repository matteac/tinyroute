# TinyRoute
A tiny http routing library

## Example
With Deno
``` ts
import { Router } from "@matteac/tinyroute";

const router = new Router();

router.get("/", (_req) => new Response("Hello, World!"));

Deno.serve(router.handler());
// or
Bun.serve({
    fetch: router.handler(),
});
```
