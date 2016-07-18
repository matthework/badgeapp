package main

import (
	"net/http"
	"time"
	"encoding/json"
	"github.com/gorilla/mux"
)

func viewBadgeCats(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if err := json.NewEncoder(w).Encode(listBadgeCatsSort()); err != nil {
		panic(err)
	}
}

func viewFindBadgeCatByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	vars := mux.Vars(r)
	id := vars["id"]
  	if id != "" {
  		if err := json.NewEncoder(w).Encode(findBadgeCatByID(id)); err != nil {
			panic(err)
		}
	}
}

func addNewBadgeCat(w http.ResponseWriter, r *http.Request) {
	var badgecat BadgeCat
	if err := json.NewDecoder(r.Body).Decode(&badgecat); err != nil {
		panic(err)
	}
	var bgs []BGroup
	for i := range badgecat.BGroups {
		if badgecat.BGroups[i].Badge != "" {
			bgs = append(bgs, badgecat.BGroups[i])
		}
	}
	badgecat.BGroups = bgs
	badgecat.TimeStamp = time.Now()
	if badgecat.Name != "" {
		if err := insertBadgeCat(badgecat); err != nil {
			panic(err)
		}
	}
}

func updateBadgeCat(w http.ResponseWriter, r *http.Request) {
	var badgecat BadgeCat
	if err := json.NewDecoder(r.Body).Decode(&badgecat); err != nil {
		panic(err)
	}
	vars := mux.Vars(r)
	id := vars["id"]
	badgecat.TimeStamp = time.Now()
	if id != "" {
		if err := updateBadgeCatByID(id,badgecat); err != nil {
			panic(err)
		}
	}
}

func removeBadgeCat(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	if id != "" {
		if err := removeBadgeCatByID(id); err != nil {
			panic(err)
		}
	}
}



