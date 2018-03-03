export function getRoutes(): any {

  return {
    allTime: {
      filter: 'All Time Favorites',
      link: '',
    },
    artists: {
      month: {
        filter: 'This Month\'s Most Listened To Artists',
        link: 'artists/month',
      },
      threeMonth: {
        filter: 'Last Three Month\'s Most Listened To Artists',
        link: 'artists/three-month',
      },
      week: {
        filter: 'This Week\'s Most Listened To Artists',
        link: 'artists/week',
      },
      year: {
        filter: 'This Year\'s Most Listened To Artists',
        link: 'artists/year',
      },
    },
    friends: {
      filter: 'What Your Friends Are Listening To',
      link: 'friends',
    },
    month: {
      filter: 'This Month\'s Favorites',
      link: 'month',
    },
    recent: {
      filter: 'Most Recently Listened To',
      link: 'recent',
    },
    recommended: {
      filter: 'Recommended From Your History',
      link: 'recommended',
    },
    year: {
      filter: 'This Year\'s Favorites',
      link: 'year',
    },
  };

}

/**
 *
 * Links
 * @desc get an array of the routes without the currently active one
 *
 */
export function getLinks(active: string, nest?: string): any {

  const routes = getRoutes();

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

          if (Object.prototype.hasOwnProperty.call(routeObject, artistRoute)) {

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
