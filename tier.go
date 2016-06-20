package main

import (
	"time"
	"gopkg.in/mgo.v2/bson"	
)

type Tier struct {
	ID        bson.ObjectId	`json:"_id,omitempty" bson:"_id,omitempty"`
	Index	int	`json:"index" bson:"index"`
	Tier	int	`json:"tier" bson:"tier"`
	Grades	[]int	`json:"grades" bson:"grades"`
	Judgement string	`json:"judgement" bson:"judgement"`	
	Expertise	string	`json:"expertise" bson:"expertise"`	
	TimeStamp time.Time 	`json:"timestamp" bson:"timestamp"`
}

var col_tier = "tier"

func listTiersSort() (tiers []Tier) {
	session := connect()
	defer session.Close()

	collection := session.DB(DB).C(col_tier)
	err := collection.Find(nil).Sort("tier").All(&tiers)
	if err != nil {
		panic(err)
	}
	return tiers
}

func findTierByID(id string) (tier Tier) {
	session := connect()
	defer session.Close()

	collection := session.DB(DB).C(col_tier)
	idoi := bson.ObjectIdHex(id)
	fQuery := bson.M{"_id": idoi}
	err := collection.Find(fQuery).One(&tier)
	if err != nil {
		panic(err)
	}
	return tier
}

func insertTier(tier Tier) (err error) {
	session := connect()
	defer session.Close()

	collection := session.DB(DB).C(col_tier)
	err = collection.Insert(tier)
	if err != nil {
		panic(err)
	}
	return err
}

func updateTierByID(id string, newTier Tier) (err error) {
	session := connect()
	defer session.Close()

	collection := session.DB(DB).C(col_tier)
	idoi := bson.ObjectIdHex(id)
	fQuery := bson.M{"_id": idoi}
	result := Tier{}
    err = collection.Find(fQuery).One(&result)
	if err == nil {
		change := bson.M{"$set": newTier}
		err = collection.Update(fQuery, change)
		if err != nil {
			panic(err)
		}
	}else{
    	panic(err)
    }
	return err
}

func removeTierByID(id string) (err error) {
	session := connect()
	defer session.Close()

	collection := session.DB(DB).C(col_tier)
	idoi := bson.ObjectIdHex(id)
	fQuery := bson.M{"_id": idoi}
	err = collection.Remove(fQuery)
	if err != nil {
		panic(err)
	}
	return err
}

func removeAllTiers() (err error) {
	session := connect()
	defer session.Close()

	collection := session.DB(DB).C(col_tier)
	collection.RemoveAll(nil)
	if err != nil {
		panic(err)
	}
	return err
}



