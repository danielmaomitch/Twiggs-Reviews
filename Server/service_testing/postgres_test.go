package services_test

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

type Config struct {
	Host string
	Port string
	Password string
	User string
	DBName string
	SSLMode string
}

func PSQLConnection(config *Config) *sql.DB {
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