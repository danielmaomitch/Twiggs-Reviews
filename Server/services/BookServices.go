package services

import "twiggs-reviews/server/domain"

type BookServices struct {
	mediaRepo ContentRepository
}

func NewBookService(mediaRepo ContentRepository) *BookServices {
	return &BookServices{mediaRepo: mediaRepo}
}

func (r *BookServices) AddBook(content *domain.IMediaFile) bool {
	ok := r.mediaRepo.Create(content)
	return ok
}

func (r *BookServices) AllBook() ([]*domain.IMediaFile, bool) {
	books, ok := r.mediaRepo.List()
	return books, ok
}

func (r *BookServices) Book(id int) (*domain.IMediaFile, bool) {
	book, ok := r.mediaRepo.GetById(id)
	return book, ok
}

func (r *BookServices) DeleteBook(id int) bool {
	ok := r.mediaRepo.Remove(id)
	return ok
}