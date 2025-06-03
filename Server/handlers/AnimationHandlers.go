package handlers

import (
	"net/http"
	"strconv"
	"twiggs-reviews/server/domain"

	"github.com/gofiber/fiber/v2"
)

type animation = domain.Animation

func (env *HandlerEnv) CreateAnime(context *fiber.Ctx) error {
	animation := &animation{GeneralInfo: &domain.Media{}}
	if err := context.BodyParser(animation); err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"message":"Invalid animation provided"})
		return err
	}

	if env.AnimService.AddAnime(&media{AnimeContent: animation}) {
		context.Status(http.StatusOK).JSON(
			&fiber.Map{"message":"Successfully created animation"})
		
	} else {
		context.Status(http.StatusBadGateway).JSON(
			&fiber.Map{"message":"Failed to create animation"})
	}
	return nil
}

func (env *HandlerEnv) ListAnime(context *fiber.Ctx) error {
	animations, ok := env.AnimService.AllAnime()

	if ok {
		context.Status(http.StatusOK).JSON(
			&fiber.Map{
				"message":"Successfully retrieved user animations",
				"data": animations,
			})

	} else {
		context.Status(http.StatusBadGateway).JSON(
			&fiber.Map{"message":"Failed to retrieve animations"})
	}
	return nil
}

func (env *HandlerEnv) AnimeById(context *fiber.Ctx) error {
	id, err := strconv.Atoi(context.Params("id"))
	if err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"message":"Invalid animation ID provided"})
		return err
	}

	if animation, ok := env.AnimService.Anime(id); ok {
		if animation == nil {
			context.Status(http.StatusOK).JSON(
				&fiber.Map{
					"message":"Animation does not exist",
					"data": "",
				})
		} else{
		context.Status(http.StatusOK).JSON(
			&fiber.Map{
				"message":"Successfully retrieved user animations",
				"data": animation,
			})
		}
	} else {
		context.Status(http.StatusBadGateway).JSON(
			&fiber.Map{"message":"Failed to retrieve animation"})
	}
	return nil
}

func (env *HandlerEnv) RemoveAnime(context *fiber.Ctx) error {
	id, err := strconv.Atoi(context.Params("id"))
	if err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"message":"Invalid animation ID provided"})
		return err
	}

	if env.AnimService.DeleteAnime(id) {
		context.Status(http.StatusOK).JSON(
			&fiber.Map{"message":"Successfully deleted the animation"})
		
	} else {
		context.Status(http.StatusBadGateway).JSON(
			&fiber.Map{"message":"Failed to delete the animation"})
	}
	return nil
}