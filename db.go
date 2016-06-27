package main

import (
	"fmt"
	"os"
	"gopkg.in/mgo.v2"
)

// var connectURL = "localhost"
// var DB = "badgeTest"

// paid mlab mongodb - heroku
var connectURL = os.Getenv("MONGODB_URI") 
var DB = "heroku_58200141"

func connect() (session *mgo.Session) {
	session, err := mgo.Dial(connectURL)
	if err != nil {
		fmt.Printf("Can't connect to mongoDB, go error %v\n", err)
		os.Exit(1)
	}
	session.SetSafe(&mgo.Safe{})
	return session
}



