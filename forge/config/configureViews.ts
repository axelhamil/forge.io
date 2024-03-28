import fs from "fs";
import handlebars from "handlebars";
import path from "path";

import { __dirname } from "../main";
import { Route } from "./configureRoutes";

const configureViews = (routes: Route[]): void => {
  handlebars.registerHelper("route", (route: string): string => {
    const routeFound = routes.find((r) => r.name === route);

    if (!routeFound) return "";

    return routeFound.url;
  });

  const partials = fs.readdirSync(
    path.join(__dirname, "resources/partials"),
  );

  for (const partial of partials) {
    const partialName = partial.split(".")[0];
    const partialContent = fs.readFileSync(
      path.join(__dirname, `resources/partials/${partial}`),
      "utf-8",
    );

    handlebars.registerPartial(partialName, partialContent);
  }
};

export default configureViews;
