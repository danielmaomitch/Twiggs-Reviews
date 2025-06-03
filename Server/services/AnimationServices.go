package services

import (
	"twiggs-reviews/server/domain"
) 

type AnimationServices struct {
	mediaRepo ContentRepository
}

func NewAnimationService(mediaRepo ContentRepository) *AnimationServices {
	return &AnimationServices{mediaRepo: mediaRepo}
}

func (r *AnimationServices) AddAnime(content *domain.IMediaFile) bool {
	ok := r.mediaRepo.Create(content)
	return ok
}

func (r *AnimationServices) AllAnime() ([]*domain.IMediaFile, bool) {
	animations, ok := r.mediaRepo.List()
	return animations, ok
}

func (r *AnimationServices) Anime(id int) (*domain.IMediaFile, bool) {
	animation, ok := r.mediaRepo.GetById(id)
	return animation, ok
}

func (r *AnimationServices) DeleteAnime(id int) bool {
	ok := r.mediaRepo.Remove(id)
	return ok
}




