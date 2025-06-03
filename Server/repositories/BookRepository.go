package repositories

import (
	"database/sql"
	"log"
	"twiggs-reviews/server/domain"
)

type bookRepository struct {
	DB *sql.DB
}

func NewBookRepository(DB *sql.DB) *bookRepository {
	return &bookRepository{DB: DB}
}

func (r *bookRepository) List() ([]*mediaFile, bool) {
	rows, err := r.DB.Query("SELECT id, media_name, media_type, last_enlightened, author, latest_volume_read, volumes_released FROM media JOIN book ON media.id = book.media_id")
	if err != nil {
		log.Printf("Failed to query all from book: %#v", err)
		return nil, false
	}
	defer rows.Close()

	books := make([]*mediaFile, 0, 20)
	for rows.Next() {
		var cur book = book{GeneralInfo: &domain.Media{}}
		if err := rows.Scan(&cur.GeneralInfo.Id, &cur.GeneralInfo.MediaName, &cur.GeneralInfo.MediaType, &cur.GeneralInfo.LastEnlightened, &cur.Author, &cur.LatestVolumeRead, &cur.VolumesReleased); err != nil{
			log.Printf("Failed to unmarshal animation rows: %#v", err)
			return nil, false
		}
		if ok := genres(r.DB, cur.GeneralInfo); !ok {
			return nil, false
		}
		books = append(books, &mediaFile{BookContent: &cur})
	}
	return books, true
}

func (r *bookRepository) GetById(id int) (*mediaFile, bool) {
	book := book{GeneralInfo: &domain.Media{}}

	row := r.DB.QueryRow("SELECT id, media_name, media_type, last_enlightened, author, latest_volume_read, volumes_released FROM media JOIN book ON media.id = book.media_id WHERE media.id = $1", id)
	if err := row.Scan(&book.GeneralInfo.Id, &book.GeneralInfo.MediaName, &book.GeneralInfo.MediaType, &book.GeneralInfo.LastEnlightened, &book.Author, &book.LatestVolumeRead, &book.VolumesReleased); err != nil {
		if err == sql.ErrNoRows {
			log.Printf("Could not find book with id: %d", id)
			return nil, true
		} else {
			log.Printf("Failed to query book by id: %#v", err)
			return &mediaFile{}, false
		}
	}
	if ok := genres(r.DB, book.GeneralInfo); !ok {
		return &mediaFile{}, false
	}
	return &mediaFile{BookContent: &book}, true
}

func (r *bookRepository) Create(content *mediaFile) bool {
	media := content.ComicContent.GeneralInfo
	id, ok := createMedia(r.DB, media)
	if !ok {
		return false
	}

	book := content.BookContent
	_, err := r.DB.Exec("INSERT INTO book (media_id, author, latest_volume_read, volumes_released) VALUES ($1, $2, $3, $4)", 
						id, book.Author, book.LatestVolumeRead, book.VolumesReleased)
	if err != nil {
		log.Printf("Failed to insert book: %+v\n\tError: %#v", book, err)
		return false
	}
	return true
}

func (r *bookRepository) Remove(id int) bool {
	if _, err := r.DB.Exec("DELETE FROM media WHERE id = $1", id); err != nil {
		log.Printf("Failed to delete media: %#v", err)
		return false
	}
	return true
}