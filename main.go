package main

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"log"
	"math/rand"
	"net/http"
	"strconv"
	"github.com/gorilla/handlers"
)

type Movie struct {
	ID       string    `json:"id"`
	Isbn     string    `json:"isbn"`
	Title    string    `json:"title"`
	Director *Director `json:"director"`
}

type Director struct {
	FirstName  string `json:"firstName"`
	SecondName string `json:"secondName"`
}

var movies []Movie

func getMovies(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	if params["id"] != "" {
		for _, item := range movies {
			if item.ID == params["id"] {
				err := json.NewEncoder(w).Encode(item)
				if err != nil {
					return
				}
				return
			}
		}
	}
	err := json.NewEncoder(w).Encode(movies)
	if err != nil {
		return
	}
}

func createMovie(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var movie Movie
	_ = json.NewDecoder(r.Body).Decode(&movie)
	movie.ID = strconv.Itoa(rand.Intn(1000000))
	movies = append(movies, movie)
	err := json.NewEncoder(w).Encode(movie)
	if err != nil {
		return
	}
}
func updateMovie(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	var movieID string
	for index, item := range movies {
		if item.ID == params["id"] {
			movieID = item.ID
			movies = append(movies[:index], movies[index+1:]...)
			break
		}
	}
	var movie Movie
	_ = json.NewDecoder(r.Body).Decode(&movie)
	movie.ID = movieID
	movies = append(movies, movie)
	err := json.NewEncoder(w).Encode(movies)
	if err != nil {
		return
	}
}
func deleteMovie(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for index, item := range movies {

		if item.ID == params["id"] {
			movies = append(movies[:index], movies[index+1:]...)
			err := json.NewEncoder(w).Encode(movies)
			if err != nil {
				return
			}
			return
		}
	}
}

func main() {
	r := mux.NewRouter()

	movies = append(movies, Movie{ID: "1", Isbn: "438227", Title: "Movie 1 Title", Director: &Director{FirstName: "NameDirector", SecondName: "SurnameDirector"}})
	movies = append(movies, Movie{ID: "2", Isbn: "438228", Title: "Movie 2 Title", Director: &Director{FirstName: "NameDirector2", SecondName: "SurnameDirector2"}})
	movies = append(movies, Movie{ID: "3", Isbn: "438229", Title: "Movie 3 Title", Director: &Director{FirstName: "NameDirector3", SecondName: "SurnameDirector3"}})
	movies = append(movies, Movie{ID: "4", Isbn: "438230", Title: "Movie 4 Title", Director: &Director{FirstName: "NameDirector4", SecondName: "SurnameDirector4"}})
	movies = append(movies, Movie{ID: "5", Isbn: "438231", Title: "Movie 5 Title", Director: &Director{FirstName: "NameDirector5", SecondName: "SurnameDirector5"}})
	movies = append(movies, Movie{ID: "6", Isbn: "438232", Title: "Movie 6 Title", Director: &Director{FirstName: "NameDirector6", SecondName: "SurnameDirector6"}})
	movies = append(movies, Movie{ID: "7", Isbn: "438233", Title: "Movie 7 Title", Director: &Director{FirstName: "NameDirector7", SecondName: "SurnameDirector7"}})
	movies = append(movies, Movie{ID: "8", Isbn: "438234", Title: "Movie 8 Title", Director: &Director{FirstName: "NameDirector8", SecondName: "SurnameDirector8"}})
	movies = append(movies, Movie{ID: "9", Isbn: "438235", Title: "Movie 9 Title", Director: &Director{FirstName: "NameDirector9", SecondName: "SurnameDirector9"}})
	movies = append(movies, Movie{ID: "10", Isbn: "438236", Title: "Movie 10 Title", Director: &Director{FirstName: "NameDirector10", SecondName: "SurnameDirector10"}})


	r.HandleFunc("/movies", getMovies).Methods("GET")
	r.HandleFunc("/movies/{id}", getMovies).Methods("GET")
	r.HandleFunc("/movies", createMovie).Methods("POST")
	r.HandleFunc("/movies/{id}", updateMovie).Methods("PUT")
	r.HandleFunc("/movies/{id}", deleteMovie).Methods("DELETE")

	headers := handlers.AllowedHeaders([]string{"Content-Type"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"})
	origins := handlers.AllowedOrigins([]string{"http://localhost:3000"})
	r.Use(handlers.CORS(headers, methods, origins))

	

	fmt.Printf("Starting server at port: 8080\n")
	log.Fatal(http.ListenAndServe(":8080", r))



}
