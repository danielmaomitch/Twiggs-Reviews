package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"twiggs-reviews/server/handlers"
	"twiggs-reviews/server/repositories"
	"twiggs-reviews/server/services"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"

	_ "github.com/lib/pq"
)

type config struct {
	Host     string
	Port     string
	Password string
	User     string
	DBName   string
	SSLMode  string
}

func psqlConnection(config *config) *sql.DB {
	dsn := fmt.Sprintf(
		"host=%s port=%s password=%s user=%s dbname=%s sslmode=%s",
		config.Host, config.Port, config.Password, config.User, config.DBName, config.SSLMode,
	)

	db, err := sql.Open("postgres", dsn)
	if err != nil {
		log.Fatalf("Failed to connect to postgres database with the following config: %#v", config)
	}

	return db
}


func main() {
	err := godotenv.Load(".env.local")
	if err != nil {
		log.Fatalf("Error loading env variables; %v", err)
	}

	psqlConfig := config{
		Host:  		os.Getenv("DB_HOST"),
		Port: 		os.Getenv("DB_PORT"),
		Password:	os.Getenv("DB_PASS"),
		User:		os.Getenv("DB_USER"),
		DBName: 	os.Getenv("DB_NAME"),
		SSLMode:	os.Getenv("DB_SSLMODE"),
	}

	db := psqlConnection(&psqlConfig)
	handlerEnv := &handlers.HandlerEnv{}

	reviewRepo := repositories.NewReviewRepository(db)
	handlerEnv.RevService = services.NewReviewService(reviewRepo)

	animeRepo := repositories.NewAnimationRepository(db)
	handlerEnv.AnimService = services.NewAnimationService(animeRepo)

	bookRepo := repositories.NewBookRepository(db)
	handlerEnv.BookService = services.NewBookService(bookRepo)

	comicRepo := repositories.NewComicRepository(db)
	handlerEnv.ComicService = services.NewComicService(comicRepo)

	showRepo := repositories.NewShowRepository(db)
	handlerEnv.ShowService = services.NewShowService(showRepo)
	
	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowHeaders:     "Origin,Content-Type,Accept,Content-Length,Accept-Language,Accept-Encoding,Connection,Access-Control-Allow-Origin",
        AllowOrigins:     "*",
        AllowCredentials: false,
        AllowMethods:     "GET,POST,HEAD,PUT,DELETE,PATCH,OPTIONS",
    }))
	handlerEnv.SetupRoutes(app)
	app.Listen(":8080")
}

// move postgres connection and config to separate file