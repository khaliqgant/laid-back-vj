interface Thumb {
    height: number;
    url: string;
    width: number;
}

interface Snippet {
    channelId: string;
    channelTitle: string;
    description: string;
    liveBroadcastContent: string;
    publishedAt: string;
    thumbnails: {
        default: Thumb;
        high: Thumb;
        medium: Thumb;
    };
    title: string;
}

interface Item {
    etag: string;
    id: {
        kind: string;
        videoId: string;
    };
    kind: string;
    snippet: Snippet;
}

interface Response {
    etag: string;
    items: Item[];
}

interface Methods {
  [key: string]: any;
}

interface SearchResult {
  artist: string;
  title: string;
  videoId: string;
}

export { Response, Methods, SearchResult, Item };
