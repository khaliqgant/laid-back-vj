import { Request as _Request, Response as _Response } from 'express';
import { Response as _ShareResponse } from '../interfaces/Share';
import Youtube from './youtube';

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

}

