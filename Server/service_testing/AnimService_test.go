package services_test

import (
	"fmt"
	"log"
	"os"
	"testing"
	"time"
	"twiggs-reviews/server/domain"
	"twiggs-reviews/server/repositories"
	"twiggs-reviews/server/services"

	"github.com/joho/godotenv"
)

// black-box testing of AnimationServices.go using PostgreSQL database
// go test -v

// Test AddAnime service
func XTestAddAnime(t *testing.T) {
	err := godotenv.Load("../.env.local")
	if err != nil {
		log.Fatal(err)
	}

	var psqlConfig Config = Config{
		Host: os.Getenv("DB_HOST"),
		Port: os.Getenv("DB_PORT"),
		Password: os.Getenv("DB_PASS"),
		User: os.Getenv("DB_USER"),
		DBName: os.Getenv("DB_NAME"),
		SSLMode: os.Getenv("DB_SSLMODE"),
	}
	
	db := PSQLConnection(&psqlConfig)
	animeRepo := repositories.NewAnimationRepository(db)
	animService := services.NewAnimationService(animeRepo)
	media := domain.Media{
		MediaName: "Hiromiya",
		MediaType: "Anime",
		Genre: []string{"Romance", "Shoujo"},
		LastEnlightened: time.Now().Format(time.DateOnly),
	}
	anime := domain.Animation{
		GeneralInfo: &media,
		Studio: "ufotable",
		Season: 1,
		Episode: 13,
	}
	content := domain.IMediaFile{AnimeContent: &anime}

	result := animService.AddAnime(&content)
	if !result {
		t.Errorf("Failed to add anime: %+#v and media: %+#v", anime, media)
	}

}

func TestAllAnime(t *testing.T) {
	err := godotenv.Load("../.env.local")
	if err != nil {
		log.Fatal(err)
	}

	var psqlConfig Config = Config{
		Host: os.Getenv("DB_HOST"),
		Port: os.Getenv("DB_PORT"),
		Password: os.Getenv("DB_PASS"),
		User: os.Getenv("DB_USER"),
		DBName: os.Getenv("DB_NAME"),
		SSLMode: os.Getenv("DB_SSLMODE"),
	}
	
	db := PSQLConnection(&psqlConfig)
	animeRepo := repositories.NewAnimationRepository(db)
	animService := services.NewAnimationService(animeRepo)
	result, ok := animService.AllAnime()
	if len(result) == 0 {
		t.Errorf("No animations found")
	} else if !ok {
		t.Errorf("Failed to retrieve animation")
	} else {
		for _, anime := range result {
			fmt.Printf("General Info: %+v\n\t Anime: %+v\n", *anime.AnimeContent.GeneralInfo, *anime.AnimeContent)
		}
	}
}

func TestAnime(t *testing.T) {
	err := godotenv.Load("../.env.local")
	if err != nil {
		log.Fatal(err)
	}

	var psqlConfig Config = Config{
		Host: os.Getenv("DB_HOST"),
		Port: os.Getenv("DB_PORT"),
		Password: os.Getenv("DB_PASS"),
		User: os.Getenv("DB_USER"),
		DBName: os.Getenv("DB_NAME"),
		SSLMode: os.Getenv("DB_SSLMODE"),
	}
	
	db := PSQLConnection(&psqlConfig)
	animeRepo := repositories.NewAnimationRepository(db)
	animService := services.NewAnimationService(animeRepo)

	var id int = 9
	result, ok := animService.Anime(id)
	if !ok {
		t.Errorf("Anime with id %d does not exist", id)
	} else {
		fmt.Printf("General Info: %+v\n\t Anime: %+v\n", *result.AnimeContent.GeneralInfo, *result.AnimeContent)
	}

}

func XTestRemoveAnime(t *testing.T) {
	err := godotenv.Load("../.env.local")
	if err != nil {
		log.Fatal(err)
	}

	var psqlConfig Config = Config{
		Host: os.Getenv("DB_HOST"),
		Port: os.Getenv("DB_PORT"),
		Password: os.Getenv("DB_PASS"),
		User: os.Getenv("DB_USER"),
		DBName: os.Getenv("DB_NAME"),
		SSLMode: os.Getenv("DB_SSLMODE"),
	}
	
	db := PSQLConnection(&psqlConfig)
	animeRepo := repositories.NewAnimationRepository(db)
	animService := services.NewAnimationService(animeRepo)
	var id int = 8
	ok := animService.DeleteAnime(id)
	if !ok {
		t.Errorf("Failed to delete aniem with id %d. May not exist!", id)
	}
}
