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

export { TrackQuery, ArtistQuery };

