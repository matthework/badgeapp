package main

import (
	"time"
	"gopkg.in/mgo.v2/bson"	
)

type BadgeCat struct {
	ID      bson.ObjectId	`json:"_id,omitempty" bson:"_id,omitempty"`
	Name	string	`json:"name,omitempty" bson:"name"`
	Root	string	`json:"root" bson:"root"`
	BGroups	[]BGroup	`json:"bgroups" bson:"bgroups"`
	Others []string 	`json:"others" bson:"others"`	
	TimeStamp time.Time 	`json:"timestamp" bson:"timestamp"`
}

type BGroup struct {
	Badge 	string	`json:"badge" bson:"badge"`	
	Levels	[]int	`json:"levels" bson:"levels"`
}

var col_badgecat = "badgecat"

func listBadgeCats() (badgecats []BadgeCat) {
	session := connect()
	defer session.Close()

	collection := session.DB(DB).C(col_badgecat)
	err := collection.Find(nil).All(&badgecats)
	if err != nil {
		panic(err)
	}
	return badgecats
}

func listBadgeCatsSort() (badgecats []BadgeCat) {
	session := connect()
	defer session.Close()

	collection := session.DB(DB).C(col_badgecat)
	err := collection.Find(nil).Sort("root","name").All(&badgecats)
	if err != nil {
		panic(err)
	}
	return badgecats
}

func findBadgeCatByID(id string) (badgecat BadgeCat) {
	session := connect()
	defer session.Close()

	collection := session.DB(DB).C(col_badgecat)
	idoi := bson.ObjectIdHex(id)
	fQuery := bson.M{"_id": idoi}
	err := collection.Find(fQuery).One(&badgecat)
	if err != nil {
		panic(err)
	}
	return badgecat
}

func insertBadgeCat(badgecat BadgeCat) (err error) {
	session := connect()
	defer session.Close()

	collection := session.DB(DB).C(col_badgecat)
	err = collection.Insert(badgecat)
	if err != nil {
		panic(err)
	}
	return err
}

func updateBadgeCatByID(id string, newBadgeCat BadgeCat) (err error) {
	session := connect()
	defer session.Close()

	collection := session.DB(DB).C(col_badgecat)
	idoi := bson.ObjectIdHex(id)
	fQuery := bson.M{"_id": idoi}
	result := BadgeCat{}
    err = collection.Find(fQuery).One(&result)
    // if len(newBadgeCat.BGroups) == 0 {
    // 	newBadgeCat.BGroups = result.BGroups
    // }
    if err == nil {
		change := bson.M{"$set": newBadgeCat}
		err = collection.Update(fQuery, change)
		if err != nil {
			panic(err)
		}
	}else{
    	panic(err)
    }
	return err
}

func removeBadgeCatByID(id string) (err error) {
	session := connect()
	defer session.Close()

	collection := session.DB(DB).C(col_badgecat)
	idoi := bson.ObjectIdHex(id)
	fQuery := bson.M{"_id": idoi}
	err = collection.Remove(fQuery)
	if err != nil {
		panic(err)
	}
	return err
}

func removeAllBadgeCats() (err error) {
	session := connect()
	defer session.Close()

	collection := session.DB(DB).C(col_badgecat)
	collection.RemoveAll(nil)
	if err != nil {
		panic(err)
	}
	return err
}


