package main

import (
	"fmt"
	"os"
	"gopkg.in/mgo.v2"
)

// var connectURL = "localhost"
// var DB = "badgeDB"

// paid service
var connectURL = "mongodb://badge:badgeps@ds017664-a0.mlab.com:17664,ds017664-a1.mlab.com:17664/heroku_58200141?replicaSet=rs-ds017664" 
var DB = "heroku_58200141"

// // free mongodb
// var connectURL = "mongodb://badge:badgeps@ds025772.mlab.com:25772/heroku_wqd51gtc" 
// var DB = "heroku_wqd51gtc"

func connect() (session *mgo.Session) {
	session, err := mgo.Dial(connectURL)
	if err != nil {
		fmt.Printf("Can't connect to mongoDB, go error %v\n", err)
		os.Exit(1)
	}
	session.SetSafe(&mgo.Safe{})
	return session
}



