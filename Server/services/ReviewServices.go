package services

import "twiggs-reviews/server/domain"

type ReviewServices struct {
	mediaRepo ContentRepository
}

func NewReviewService(mediaRepo ContentRepository) *ReviewServices {
	return &ReviewServices{mediaRepo: mediaRepo}
}

func (r *ReviewServices) AddReview(content *domain.IMediaFile) bool {
	ok := r.mediaRepo.Create(content)
	return ok
}

func (r *ReviewServices) AllReviews() ([]*domain.IMediaFile, bool) {
	reviews, ok := r.mediaRepo.List()
	return reviews, ok
}

func (r *ReviewServices) Review(id int) (*domain.IMediaFile, bool) {
	review, ok := r.mediaRepo.GetById(id)
	return review, ok
}

func (r *ReviewServices) DeleteReview(id int) bool {
	ok := r.mediaRepo.Remove(id)
	return ok
}