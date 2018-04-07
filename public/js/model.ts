interface Model {
    userName: string;
    videos: {
        artist: string;
        videoId: string;
        title: string;
    }[];
}

const data: Model = {
  userName: '',
  videos: [],
};

module.exports = data;
