interface Query {
    query: string;
    artist: string;
}

interface ArtistQuery extends Query {
    ranking: string;
}

interface TrackQuery extends Query {
    title: string;
}

interface RouteInfo {
  filter: string;
  link: string;
  method: string;
}

export { TrackQuery, ArtistQuery, RouteInfo };

