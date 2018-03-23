import { Request, Response } from 'express';
import Base from './base';

export default class LastFm extends Base {

  private cookieName: string = 'LASTFM_USERNAME';

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

  public setUser(res: Response, userId: string) {

    const ONE_DAY = 3600000 * 24;

    const options = {
      maxAge: ONE_DAY,
    };
    res.cookie(this.cookieName, userId, options);

  }

  public getUser(req: Request) {

    const user = req.cookies[this.cookieName];

    return user;

  }

}
