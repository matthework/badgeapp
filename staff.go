package main

import (
	"time"
	"gopkg.in/mgo.v2/bson"	
)

type Staff struct {
	ID        bson.ObjectId	`json:"_id,omitempty" bson:"_id,omitempty"`
	Index	int	`json:"index" bson:"index"`
	FName	string	`json:"fname,omitempty" bson:"fname"`
	LName	string	`json:"lname,omitempty" bson:"lname"`
	Position string	`json:"position" bson:"position"`
	Salary int	`json:"salary" bson:"salary"`
	Email string	`json:"email" bson:"email"`	
	Phone	string	`json:"phone" bson:"phone"`	
	UserBGroups	[]UserBGroup	`json:"userbgroups" bson:"userbgroups"`
	Active	bool	`json:"active" bson:"active"`
	Brief	string	`json:"brief" bson:"brief"`
	Status	string	`json:"status" bson:"status"`	
	Others []string 	`json:"others" bson:"others"`	
	TimeStamp time.Time 	`json:"timestamp" bson:"timestamp"`
}

type UserBGroup struct {
	BID 	string	`json:"bid" bson:"bid"`	
	Badge 	string	`json:"badge" bson:"badge"`	
	Level	int	`json:"level" bson:"level"`
	Focus 	[]string	`json:"focus" bson:"focus"`
	Status	bool	`json:"status" bson:"status"`
}

var col_staff = "staff"

func listStaffs() (staffs []Staff) {
	session := connect()
	defer session.Close()

	collection := session.DB(DB).C(col_staff)
	err := collection.Find(nil).All(&staffs)
	if err != nil {
		panic(err)
	}
	return staffs
}

func listStaffsSort() (staffs []Staff) {
	session := connect()
	defer session.Close()

	collection := session.DB(DB).C(col_staff)
	err := collection.Find(nil).Sort("status","fname","lname").All(&staffs)
	if err != nil {
		panic(err)
	}
	return staffs
}

func findStaffByID(id string) (staff Staff) {
	session := connect()
	defer session.Close()

	collection := session.DB(DB).C(col_staff)
	idoi := bson.ObjectIdHex(id)
	fQuery := bson.M{"_id": idoi}
	err := collection.Find(fQuery).One(&staff)
	if err != nil {
		panic(err)
	}
	return staff
}

func findStaffByEmail(email string) (staff Staff) {
	session := connect()
	defer session.Close()

	collection := session.DB(DB).C(col_staff)
	fQuery := bson.M{"email": email}
	err := collection.Find(fQuery).One(&staff)
	if err != nil {
		panic(err)
	}
	return staff
}

func insertStaff(staff Staff) (err error) {
	session := connect()
	defer session.Close()

	collection := session.DB(DB).C(col_staff)
	err = collection.Insert(staff)
	if err != nil {
		panic(err)
	}
	return err
}

func updateStaffByID(id string, newStaff Staff) (err error) {
	session := connect()
	defer session.Close()

	collection := session.DB(DB).C(col_staff)
	idoi := bson.ObjectIdHex(id)
	fQuery := bson.M{"_id": idoi}
	result := Staff{}
    err = collection.Find(fQuery).One(&result)
	if err == nil {
		// nStaff := bson.M{"fname": newStaff.FName, "lname": newStaff.LName,"position": newStaff.Position,"phone": newStaff.Phone,"timestamp": time.Now()}
		// nStaff := bson.M(newStaff)
		change := bson.M{"$set": newStaff}
		err = collection.Update(fQuery, change)
		if err != nil {
			panic(err)
		}
	}else{
    	panic(err)
    }
	return err
}

func removeStaffByID(id string) (err error) {
	session := connect()
	defer session.Close()

	collection := session.DB(DB).C(col_staff)
	idoi := bson.ObjectIdHex(id)
	fQuery := bson.M{"_id": idoi}
	err = collection.Remove(fQuery)
	if err != nil {
		panic(err)
	}
	return err
}

func removeAllStaffs() (err error) {
	session := connect()
	defer session.Close()

	collection := session.DB(DB).C(col_staff)
	collection.RemoveAll(nil)
	if err != nil {
		panic(err)
	}
	return err
}




