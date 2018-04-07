export interface Response {
    filter: string;
    message: string;
    videos: {
        artist: string;
        title: string;
        videoId: string;
    };
}
