import Base from './base';

export default class Youtube extends Base {

  public getRoutes(): any {

    return {
      nearMe: {
        filter: 'Popular Near Me',
        link: 'near-me',
      },
      newest: {
        filter: 'Newest Videos',
        link: 'newest',
      },
      popular: {
        filter: 'Most Popular Ever',
        link: '/',
      },
      tenYear: {
        filter: 'Most Popular Videos in the Last Ten Years',
        link: 'ten-years',
      },
      year: {
        filter: 'Most Popular this Year',
        link: 'year',
      },
    };

  }

}
