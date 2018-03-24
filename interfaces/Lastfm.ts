interface Image {
    '#text': string;
    size: string;
}

interface Track {
    name: string;
    duration: string;
    playcount: string;
    mbid: string;
    url: string;
    streamable: {
        text: string;
        fulltrack: string
    };
    artist: {
        name: string;
        mbid: string;
        url: string;
        '#text': string;
    };
    image: Image[];
}

interface Tracks {
    track: Track[];
}

interface User {
    name: string;
    realname: string;
    image: Image[];
    url: string;
    country: string;
    age: string;
    gender: string;
    subscriber: string;
    playcount: string;
    playlists: string;
    bootstrap: string;
    registered: {
        '#text': number;
        unixtime: string
    };
    type: string;
}

interface Friends {
    '@attr': {
        for: string;
        page: string;
        perPage: string;
        total: string;
        totalPages: string;
    };
    user: User[];
}

interface Artist {
    name: string;
    playcount: string;
    mdid: string;
    url: string;
    streamable: string;
    image: Image[];
    '#text': string;
    '@attr': {
        rank: 'string',
    };
}

interface Artists {
    artist: Artist[];
}

interface SearchParams {
    limit: number;
    period?: string;
    user: string;
}

export { Tracks, Track, User, Friends, Artists, Artist, SearchParams };
