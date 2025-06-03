package repositories

import (
	"database/sql"
	"log"
	"twiggs-reviews/server/domain"
)

type mediaFile = domain.IMediaFile
type review = domain.Review
type animation = domain.Animation
type comic = domain.Comic
type book = domain.Book
type show = domain.Show

func exists(r *sql.DB, content *domain.Media) (*int, bool) {
	id := new(int)
	row := r.QueryRow("SELECT id FROM media WHERE media_name = $1 and media_type = $2", 
						content.MediaName, content.MediaType)
	if err := row.Scan(&id); err != nil {
		// row is empty
		log.Print("Error retrieving column, or column doesn't exist: ", err) 
		return nil, false
	}
	return id, true
}

func createMedia(r *sql.DB, content *domain.Media) (int, bool) {
	// media object already exists
	id, exists := exists(r, content)
	if exists {
		return *id, false
	}

	_, err := r.Exec("INSERT INTO media (media_name, media_type, last_enlightened) VALUES ($1, $2, $3)",
						content.MediaName, content.MediaType, content.LastEnlightened)
	if err != nil {
		log.Print("Failed to insert generalInfo: ", err)
		return 0, false
	}
	latestId := getLatestId(r)
	for _, value := range content.Genre {
		_, err := r.Exec("INSERT INTO genre (media_id, name) VALUES ($1, $2)",
							latestId, value)
		if err != nil {
			log.Printf("Failed to insert genre with id: %d name: %s \nError: %v", content.Id, value, err)
			return 0, false
		}			
	}
	return latestId, true
}

func genres(r *sql.DB, content *domain.Media) bool {
	rows, err := r.Query("SELECT name FROM genre WHERE media_id = $1", content.Id)
	if err != nil {
		log.Printf("Failed to query genre of media with id: %d \n\t Error: %v", content.Id, err)
		return false
	}
	defer rows.Close()

	genres := make([]string, 0, 5)
	for rows.Next() {
		var cur string
		if err := rows.Scan(&cur); err != nil {
			log.Printf("Failed to unmarshal genre rows; %#v", err)
			return false
		}
		genres = append(genres, cur)
	}
	content.Genre = genres
	return true
}

func getLatestId(r *sql.DB) int {
	row := r.QueryRow("SELECT id FROM media ORDER BY id DESC LIMIT 1")
	var tableId int
	if err := row.Scan(&tableId); err != nil {
		if err == sql.ErrNoRows {
			log.Fatalf("No records exist in table media")
		}
		log.Fatalf("Failed to retrieve latest record from media \nError: %#v", err)	
	}
	return tableId
}