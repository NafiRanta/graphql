package main

import (
	"fmt"
	b "graphql/backend"
	"net/http"
)

func main() {
	printcolor("Starting server on port 8080...", "green")
	go startServer()

	closeServer()
}

// server and api
func startServer() {
	mux := http.NewServeMux()

	//all handlers
	mux.HandleFunc("/login", b.GraphqlHandler)
	mux.Handle("/", http.FileServer(http.Dir("./frontend")))
	// serve frontend
	err := http.ListenAndServe(":8080", mux)
	if err != nil {
		printcolor("Server failed to start"+err.Error(), "red") // print in red
	}
}

// close server when user types "x"
func closeServer() {
	var input string
	printcolor("Type 'x' to close the server", "yellow")
	fmt.Scanln(&input)
	if input == "x" {
		printcolor("Server closed", "red")
	} else {
		closeServer()
	}
}

func printcolor(text string, color string) {
	switch color {
	case "green":
		fmt.Println("\033[32m" + text + "\033[0m")
	case "red":
		fmt.Println("\033[31m" + text + "\033[0m")
	case "yellow":
		fmt.Println("\033[33m" + text + "\033[0m")
	}
}
