import { createStart, createMiddleware, createCsrfMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

// The session is a cookie, so reject server-function calls coming from other sites.
// Origin is compared to the Host header rather than request.url, which is the
// proxy's internal address behind Hostinger.
const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => new URL(ctx.request.url).pathname.startsWith("/_serverFn"),
  origin: (origin, ctx) => {
    const host = ctx.request.headers.get("x-forwarded-host") ?? ctx.request.headers.get("host");
    try {
      return new URL(origin).host === host;
    } catch {
      return false;
    }
  },
});

export const startInstance = createStart(() => ({
  requestMiddleware: [errorMiddleware, csrfMiddleware],
}));
