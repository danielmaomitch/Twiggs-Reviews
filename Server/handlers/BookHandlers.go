package handlers

import (
	"net/http"
	"strconv"
	"twiggs-reviews/server/domain"

	"github.com/gofiber/fiber/v2"
)

type book = domain.Book

func (env *HandlerEnv) CreateBook(context *fiber.Ctx) error {
	book := &book{GeneralInfo: &domain.Media{}}
	if err := context.BodyParser(book); err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"message":"Invalid book provided"})
		return err
	}

	if env.AnimService.AddAnime(&media{BookContent: book}) {
		context.Status(http.StatusOK).JSON(
			&fiber.Map{"message":"Successfully created book"})
		
	} else {
		context.Status(http.StatusBadGateway).JSON(
			&fiber.Map{"message":"Failed to create book"})
	}
	return nil
}

func (env *HandlerEnv) ListBook(context *fiber.Ctx) error {
	books, ok := env.BookService.AllBook()

	if ok {
		context.Status(http.StatusOK).JSON(
			&fiber.Map{
				"message":"Successfully retrieved user books",
				"data": books,
			})

	} else {
		context.Status(http.StatusBadGateway).JSON(
			&fiber.Map{"message":"Failed to retrieve books"})
	}
	return nil
}

func (env *HandlerEnv) BookById(context *fiber.Ctx) error {
	id, err := strconv.Atoi(context.Params("id"))
	if err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"message":"Invalid book ID provided"})
		return err
	}

	if book, ok := env.BookService.Book(id); ok {
		if book == nil {
			context.Status(http.StatusOK).JSON(
				&fiber.Map{
					"message":"book does not exist",
					"data": "",
				})
		} else{
		context.Status(http.StatusOK).JSON(
			&fiber.Map{
				"message":"Successfully retrieved user books",
				"data": book,
			})
		}
	} else {
		context.Status(http.StatusBadGateway).JSON(
			&fiber.Map{"message":"Failed to retrieve book"})
	}
	return nil
}

func (env *HandlerEnv) RemoveBook(context *fiber.Ctx) error {
	id, err := strconv.Atoi(context.Params("id"))
	if err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"message":"Invalid book ID provided"})
		return err
	}

	if env.BookService.DeleteBook(id) {
		context.Status(http.StatusOK).JSON(
			&fiber.Map{"message":"Successfully deleted the book"})
		
	} else {
		context.Status(http.StatusBadGateway).JSON(
			&fiber.Map{"message":"Failed to delete the book"})
	}
	return nil
}