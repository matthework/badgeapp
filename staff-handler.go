package main

import (
	"fmt"
	"net/http"
	// "time"
	"encoding/json"
	"github.com/gorilla/mux"
)

func viewStaffs(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if err := json.NewEncoder(w).Encode(listStaffsSort()); err != nil {
		fmt.Println(err)
	}
}

func viewFindStaffByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	vars := mux.Vars(r)
	id := vars["id"]
	if id != "" {
		if err := json.NewEncoder(w).Encode(findStaffByID(id)); err != nil {
			fmt.Println(err)
		}
	}
}

func viewFindStaffByEmail(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	vars := mux.Vars(r)
	email := vars["email"]
	if email != "" {
		if err := json.NewEncoder(w).Encode(findStaffByEmail(email)); err != nil {
			fmt.Println(err)
		}
	}
}

func addNewStaff(w http.ResponseWriter, r *http.Request) {
	var staff Staff
	if err := json.NewDecoder(r.Body).Decode(&staff); err != nil {
		fmt.Println(err)
	}
	var bgs []UserBGroup
	for i := range staff.UserBGroups {
		// staff.UserBGroups[i].UBTimeStamp = time.Now()
		if staff.UserBGroups[i].BID != "" && staff.UserBGroups[i].Level != 0 {
			bgs = append(bgs, staff.UserBGroups[i])
		}
	}
	staff.UserBGroups = bgs
	// staff.TimeStamp = time.Now()
	if staff.FName != "" {
		if err := insertStaff(staff); err != nil {
			fmt.Println(err)
		}
	}
}

func updateStaff(w http.ResponseWriter, r *http.Request) {
	var staff Staff
	if err := json.NewDecoder(r.Body).Decode(&staff); err != nil {
		fmt.Println(err)
	}
	vars := mux.Vars(r)
	id := vars["id"]
	// staff.TimeStamp = time.Now()
	if id != "" {
		if err := updateStaffByID(id,staff); err != nil {
			fmt.Println(err)
		}
	}
}

func removeStaff(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	if id != "" {
		if err := removeStaffByID(id); err != nil {
			fmt.Println(err)
		}
	}
}

