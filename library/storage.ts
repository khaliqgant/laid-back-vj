import { Record as _Record } from '../interfaces/Storage';
import { Playlist as _Playlist } from '../interfaces/Share';

const _ = require('lodash');

const lodashId = require('lodash-id');
const low = require('lowdb');
const fs = require('fs');
const crypto = require('crypto');
const FileSync = require('lowdb/adapters/FileSync');

/**
 *
 * Storage
 *
 */
export class Storage {

  public static getInstance(): Storage {

    return Storage.instance;

  }

  private static instance: Storage = new Storage();

  private Storage: Storage;

  private LOCATION: string;
  private FILE: string = '/../storage/db.json';

  private db: any;

  private playlist: _Playlist[];

  constructor() {

    if (Storage.instance) {

      throw new Error('Storage is a singleton class and can\' be created!');

    }

    this.LOCATION = `${__dirname}${this.FILE}`;

    this.init();

    Storage.instance = this;

  }

  public save(hash: string, info: any): void {

    this.db.get('playlists')
      .insert({ hash, message: info, playlist: this.playlist })
      .write();

  }

  public get(hash: string): _Record {

    const record: _Record = this.db.get('playlists')
      .find({ hash })
      .value();

    return record;

  }

  public setPlaylist(playlist: _Playlist[]): void {

    this.playlist = playlist;

  }

  public getPlaylist(): _Playlist[] {

    return this.playlist;

  }

  public getHash(): string {

    let hash: string = '';
    let hashFound: boolean = false;
    while (!hashFound) {

      hash = crypto.randomBytes(3).toString('hex');

      const exists = this.db.has('playlists')
        .find({ hash })
        .value();

      if (!exists) {

        hashFound = true;

      }

    }

    return hash;

  }

  private init(): void {

    this.file();
    const adapter = new FileSync(this.LOCATION);
    this.db = low(adapter);

    this.db._.mixin(lodashId);

    const hasPlaylists: boolean = this.db.has('playlists').value();

    if (!hasPlaylists) {

      this.db.set('playlists', []).write();

    }

  }

  private file(): void {

    if (!fs.existsSync(this.LOCATION)) {

      fs.writeFileSync(this.LOCATION, '', (err: any) => {

        if (err) {

          throw err;

        }

      });

    }

  }

}

