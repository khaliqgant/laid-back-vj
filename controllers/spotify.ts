import Base from './base';

export default class Spotify extends Base {

  public getRoutes(): any {

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

}
