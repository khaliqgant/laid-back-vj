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
    friends: User[];
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

export { Tracks, Track, User, Friends, Artists, Artist };
