package main

import (
	"net/http"
	"time"
	"encoding/json"
	"github.com/gorilla/mux"
)

func viewBadgeSets(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if err := json.NewEncoder(w).Encode(listBadgeSetsSort()); err != nil {
		panic(err)
	}
}

func viewFindBadgeSetByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	vars := mux.Vars(r)
	id := vars["id"]
  	if id != "" {
  		if err := json.NewEncoder(w).Encode(findBadgeSetByID(id)); err != nil {
			panic(err)
		}
	}
}

func addNewBadgeSet(w http.ResponseWriter, r *http.Request) {
	var badgeset BadgeSet
	if err := json.NewDecoder(r.Body).Decode(&badgeset); err != nil {
		panic(err)
	}
	var bgs []BadgeGroup
	for i := range badgeset.BadgeGroups {
		if badgeset.BadgeGroups[i].Badge != "" && badgeset.BadgeGroups[i].Level != 0 {
			bgs = append(bgs, badgeset.BadgeGroups[i])
		}
	}
	badgeset.BadgeGroups = bgs
	badgeset.TimeStamp = time.Now()
	if badgeset.Name != "" {
		if err := insertBadgeSet(badgeset); err != nil {
			panic(err)
		}
	}
}

func updateBadgeSet(w http.ResponseWriter, r *http.Request) {
	var badgeset BadgeSet
	if err := json.NewDecoder(r.Body).Decode(&badgeset); err != nil {
		panic(err)
	}
	vars := mux.Vars(r)
	id := vars["id"]
	var bgs []BadgeGroup
	for i := range badgeset.BadgeGroups {
		if badgeset.BadgeGroups[i].Badge != "" && badgeset.BadgeGroups[i].Level != 0 {
			bgs = append(bgs, badgeset.BadgeGroups[i])
		}
	}
	badgeset.BadgeGroups = bgs
	badgeset.TimeStamp = time.Now()
	if id != "" {
		if err := updateBadgeSetByID(id,badgeset); err != nil {
			panic(err)
		}
	}
}

func removeBadgeSet(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	if id != "" {
		if err := removeBadgeSetByID(id); err != nil {
			panic(err)
		}
	}
}



