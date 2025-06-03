package repositories

import (
	"database/sql"
	"log"
	"twiggs-reviews/server/domain"
)

type reviewRepository struct {
	DB *sql.DB
}

func NewReviewRepository(DB *sql.DB) *reviewRepository {
	return &reviewRepository{DB: DB}
}

func (r *reviewRepository) List() ([]*mediaFile, bool) {
	rows, err := r.DB.Query("SELECT review.id, media.id, media_name, media_type, last_enlightened, body FROM media JOIN review ON media.id = review.media_id")
	if err != nil {
		log.Printf("Failed to query all from review: %#v", err)
		return nil, false
	}
	defer rows.Close()

	reviews := make([]*mediaFile, 0, 20)
	for rows.Next() {
		var cur review = review{GeneralInfo: &domain.Media{}}
		if err := rows.Scan(&cur.Id, &cur.GeneralInfo.Id, &cur.GeneralInfo.MediaName, &cur.GeneralInfo.MediaType, &cur.GeneralInfo.LastEnlightened, &cur.Body); err != nil {
			log.Printf("Failed to unmarshal review rows: %#v", err)
			return nil, false
		}
		if ok := genres(r.DB, cur.GeneralInfo); !ok {
			return nil, false
		}
		reviews = append(reviews, &mediaFile{ReviewContent: &cur})
	}
	return reviews, true
}

func (r  *reviewRepository) GetById(id int) (*mediaFile, bool) {
	review := review{GeneralInfo: &domain.Media{}}
	row := r.DB.QueryRow("SELECT review.id, media.id, media_name, media_type, last_enlightened, body FROM media JOIN review ON media.id = review.media_id WHERE review.id = $1", id)
	if err:= row.Scan(&review.Id, &review.GeneralInfo.Id, &review.GeneralInfo.MediaName, &review.GeneralInfo.MediaType, &review.GeneralInfo.LastEnlightened, &review.Body); err != nil {
		if err == sql.ErrNoRows {
			log.Printf("Could not find review with media_id: %d", id)
			return nil, true
		} else {
			log.Printf("Failed to query animation by media_id: %#v", err)
			return &mediaFile{}, false
		}
	}
	if ok := genres(r.DB, review.GeneralInfo); !ok {
		return &mediaFile{}, false
	}
	return &mediaFile{ReviewContent: &review}, true
}

func (r *reviewRepository) Create(content *mediaFile) bool {
	media := content.ReviewContent.GeneralInfo
	id, exists := exists(r.DB, media)
	if !exists {
		log.Printf("No media object exists to create review for\n\tname: %s, type: %s", 
					media.MediaName, media.MediaType)
		return false
	}

	review := content.ReviewContent
	if _, err := r.DB.Exec("INSERT INTO review (media_id, body) VALUES ($1, $2)", id, review.Body); err != nil {
		log.Printf("Failed to insert review into db: %+v\n\tError: %#v", review, err)
		return false
	}
	return true
}

func (r *reviewRepository) Remove(id int) bool {
	if _, err := r.DB.Exec("DELETE FROM review WHERE id = $1", id); err != nil {
		log.Printf("Failed to remove review from db: %#v", err)
		return false
	}
	return true
}