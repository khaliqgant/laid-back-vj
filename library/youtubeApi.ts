import {TrackQuery, ArtistQuery} from '../interfaces/VideoQuery';
import {Response as YoutubeResponse} from '../interfaces/Youtube';

const Q = require('q');
const config = require('../config.json');

const YoutubeAPI = require('../library/youtubeApi');

// @see https://github.com/nodenica/youtube-node
var YouTube = require('youtube-node');
var youTube = new YouTube();
youTube.setKey(config.youtube.apiKey);

/**
 *
 * Search
 * @desc run a youtube search based on a query string
 * @see https://developers.google.com/youtube/v3/docs/search/list
 *
 */
export function search(search: ArtistQuery|TrackQuery): Q.Promise<any> {

    return Q.Promise((resolve: Function, reject: Function) => {
        const numResults: number = 1;
        youTube.search(search.query, numResults, {type: 'video'}, function(error: any, result: YoutubeResponse) {
            if (error) {
                reject(error);
            } else {
                let videoId = result.items[0].id.videoId;
                let videoTitle = result.items[0].snippet.title;

                // perform some kind of similarity check?
                let artist = videoTitle.slice(0, videoTitle.indexOf('-'));;
                resolve(videoId);
            }
        });
    });

}

/**
 *
 * Popular
 * @desc grab the most popular music videos and return back the ids
 */
export function popular(): Q.Promise<any> {

    const query: string = 'music videos vevo';
    const numResults: number = 25;
    const params = {
        type: 'video',
        order: 'viewCount'
    };

    return Q.Promise((resolve: Function, reject: Function) => {
        youTube.search(query, numResults, params, function (error: any, result: YoutubeResponse) {
            if (error) {
                reject(error);
            } else {
                let videoObjects = result.items;
                var videoIds = videoObjects.map(function (vid, i) {
                    return vid.id.videoId;
                });

                resolve(videoIds);
            }
        });
    });
}
