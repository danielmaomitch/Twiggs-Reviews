package handlers

import (
	"net/http"
	"strconv"
	"twiggs-reviews/server/domain"

	"github.com/gofiber/fiber/v2"
)

type comic = domain.Comic

func (env *HandlerEnv) CreateComic(context *fiber.Ctx) error {
	comic := &comic{GeneralInfo: &domain.Media{}}
	if err := context.BodyParser(comic); err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"message":"Invalid comic provided"})
		return err
	}

	if env.ComicService.AddComic(&media{ComicContent: comic}) {
		context.Status(http.StatusOK).JSON(
			&fiber.Map{"message":"Successfully created comic"})
		
	} else {
		context.Status(http.StatusBadGateway).JSON(
			&fiber.Map{"message":"Failed to create comic"})
	}
	return nil
}

func (env *HandlerEnv) ListComic(context *fiber.Ctx) error {
	comics, ok := env.ComicService.AllComics()

	if ok {
		context.Status(http.StatusOK).JSON(
			&fiber.Map{
				"message":"Successfully retrieved user comics",
				"data": comics,
			})

	} else {
		context.Status(http.StatusBadGateway).JSON(
			&fiber.Map{"message":"Failed to retrieve comics"})
	}
	return nil
}

func (env *HandlerEnv) ComicById(context *fiber.Ctx) error {
	id, err := strconv.Atoi(context.Params("id"))
	if err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"message":"Invalid comic ID provided"})
		return err
	}

	if comic, ok := env.ComicService.Comic(id); ok {
		if comic == nil {
			context.Status(http.StatusOK).JSON(
				&fiber.Map{
					"message":"comic does not exist",
					"data": "",
				})
		} else{
		context.Status(http.StatusOK).JSON(
			&fiber.Map{
				"message":"Successfully retrieved user comics",
				"data": comic,
			})
		}
	} else {
		context.Status(http.StatusBadGateway).JSON(
			&fiber.Map{"message":"Failed to retrieve comic"})
	}
	return nil
}

func (env *HandlerEnv) RemoveComic(context *fiber.Ctx) error {
	id, err := strconv.Atoi(context.Params("id"))
	if err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"message":"Invalid comic ID provided"})
		return err
	}

	if env.ComicService.DeleteComic(id) {
		context.Status(http.StatusOK).JSON(
			&fiber.Map{"message":"Successfully deleted the comic"})
		
	} else {
		context.Status(http.StatusBadGateway).JSON(
			&fiber.Map{"message":"Failed to delete the comic"})
	}
	return nil
}