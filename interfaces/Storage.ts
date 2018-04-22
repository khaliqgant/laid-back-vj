import { Playlist } from './Share';

export interface Record {
  message: {
    filter: string;
    message: string;
  };
  playlist: Playlist[];
}
