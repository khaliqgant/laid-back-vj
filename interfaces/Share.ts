export interface Response {
    filter: string;
    message: string;
    videos: Playlist[];
}

export interface Playlist {
  artist: string;
  title: string;
  videoId: string;
}
