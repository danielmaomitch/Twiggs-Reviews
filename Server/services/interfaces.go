package services

import (
	"twiggs-reviews/server/domain"
) 

type ContentRepository interface {
	List() ([]*domain.IMediaFile, bool)
	GetById(id int) (*domain.IMediaFile, bool)
	Create(content *domain.IMediaFile) bool
	Remove(id int) bool
}

type ReviewRepository interface {
	List()
	GetById()
	Create()
	Remove()
}

// services need a validator to check content fields arent empty or problematic