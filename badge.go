package main

import (
	"fmt"
	// "time"
	"gopkg.in/mgo.v2/bson"	
)

type Badge struct {
	ID      bson.ObjectId	`json:"_id,omitempty" bson:"_id,omitempty"`
	Index	int	`json:"index" bson:"index"`
	Name	string	`json:"name" bson:"name"`
	Code	string	`json:"code" bson:"code"`
	Owner	string	`json:"owner" bson:"owner"`
	Overview	string	`json:"overview" bson:"overview"`
	Focus 	[]string	`json:"focus" bson:"focus"`
	BadgeLevels	[]BadgeLevel	`json:"badgelevels" bson:"badgelevels"`
	Approved	bool	`json:"approved" bson:"approved"`
	InUsed	bool	`json:"inused" bson:"inused"`
	Published	bool	`json:"published" bson:"published"`
	Status	string	`json:"status" bson:"status"`
	TimeStamp string 	`json:"timestamp" bson:"timestamp"`
}

type BadgeLevel struct {
	Level	int	`json:"level" bson:"level"`
	Desc	string	`json:"desc" bson:"desc"`
}

var col_badge = "badge"

func listBadges() (badges []Badge) {
	session := connect()
	defer session.Close()

	collection := session.DB(DB).C(col_badge)
	err := collection.Find(nil).All(&badges)
	if err != nil {
		fmt.Println(err)
	}
	return badges
}

func listBadgesSort() (badges []Badge) {
	session := connect()
	defer session.Close()

	collection := session.DB(DB).C(col_badge)
	err := collection.Find(nil).Sort("status","name").All(&badges)
	if err != nil {
		fmt.Println(err)
	}
	return badges
}

func findBadgeByID(id string) (badge Badge) {
	session := connect()
	defer session.Close()

	collection := session.DB(DB).C(col_badge)
	idoi := bson.ObjectIdHex(id)
	fQuery := bson.M{"_id": idoi}
	err := collection.Find(fQuery).One(&badge)
	if err != nil {
		fmt.Println(err)
	}
	return badge
}

func listMarketBadges() (badges []Badge) {
	session := connect()
	defer session.Close()

	collection := session.DB(DB).C(col_badge)
	fQuery := bson.M{"published": true}
	err := collection.Find(fQuery).Sort("name").All(&badges)
	if err != nil {
		fmt.Println(err)
	}
	return badges
}

func insertBadge(badge Badge) (err error) {
	session := connect()
	defer session.Close()

	collection := session.DB(DB).C(col_badge)
	err = collection.Insert(badge)
	if err != nil {
		fmt.Println(err)
	}
	return err
}

func updateBadgeByID(id string, newBadge Badge) (err error) {
	session := connect()
	defer session.Close()

	collection := session.DB(DB).C(col_badge)
	idoi := bson.ObjectIdHex(id)
	fQuery := bson.M{"_id": idoi}
	result := Badge{}
    err = collection.Find(fQuery).One(&result)
    // if len(newBadge.BadgeLevels) == 0 {
    // 	newBadge.BadgeLevels = result.BadgeLevels
    // }
	if err == nil {
		// change := bson.M{"$set": bson.M{"name": newBadge.Name, "desc": newBadge.Desc, "approved": newBadge.Approved, "inused": newBadge.InUsed, "timestamp": time.Now()}}
		//change := bson.M{"$set": bson.M{"name": newBadge.Name, "overview": newBadge.Overview, "approved": newBadge.Approved, "inused": newBadge.InUsed}}
		change := bson.M{"$set": newBadge}
		err = collection.Update(fQuery, change)
		if err != nil {
			fmt.Println(err)
		}
	}else{
    	fmt.Println(err)
    }
	return err
}

func removeBadgeByID(id string) (err error) {
	session := connect()
	defer session.Close()

	collection := session.DB(DB).C(col_badge)
	idoi := bson.ObjectIdHex(id)
	fQuery := bson.M{"_id": idoi}
	err = collection.Remove(fQuery)
	if err != nil {
		fmt.Println(err)
	}
	return err
}

func removeAllBadges() (err error) {
	session := connect()
	defer session.Close()

	collection := session.DB(DB).C(col_badge)
	collection.RemoveAll(nil)
	if err != nil {
		fmt.Println(err)
	}
	return err
}


