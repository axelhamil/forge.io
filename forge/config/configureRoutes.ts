import { FastifyInstance } from "fastify";

export type Route = {
  method: string;
  name: string;
  type: string;
  url: string;
};

const configureRoutes = (server: FastifyInstance): Route[] => {
  const routes: Route[] = [];

  server.addHook("onRoute", (routeOptions) => {
    const type = routeOptions?.schema?.tags?.[0] || null;

    if (type === "PAGES" || type === "API") {
      routes.push({
        method: routeOptions.method as string,
        name: routeOptions?.schema?.summary,
        type,
        url: routeOptions.url,
      });
    }
  });

  return routes;
};

export default configureRoutes;
