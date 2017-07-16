interface Track {
    name: string;
    duration: string;
    playcount: string;
    mbid: string;
    url: string;
    streamable: {
        text: string;
        fulltrack: string
    }
    artist: {
        name: string;
        mbid: string;
        url: string;
    }
    image: {
        text: string;
        size: string;

    }[];
}

interface TopTracks {
    track: Track[]
}
export {TopTracks, Track};

