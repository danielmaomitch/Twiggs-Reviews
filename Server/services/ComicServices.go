package services

import "twiggs-reviews/server/domain"

type ComicServices struct {
	mediaRepo ContentRepository
}

func NewComicService(mediaRepo ContentRepository) *ComicServices {
	return &ComicServices{mediaRepo: mediaRepo}
}

func (r *ComicServices) AddComic(content *domain.IMediaFile) bool {
	ok := r.mediaRepo.Create(content)
	return ok
}

func (r *ComicServices) AllComics() ([]*domain.IMediaFile, bool) {
	comics, ok := r.mediaRepo.List()
	return comics, ok
}

func (r *ComicServices) Comic(id int) (*domain.IMediaFile, bool) {
	comic, ok := r.mediaRepo.GetById(id)
	return comic, ok
}

func (r *ComicServices) DeleteComic(id int) bool {
	ok := r.mediaRepo.Remove(id)
	return ok
}