export default class Base {

  public getRoutes(): any {

    return [];

  }

  public getLinks(active: string, nest?: string): any {

    const routes = this.getRoutes();

    if (nest) {

      delete routes[active][nest];

    } else {

      delete routes[active];

    }

    const links = [];
    let route: any;

    for (route in routes) {

      if (Object.prototype.hasOwnProperty.call(routes, route)) {

        const routeObject = routes[route];

        if (!Object.prototype.hasOwnProperty.call(routeObject, 'filter')) {

          for (const artistRoute in routeObject) {

            if (Object.prototype.hasOwnProperty
              .call(routeObject, artistRoute)) {

              links.push(routeObject[artistRoute]);

            }

          }

        } else {

          links.push(routes[route]);

        }

      }

    }

    return links;


  }

}
