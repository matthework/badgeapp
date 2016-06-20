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

func addNewStaff(w http.ResponseWriter, r *http.Request) {
	var staff Staff
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

