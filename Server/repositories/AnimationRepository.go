package repositories

import (
	"database/sql"
	"log"
	"twiggs-reviews/server/domain"
)



type animationRepository struct {
	DB *sql.DB
}

func NewAnimationRepository(DB *sql.DB) *animationRepository {
	return &animationRepository{DB: DB}
}

func (r *animationRepository) List() ([]*mediaFile, bool) {
	rows, err := r.DB.Query("SELECT id, media_name, media_type, last_enlightened, studio, season, episode FROM media JOIN animation ON media.id = animation.media_id")
	if err != nil {
		log.Printf("Failed to query all from animation: %#v", err)
		return nil, false
	}
	defer rows.Close()

	animations := make([]*mediaFile, 0, 20)
	for rows.Next() {
		var cur animation = animation{GeneralInfo: &domain.Media{}}
		if err := rows.Scan(&cur.GeneralInfo.Id, &cur.GeneralInfo.MediaName, &cur.GeneralInfo.MediaType, &cur.GeneralInfo.LastEnlightened, &cur.Studio, &cur.Season, &cur.Episode); err != nil{
			log.Printf("Failed to unmarshal animation rows: %#v", err)
			return nil, false
		}
		if ok := genres(r.DB, cur.GeneralInfo); !ok {
			return nil, false
		}
		animations = append(animations, &mediaFile{AnimeContent: &cur})
	}
	return animations, true
}

func (r *animationRepository) GetById(id int) (*mediaFile, bool) {
	animation := animation{GeneralInfo: &domain.Media{}}

	row := r.DB.QueryRow("SELECT id, media_name, media_type, last_enlightened, studio, season, episode FROM media JOIN animation ON media.id = animation.media_id WHERE media.id = $1", id)
	if err := row.Scan(&animation.GeneralInfo.Id, &animation.GeneralInfo.MediaName, &animation.GeneralInfo.MediaType, &animation.GeneralInfo.LastEnlightened, &animation.Studio, &animation.Season, &animation.Episode); err != nil {
		if err == sql.ErrNoRows {
			log.Printf("Could not find animation with id: %d", id)
			return nil, true
		} else {
			log.Printf("Failed to query animation by id: %#v", err)
			return &mediaFile{}, false
		}
	}
	if ok := genres(r.DB, animation.GeneralInfo); !ok {
		return &mediaFile{}, false
	}
	return &mediaFile{AnimeContent: &animation}, true
}

func (r *animationRepository) Create(content *mediaFile) bool {
	media := content.AnimeContent.GeneralInfo
	id, ok := createMedia(r.DB, media)
	if !ok {
		return false
	}

	animation := content.AnimeContent
	_, err := r.DB.Exec("INSERT INTO animation (media_id, studio, season, episode) VALUES ($1, $2, $3, $4)", 
						id, animation.Studio, animation.Season, animation.Episode)
	if err != nil {
		log.Printf("Failed to insert animation: %+v\n\tError: %#v", animation, err)
		return false
	}
	return true
}

func (r *animationRepository) Remove(id int) bool {
	if _, err := r.DB.Exec("DELETE FROM media WHERE id = $1", id); err != nil {
		log.Printf("Failed to delete media: %#v", err)
		return false
	}
	return true
}
