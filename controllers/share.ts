import { Request as _Request, Response as _Response } from 'express';
import { Response as _ShareResponse } from '../interfaces/Share';
import { Record as _Record } from '../interfaces/Storage';

import { Storage as storage } from '../library/storage';

import Youtube from './youtube';

const Storage = storage.getInstance();


export default class Share extends Youtube {

  public lookup(hash: string): _ShareResponse {

    const record: _Record = Storage.get(hash);

    if (!record) {

      return undefined;

    }

    return {
      filter: record.message.filter,
      message: record.message.message,
      videos: record.playlist,
    };

  }

}

