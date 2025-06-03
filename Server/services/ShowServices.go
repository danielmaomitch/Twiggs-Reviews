package services

import "twiggs-reviews/server/domain"

type ShowServices struct {
	mediaRepo ContentRepository
}

func NewShowService(mediaRepo ContentRepository) *ShowServices {
	return &ShowServices{mediaRepo: mediaRepo}
}

func (r *ShowServices) AddShow(content *domain.IMediaFile) bool {
	ok := r.mediaRepo.Create(content)
	return ok
}

func (r *ShowServices) AllShows() ([]*domain.IMediaFile, bool) {
	shows, ok := r.mediaRepo.List()
	return shows, ok
}

func (r *ShowServices) Show(id int) (*domain.IMediaFile, bool) {
	show, ok := r.mediaRepo.GetById(id)
	return show, ok
}

func (r *ShowServices) DeleteShow(id int) bool {
	ok := r.mediaRepo.Remove(id)
	return ok
}