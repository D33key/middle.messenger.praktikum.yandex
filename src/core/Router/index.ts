import { Loader } from '@/components/Loader';
import { Block, TypeOfProps } from '../Block';
import Route from './Route';

class Router {
  private static instance: Router;
  public routes: Route[] = [];
  public history: History = window.history;
  public loader: Loader = new Loader();
  private currentRoute: Route | null = null;
  private rootQuery: string = '' as string;
  private protectedPaths: `/${string}`[] = [];
  private pathnames: string[] = [];
  private checkAccessForPath: (() => Promise<unknown>) | null = null;
  private defaultPath: string = '' as string;

  constructor(rootQuery: string) {
    if (Router.instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.instance;
    }

    this.rootQuery = rootQuery;
    Router.instance = this;
  }

  public setProtectedPaths(paths: `/${string}`[]) {
    this.protectedPaths = paths;
    return this;
  }

  public setDefaultPath(path: string) {
    this.defaultPath = path;
    return this;
  }

  public getDefaultPath() {
    const isExistInPaths = this.pathnames.includes(this.defaultPath);

    if (isExistInPaths) {
      return this.defaultPath;
    }

    return '/';
  }

  public setAccessFunCheck<User>(callback: () => Promise<User>) {
    this.checkAccessForPath = callback;
    return this;
  }

  private async checkAccess() {
    if (
      this.protectedPaths.includes(window.location.pathname as `/${string}`)
    ) {
      if (this.checkAccessForPath) {
        this.loader.renderInRoot();
        try {
          return await this.checkAccessForPath();
        } catch (error) {
          console.error('Error! Access denied', error);

          return false;
        } finally {
          this.loader.remove();
        }
      } else {
        throw new Error(
          'You should set function for check access, if you set protected paths.',
        );
      }
    }

    return true;
  }

  private hasRoute(pathname: string) {
    if (!this.pathnames.includes(pathname)) {
      return '/404';
    }
    return pathname;
  }

  use(pathname: string, block: new () => Block<TypeOfProps>) {
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

  private async onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this.currentRoute) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;

    const isAllowed = await this.checkAccess();

    if (isAllowed) {
      route.render();
    } else {
      this.go(this.defaultPath);
    }
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
