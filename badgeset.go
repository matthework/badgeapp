package main

import (
	"fmt"
	"time"
	"gopkg.in/mgo.v2/bson"	
)

type BadgeSet struct {
	ID      bson.ObjectId	`json:"_id,omitempty" bson:"_id,omitempty"`
	Index	int	`json:"index" bson:"index"`
	Name	string	`json:"name,omitempty" bson:"name"`
	BadgeGroups	[]BadgeGroup	`json:"badgegroups" bson:"badgegroups"`
	Tier	int	`json:"tier" bson:"tier"`
	Grade	string	`json:"grade" bson:"grade"`
	Pay	int	`json:"pay" bson:"pay"`
	Tags 	[]string	`json:"tags" bson:"tags"`
	NumBadges 	int	`json:"numbadges" bson:"numbadges"`	
	CoreBadges	[]BadgeGroup	`json:"corebadges" bson:"corebadges"`
	Approved	bool	`json:"approved" bson:"approved"`
	InUsed	bool	`json:"inused" bson:"inused"`
	Status	string	`json:"status" bson:"status"`
	Others []string 	`json:"others" bson:"others"`	
	TimeStamp time.Time 	`json:"timestamp" bson:"timestamp"`
}

type BadgeGroup struct {
	BID 	string	`json:"bid" bson:"bid"`	
	Badge 	string	`json:"badge" bson:"badge"`	
	Level	int	`json:"level" bson:"level"`
	Focus 	[]string	`json:"focus" bson:"focus"`
}

var col_badgeset = "badgeset"

func listBadgeSets() (badgesets []BadgeSet) {
	session := connect()
	defer session.Close()

	collection := session.DB(DB).C(col_badgeset)
	err := collection.Find(nil).All(&badgesets)
	if err != nil {
		fmt.Println(err)
	}
	return badgesets
}

func listBadgeSetsSort() (badgesets []BadgeSet) {
	session := connect()
	defer session.Close()

	collection := session.DB(DB).C(col_badgeset)
	err := collection.Find(nil).Sort("status","tier","grade","name").All(&badgesets)
	if err != nil {
		fmt.Println(err)
	}
	return badgesets
}

func findBadgeSetByID(id string) (badgeset BadgeSet) {
	session := connect()
	defer session.Close()

	collection := session.DB(DB).C(col_badgeset)
	idoi := bson.ObjectIdHex(id)
	fQuery := bson.M{"_id": idoi}
	err := collection.Find(fQuery).One(&badgeset)
	if err != nil {
		fmt.Println(err)
	}
	return badgeset
}

func insertBadgeSet(badgeset BadgeSet) (err error) {
	session := connect()
	defer session.Close()

	collection := session.DB(DB).C(col_badgeset)
	err = collection.Insert(badgeset)
	if err != nil {
		fmt.Println(err)
	}
	return err
}

func updateBadgeSetByID(id string, newBadgeSet BadgeSet) (err error) {
	session := connect()
	defer session.Close()

	collection := session.DB(DB).C(col_badgeset)
	idoi := bson.ObjectIdHex(id)
	fQuery := bson.M{"_id": idoi}
	result := BadgeSet{}
    err = collection.Find(fQuery).One(&result)
    // if len(newBadgeSet.BadgeGroups) == 0 {
    // 	newBadgeSet.BadgeGroups = result.BadgeGroups
    // }
    if err == nil {
		change := bson.M{"$set": newBadgeSet}
		err = collection.Update(fQuery, change)
		if err != nil {
			fmt.Println(err)
		}
	}else{
    	fmt.Println(err)
    }
	return err
}

func removeBadgeSetByID(id string) (err error) {
	session := connect()
	defer session.Close()

	collection := session.DB(DB).C(col_badgeset)
	idoi := bson.ObjectIdHex(id)
	fQuery := bson.M{"_id": idoi}
	err = collection.Remove(fQuery)
	if err != nil {
		fmt.Println(err)
	}
	return err
}

func removeAllBadgeSets() (err error) {
	session := connect()
	defer session.Close()

	collection := session.DB(DB).C(col_badgeset)
	collection.RemoveAll(nil)
	if err != nil {
		fmt.Println(err)
	}
	return err
}


