import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isAuthPage = createRouteMatcher(["/login", "/signup"]);
const isProtectedPage = createRouteMatcher(["/editor"]);

export default convexAuthNextjsMiddleware(
  async (request, { convexAuth }) => {

    const isAuthenticated = await convexAuth.isAuthenticated();

    // Redirect logged-in users away from auth pages
    if (isAuthPage(request) && isAuthenticated) {
      return nextjsMiddlewareRedirect(request, "/editor");
    }

    // Redirect unauthenticated users away from protected pages
    if (isProtectedPage(request) && !isAuthenticated) {
      return nextjsMiddlewareRedirect(request, "/login");
    }
  },
  { verbose: false },
);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
