package main

import (
	"fmt"
	"net/http"
	"os"
	"time"
)

func main() {

	fmt.Println(time.Now())

	addRoutes()

	// port := "8080"
	port := os.Getenv("PORT")
	fmt.Println("Listening on " + port + "...")

	err := http.ListenAndServe(":" + port, nil)
	if err != nil {
		fmt.Println(err)
	}
}




