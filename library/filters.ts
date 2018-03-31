import {
  Item as _ItemResponse,
  SearchResult as _SearchResult,
} from '../interfaces/Youtube';

export default class Filters {

    private prop: string;

    constructor(prop: string) {

      this.prop = prop;

    }

    /**
     *
     * Artist
     * @desc make sure the result has artists in title and/or the
     * vevo channel is the artists vevo channel and just use those results
     * if so
     *
     */
    public artist(items: _ItemResponse[]): _SearchResult[] {

      const results: _SearchResult[] = [];
      const channelResults: _SearchResult[] = [];

      for (const item of items) {

        const title = item.snippet.title;
        const channel = item.snippet.channelTitle
          .toLowerCase()
          .replace(/ /g, '');
        const result: _SearchResult = {
          artist: this.cap(this.prop),
          title: item.snippet.title,
          videoId: item.id.videoId,
        };

        if (title.toLowerCase().indexOf(this.prop.toLowerCase()) > -1) {

          results.push(result);

        }

        const searchProp = this.prop.replace(/[^A-Za-z0-9]/g, '');
        const searchChannel = `${searchProp.toLowerCase()}vevo`;

        if (channel === searchChannel) {

          channelResults.push(result);

        }

      }

      if (channelResults.length > 0) {

        return channelResults;

      }

      return results;

    }

    private cap(prop: string) {

      return prop.replace(/\w\S*/g, (txt: string) =>
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

    }

}
