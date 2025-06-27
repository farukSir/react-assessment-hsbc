import { RootRoute, Route, createRouter } from "@tanstack/react-router";

import { CharacterDetailPage } from "../pages/details/CharacterDetailPage";
import { z } from "zod";
import { CharacterListPage } from "../pages/list";

const rootRoute = new RootRoute();

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: CharacterListPage,
  validateSearch: z.object({
    page: z.coerce.number().optional().default(1),
  }),
});

export const detailRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/character/$id",
  component: CharacterDetailPage,
});

rootRoute.addChildren([indexRoute, detailRoute]);

export const router = createRouter({ routeTree: rootRoute });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
