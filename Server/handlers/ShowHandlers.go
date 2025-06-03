package handlers

import (
	"net/http"
	"strconv"
	"twiggs-reviews/server/domain"

	"github.com/gofiber/fiber/v2"
)

type show = domain.Show

func (env *HandlerEnv) CreateShow(context *fiber.Ctx) error {
	show := &show{GeneralInfo: &domain.Media{}}
	if err := context.BodyParser(show); err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"message":"Invalid show provided"})
		return err
	}

	if env.ShowService.AddShow(&media{ShowContent: show}) {
		context.Status(http.StatusOK).JSON(
			&fiber.Map{"message":"Successfully created show"})
		
	} else {
		context.Status(http.StatusBadGateway).JSON(
			&fiber.Map{"message":"Failed to create show"})
	}
	return nil
}

func (env *HandlerEnv) ListShow (context *fiber.Ctx) error {
	shows, ok := env.ShowService.AllShows()

	if ok {
		context.Status(http.StatusOK).JSON(
			&fiber.Map{
				"message":"Successfully retrieved user shows",
				"data": shows,
			})

	} else {
		context.Status(http.StatusBadGateway).JSON(
			&fiber.Map{"message":"Failed retrieve shows"})
	}
	return nil
}

func (env *HandlerEnv) ShowById(context *fiber.Ctx) error {
	id, err := strconv.Atoi(context.Params("id"))
	if err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"message":"Invalid show ID provided"})
		return err
	}

	if show, ok := env.ShowService.Show(id); ok {
		if show == nil {
			context.Status(http.StatusOK).JSON(
				&fiber.Map{
					"message":"show does not exist",
					"data": "",
				})
		} else{
		context.Status(http.StatusOK).JSON(
			&fiber.Map{
				"message":"Successfully retrieved user shows",
				"data": show,
			})
		}
	} else {
		context.Status(http.StatusBadGateway).JSON(
			&fiber.Map{"message":"Failed to retrieve show"})
	}
	return nil
}

func (env *HandlerEnv) RemoveShow(context *fiber.Ctx) error {
	id, err := strconv.Atoi(context.Params("id"))
	if err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"message":"Invalid show ID provided"})
		return err
	}

	if env.ShowService.DeleteShow(id) {
		context.Status(http.StatusOK).JSON(
			&fiber.Map{"message":"Successfully deleted the show"})
		
	} else {
		context.Status(http.StatusBadGateway).JSON(
			&fiber.Map{"message":"Failed to delete the show"})
	}
	return nil
}