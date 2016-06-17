package main

import (
	"fmt"
	"net/http"
	"time"
	"encoding/json"
	"github.com/gorilla/mux"
)

func viewStaffs(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if err := json.NewEncoder(w).Encode(listStaffs()); err != nil {
		panic(err)
	}
}

func viewFindStaffByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	vars := mux.Vars(r)
	id := vars["id"]
	fmt.Println("***********findStaffByID*************")
	fmt.Println(id)
	if id != "" {
		fmt.Println("************insideStaff************")
		fmt.Println(id)
		if err := json.NewEncoder(w).Encode(findStaffByID(id)); err != nil {
			panic(err)
		}
		fmt.Println("************badge staff************")
		fmt.Println(findStaffByID(id))
	}
}

func addNewStaff(w http.ResponseWriter, r *http.Request) {
	var staff Staff
	fmt.Println("***********addNewStaff*************")
	if err := json.NewDecoder(r.Body).Decode(&staff); err != nil {
		panic(err)
	}

	var bgs []BadgeGroup
	for i := range staff.BadgeGroups {
		if staff.BadgeGroups[i].Badge != "" && staff.BadgeGroups[i].Level != 0 {
			bgs = append(bgs, staff.BadgeGroups[i])
		}
	}
	staff.BadgeGroups = bgs

	staff.TimeStamp = time.Now()
	fmt.Println(staff.FName)
	fmt.Println(staff.LName)
	fmt.Println(staff)

	if staff.FName != "" {
		fmt.Println("************insideNewStaff************")
		if err := insertStaff(staff); err != nil {
			panic(err)
		}
	}
}

func updateStaff(w http.ResponseWriter, r *http.Request) {
	var staff Staff
	fmt.Println("***********updateStaff*************")
	if err := json.NewDecoder(r.Body).Decode(&staff); err != nil {
		panic(err)
	}

	vars := mux.Vars(r)
	id := vars["id"]
	fmt.Println("***********staff id*************")
	fmt.Println(id)

	staff.TimeStamp = time.Now()
	fmt.Println(staff.FName)
	fmt.Println(staff.LName)
	fmt.Println(staff.TimeStamp)
	fmt.Println(staff)

	if id != "" {
		fmt.Println("************insideNewStaff************")
		if err := updateStaffByID(id,staff); err != nil {
			panic(err)
		}
	}
}

func removeStaff(w http.ResponseWriter, r *http.Request) {

	fmt.Println("***********removeStaff*************")

	vars := mux.Vars(r)
	id := vars["id"]
	fmt.Println("***********staff id*************")
	fmt.Println(id)

	if id != "" {
		fmt.Println("************insideRemoveStaff************")
		if err := removeStaffByID(id); err != nil {
			panic(err)
		}
	}
}

