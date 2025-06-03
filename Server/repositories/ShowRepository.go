package repositories

import (
	"database/sql"
	"log"
	"twiggs-reviews/server/domain"
)

type showRepository struct {
	DB *sql.DB
}

func NewShowRepository(DB *sql.DB) *showRepository {
	return &showRepository{DB: DB}
}

func (r *showRepository) List() ([]*mediaFile, bool) {
	rows, err := r.DB.Query("SELECT id, media_name, media_type, last_enlightened, watched_on, season, episode FROM media JOIN show ON media.id = show.media_id")
	if err != nil {
		log.Printf("Failed to query all from show: %#v", err)
		return nil, false
	}
	defer rows.Close()

	shows := make([]*mediaFile, 0, 20)
	for rows.Next() {
		var cur show = show{GeneralInfo: &domain.Media{}}
		if err := rows.Scan(&cur.GeneralInfo.Id, &cur.GeneralInfo.MediaName, &cur.GeneralInfo.MediaType, &cur.GeneralInfo.LastEnlightened, &cur.WatchedOn, &cur.Season, &cur.Episode); err != nil{
			log.Printf("Failed to unmarshal shows rows: %#v", err)
			return nil, false
		}
		if ok := genres(r.DB, cur.GeneralInfo); !ok {
			return nil, false
		}
		shows = append(shows, &mediaFile{ShowContent: &cur})
	}
	return shows, true
}

func (r *showRepository) GetById(id int) (*mediaFile, bool) {
	show := show{GeneralInfo: &domain.Media{}}

	row := r.DB.QueryRow("SELECT id, media_name, media_type, last_enlightened, studio, season, episode FROM media JOIN animation ON media.id = animation.media_id WHERE media.id = $1", id)
	if err := row.Scan(&show.GeneralInfo.Id, &show.GeneralInfo.MediaName, &show.GeneralInfo.MediaType, &show.GeneralInfo.LastEnlightened, &show.WatchedOn, &show.Season, &show.Episode); err != nil {
		if err == sql.ErrNoRows {
			log.Printf("Could not find show with id: %d", id)
			return nil, true
		} else {
			log.Printf("Failed to query show by id: %#v", err)
			return &mediaFile{}, false
		}
	}
	if ok := genres(r.DB, show.GeneralInfo); !ok {
		return &mediaFile{}, false
	}
	return &mediaFile{ShowContent: &show}, true
}

func (r *showRepository) Create(content *mediaFile) bool {
	media := content.ShowContent.GeneralInfo
	id, ok := createMedia(r.DB, media)
	if !ok {
		return false
	}

	show := content.ShowContent
	_, err := r.DB.Exec("INSERT INTO animation (media_id, studio, season, episode) VALUES ($1, $2, $3, $4)", 
						id, show.WatchedOn, show.Season, show.Episode)
	if err != nil {
		log.Printf("Failed to insert show: %+v\n\tError: %#v", show, err)
		return false
	}
	return true
}

func (r *showRepository) Remove(id int) bool {
	if _, err := r.DB.Exec("DELETE FROM media WHERE id = $1", id); err != nil {
		log.Printf("Failed to delete media: %#v", err)
		return false
	}
	return true
}