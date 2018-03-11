import { RouteInfo } from '../interfaces/VideoQuery';
import Base from './base';

export default class Youtube extends Base {

  public getRoutes(): any {

    return {
      fiveYear: {
        filter: 'Most Popular Videos Five Years Ago',
        link: 'five-years',
        method: 'fiveYear',
      },
      newest: {
        filter: 'Newest Videos',
        link: 'newest',
        method: 'newest',
      },
      popular: {
        filter: 'Most Popular Ever',
        link: 'popular',
        method: 'popular',
      },
      year: {
        filter: 'Most Popular this Year',
        link: 'year',
        method: 'year',
      },
    };

  }

  /**
   *
   * Random
   * @desc return back a random video type for the homepage
   *
   */
  public random(): RouteInfo {

    const availableRoutes = Object.keys(this.getRoutes());
    const numRoutes: number = availableRoutes.length;
    const selection: number = Math.floor(Math.random() * Math.floor(numRoutes));
    const route = availableRoutes[selection];

    return this.getRoutes()[route];

  }

}
