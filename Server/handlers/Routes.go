package handlers

import (
	"twiggs-reviews/server/domain"
	"twiggs-reviews/server/services"

	"github.com/gofiber/fiber/v2"
)

type media = domain.IMediaFile

type HandlerEnv struct {
	RevService		*services.ReviewServices
	AnimService 	*services.AnimationServices
	ShowService 	*services.ShowServices
	ComicService 	*services.ComicServices
	BookService 	*services.BookServices
}

func (env *HandlerEnv) SetupRoutes(app *fiber.App) {
	review := app.Group("catalog/review")
	review.Post("/create", env.CreateReview)
	review.Get("", env.ListReview)
	review.Get(":id", env.ReviewById)
	review.Delete("/delete/:id", env.RemoveReview)

	animationCatalog := app.Group("/catalog/animation")
	animationCatalog.Post("/create", env.CreateAnime)
	animationCatalog.Get("", env.ListAnime)
	animationCatalog.Get("/:id", env.AnimeById)	
	animationCatalog.Delete("/delete/:id", env.RemoveAnime)

	show := app.Group("catalog/show")
	show.Post("/create", env.CreateShow)
	show.Get("", env.ListShow)
	show.Get(":id", env.ShowById)
	show.Delete("/delete/:id", env.RemoveShow)

	comic := app.Group("catalog/review")
	comic.Post("/create", env.CreateComic)
	comic.Get("", env.ListComic)
	comic.Get(":id", env.ComicById)
	comic.Delete("/delete/:id", env.RemoveComic)

	book := app.Group("catalog/book")
	book.Post("/create", env.CreateBook)
	book.Get("", env.ListBook)
	book.Get(":id", env.BookById)
	book.Delete("/delete/:id", env.RemoveBook)
}
