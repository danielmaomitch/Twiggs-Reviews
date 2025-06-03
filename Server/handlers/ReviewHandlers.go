package handlers

import (
	"net/http"
	"strconv"
	"twiggs-reviews/server/domain"

	"github.com/gofiber/fiber/v2"
)

type review = domain.Review

func (env *HandlerEnv) CreateReview(context *fiber.Ctx) error {
	review := &review{GeneralInfo: &domain.Media{}}
	if err := context.BodyParser(review); err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"message":"Invalid review provided"})
		return err
	}

	if env.RevService.AddReview(&media{ReviewContent: review}) {
		context.Status(http.StatusOK).JSON(
			&fiber.Map{"message":"Successfully created review"})
		
	} else {
		context.Status(http.StatusBadGateway).JSON(
			&fiber.Map{"message":"Failed to create review"})
	}
	return nil
}

func (env *HandlerEnv) ListReview(context *fiber.Ctx) error {
	reviews, ok := env.RevService.AllReviews()

	if ok {
		context.Status(http.StatusOK).JSON(
			&fiber.Map{
				"message":"Successfully retrieved user reviews",
				"data": reviews,
			})

	} else {
		context.Status(http.StatusBadGateway).JSON(
			&fiber.Map{"message":"Failed retrieve reviews"})
	}
	return nil
}

func (env *HandlerEnv) ReviewById(context *fiber.Ctx) error {
	id, err := strconv.Atoi(context.Params("id"))
	if err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"message":"Invalid review ID provided"})
		return err
	}

	if review, ok := env.RevService.Review(id); ok {
		if review == nil {
			context.Status(http.StatusOK).JSON(
				&fiber.Map{
					"message":"Animation does not exist",
					"data": "",
				})
		} else{
		context.Status(http.StatusOK).JSON(
			&fiber.Map{
				"message":"Successfully retrieved user reviews",
				"data": review,
			})
		}
	} else {
		context.Status(http.StatusBadGateway).JSON(
			&fiber.Map{"message":"Failed to retrieve review"})
	}
	return nil
}

func (env *HandlerEnv) RemoveReview(context *fiber.Ctx) error {
	id, err := strconv.Atoi(context.Params("id"))
	if err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"message":"Invalid review ID provided"})
		return err
	}

	if env.RevService.DeleteReview(id) {
		context.Status(http.StatusOK).JSON(
			&fiber.Map{"message":"Successfully deleted the review"})
		
	} else {
		context.Status(http.StatusBadGateway).JSON(
			&fiber.Map{"message":"Failed to delete the review"})
	}
	return nil
}