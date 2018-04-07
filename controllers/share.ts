import { Request as _Request, Response as _Response } from 'express';
import { Response as _ShareResponse } from '../interfaces/Share';
import Youtube from './youtube';

const BitlyClient = require('bitly');

const bitly = BitlyClient(process.env.BITLY_ACCESS_TOKEN);
const shorturl = require('shorturl');

export default class Share extends Youtube {

  /**
   *
   * Decode
   * @desc decode a base64 encoded string
   * @see https://stackoverflow.com/questions/23097928/node-js-btoa-is-not-defined-error/23097961
   *
   */
  public decode(hash: string): _ShareResponse {

    const response = Buffer.from(hash, 'base64').toString('binary');
    const share: _ShareResponse = JSON.parse(response);

    return share;

  }

  public async shorten(rawShare: any): Promise<any> {

    const baseUrl = rawShare.base;

    delete rawShare.base;
    const share: _ShareResponse = rawShare;
    const encoded: string = JSON.stringify(share);
    const based: string = Buffer.from(encoded, 'binary').toString('base64');
    const shareUrl = `${baseUrl}/share/playlist?hash=${based}`;

    shorturl(shareUrl, (result: string) => {

      console.log(result);

    });

    if (process.env.NODE_ENV !== 'production') {

      return Promise.resolve(shareUrl);

    }

    try {

      return await bitly.shorten(shareUrl);

    } catch (e) {

      throw e;

    }

  }

}

