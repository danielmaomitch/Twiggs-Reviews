type GeneralInfo = {
  id: number;
  mediaName: string;
  mediaType: string;
  genre: string[];
  lastEnlightened: string;
};

export type IReview = {
  data: IReviewContent[];
};

export type IReviewContent = {
  reviewContent: {
    generalInfo: GeneralInfo;
    id: number;
    body: string;
  };
};

export type IAnimation = {
  data: IAnimeContent[];
};

export type IAnimeContent = {
  animeContent: {
    generalInfo: GeneralInfo;
    studio: string;
    season: number;
    episode: number;
  };
};

export type IBook = {
  data: IBookContent[];
};

export type IBookContent = {
  bookContent: {
    generalInfo: GeneralInfo;
    author: string;
    latestVolumeRead: number;
    volumesReleased: number;
  };
};

export type IComic = {
  data: IComicContent[];
};

export type IComicContent = {
  comicContent: {
    generalInfo: GeneralInfo;
    author: string;
    chaptersRead: number;
    chaptersReleased: number;
    oneshot: boolean;
  };
};

export type IShow = {
  data: IShowContent[];
};

export type IShowContent = {
  showContent: {
    generalInfo: GeneralInfo;
    watchedOn: string;
    season: number;
    episode: number;
  };
};
