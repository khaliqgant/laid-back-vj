export interface AuthResponse {
  body: {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
  };
  headers: any;
}

export interface UserResponse {
  body: {
    country: string;
    display_name: string;
    email: string;
    external_urls: ExternalUrls;
    followers: {
      href: any;
      total: number;
    };
    href: string;
    id: string;
    images: any;
    product: string;
    type: string;
    uri: string;
  };
  headers: any;
}

export interface TrackResponse {
  body: {
    items: Track[];
  };
  headers: any;
}

export interface ItemResponse {
  body: {
    items: TrackInfo[];
  };
  headers: any;
}

interface Track {
  track: TrackInfo;
  context: {
    external_urls: ExternalUrls;
    href: string;
    uri: string;
    type: string;
  };
  played_at: string;
}

export interface TrackInfo {
  album: AlbumInfo;
  artists: ArtistInfo[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  href: string;
  id: string;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  url: string;
}

interface AlbumInfo {
  album_info: string;
  artists: ArtistInfo[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  type: string;
  uri: string;
}

interface ArtistInfo {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

interface Image {
  height: number;
  url: string;
  width: number;
}

interface ExternalUrls {
  spotify: string;
}
