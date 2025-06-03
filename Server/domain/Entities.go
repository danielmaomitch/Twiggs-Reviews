package domain

type Media struct {
	Id              int      `json:"id"`
	MediaName       string   `json:"mediaName"`
	MediaType       string   `json:"mediaType"`
	Genre           []string `json:"genre"`
	LastEnlightened string   `json:"lastEnlightened"`
}

type Review struct {
	GeneralInfo *Media `json:"generalInfo"`
	Id          int    `json:"id"`
	Body        string `json:"body"`
}

type Animation struct {
	GeneralInfo *Media `json:"generalInfo"`
	Studio      string `json:"studio"`
	Season      int    `json:"season"`
	Episode     int    `json:"episode"`
}

type Comic struct {
	GeneralInfo      *Media `json:"generalInfo"`
	Author           string `json:"author"`
	ChaptersRead     string `json:"chaptersRead"`
	LastRead         string `json:"lastRead"`
	ChaptersReleased string `json:"chaptersReleased"`
	OneShot          bool   `json:"oneShot"`
}

type Book struct {
	GeneralInfo      *Media `json:"generalInfo"`
	Author           string `json:"author"`
	LatestVolumeRead string `json:"latestVolumeRead"`
	VolumesReleased  string `json:"volumesReleased"`
}

type Show struct {
	GeneralInfo *Media `json:"generalInfo"`
	WatchedOn   string `json:"watchedOn"`
	Season      int    `json:"season"`
	Episode     int    `json:"episode"`
}

type IMediaFile struct {
	ReviewContent *Review    `json:"reviewContent"`
	AnimeContent  *Animation `json:"animeContent"`
	ComicContent  *Comic     `json:"comicContent"`
	BookContent   *Book      `json:"bookContent"`
	ShowContent   *Show
}
