package repositories

import (
	"database/sql"
	"log"
	"twiggs-reviews/server/domain"
)

type comicRepository struct {
	DB *sql.DB
}

func NewComicRepository(DB *sql.DB) *comicRepository {
	return &comicRepository{DB: DB}
}

func (r *comicRepository) List() ([]*mediaFile, bool) {
	rows, err := r.DB.Query("SELECT id, media_name, media_type, last_enlightened, author, chapters_read, last_read, chapters_released, oneshot FROM media JOIN comic ON media.id = comic.media_id")
	if err != nil {
		log.Printf("Failed to query all from comic: %#v", err)
		return nil, false
	}
	defer rows.Close()

	comics := make([]*mediaFile, 0, 20)
	for rows.Next() {
		var cur comic = comic{GeneralInfo: &domain.Media{}}
		if err := rows.Scan(&cur.GeneralInfo.Id, &cur.GeneralInfo.MediaName, &cur.GeneralInfo.MediaType, &cur.GeneralInfo.LastEnlightened, &cur.Author, &cur.ChaptersRead, &cur.LastRead, &cur.ChaptersReleased, &cur.OneShot); err != nil{
			log.Printf("Failed to unmarshal comic rows: %#v", err)
			return nil, false
		}
		if ok := genres(r.DB, cur.GeneralInfo); !ok {
			return nil, false
		}
		comics = append(comics, &mediaFile{ComicContent: &cur})
	}
	return comics, true
}

func (r *comicRepository) GetById(id int) (*mediaFile, bool) {
	comic := comic{GeneralInfo: &domain.Media{}}

	row := r.DB.QueryRow("SELECT id, media_name, media_type, last_enlightened, author, chapters_read, last_read, chapters_released, oneshot FROM media JOIN comic ON media.id = comic.media_id WHERE media.id = $1", id)
	if err := row.Scan(&comic.GeneralInfo.Id, &comic.GeneralInfo.MediaName, &comic.GeneralInfo.MediaType, &comic.GeneralInfo.LastEnlightened, &comic.Author, &comic.ChaptersRead, &comic.LastRead, &comic.ChaptersReleased, &comic.OneShot); err != nil {
		if err == sql.ErrNoRows {
			log.Printf("Could not find comic with id: %d", id)
			return nil, true
		} else {
			log.Printf("Failed to query comic by id: %#v", err)
			return &mediaFile{}, false
		}
	}
	if ok := genres(r.DB, comic.GeneralInfo); !ok {
		return &mediaFile{}, false
	}
	return &mediaFile{ComicContent: &comic}, true
}

func (r *comicRepository) Create(content *mediaFile) bool { 
	media := content.AnimeContent.GeneralInfo
	id, ok := createMedia(r.DB, media)
	if !ok {
		return false
	}

	comic := content.ComicContent
	_, err := r.DB.Exec("INSERT INTO comic (media_id, author, chapters_read, last_read, chapters_released, oneshot) VALUES ($1, $2, $3, $4, $5, $6)",
						id,comic.Author, comic.ChaptersRead, comic.LastRead, comic.ChaptersReleased, comic.OneShot)
	if err != nil {
		log.Printf("Failed to insert comic: %+v\n\tError: %#v", comic, err)
		return false
	}
	return true
}

func (r *comicRepository) Remove(id int) bool {
	if _, err := r.DB.Exec("DELETE FROM media WHERE id = $1", id); err != nil {
		log.Printf("Failed to delete media: %#v", err)
		return false
	}
	return true
}
