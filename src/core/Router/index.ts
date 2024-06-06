import { Block } from '../Block';
import Route from './Route';

class Router {
  private static instance: Router;
  public routes: Route[];
  public history: History;
  private currentRoute: Route | null;
  private rootQuery: string;
  private allowedPaths: `/${string}`[];
  private pathnames: string[];

  constructor(rootQuery: string) {
    if (Router.instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.instance;
    }
    this.routes = [];
    this.history = window.history;
    this.currentRoute = null;
    this.rootQuery = rootQuery;
    this.allowedPaths = [];
    this.pathnames = [];

    Router.instance = this;
  }

  public allowPaths(paths: `/${string}`[]) {
    this.allowedPaths = paths;
    return this;
  }

  private hasRoute(pathname: string) {
    if (!this.pathnames.includes(pathname)) {
      return '/404';
    }
    return pathname;
  }

  use(pathname: string, block: new () => Block<any>) {
    const route = new Route(pathname, block, { rootQuery: this.rootQuery });

    this.routes.push(route);
    this.pathnames.push(pathname);

    return this;
  }

  start() {
    window.addEventListener('popstate', (event) => {
      const pathname = this.hasRoute(
        (event.target as Window)?.location.pathname,
      );
      this.onRoute(pathname);
    });
    const pathname = this.hasRoute(window.location.pathname);
    this.onRoute(pathname);
  }

  private onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this.currentRoute) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;

    route.render();
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this.onRoute(pathname);
  }

  private getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default Router;
