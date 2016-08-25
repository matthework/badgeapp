package main

import (
	"net/http"
	"time"
	"encoding/json"
	"github.com/gorilla/mux"
)

func viewStaffs(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if err := json.NewEncoder(w).Encode(listStaffsSort()); err != nil {
		panic(err)
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
			panic(err)
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
			panic(err)
		}
	}
}

func addNewStaff(w http.ResponseWriter, r *http.Request) {
	var staff Staff
	if err := json.NewDecoder(r.Body).Decode(&staff); err != nil {
		panic(err)
	}
	var bgs []UserBGroup
	for i := range staff.UserBGroups {
		if staff.UserBGroups[i].Badge != "" && staff.UserBGroups[i].Level != 0 {
			bgs = append(bgs, staff.UserBGroups[i])
		}
	}
	staff.UserBGroups = bgs
	staff.TimeStamp = time.Now()
	if staff.FName != "" {
		if err := insertStaff(staff); err != nil {
			panic(err)
		}
	}
}

func updateStaff(w http.ResponseWriter, r *http.Request) {
	var staff Staff
	if err := json.NewDecoder(r.Body).Decode(&staff); err != nil {
		panic(err)
	}
	vars := mux.Vars(r)
	id := vars["id"]
	staff.TimeStamp = time.Now()
	if id != "" {
		if err := updateStaffByID(id,staff); err != nil {
			panic(err)
		}
	}
}

func removeStaff(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	if id != "" {
		if err := removeStaffByID(id); err != nil {
			panic(err)
		}
	}
}

