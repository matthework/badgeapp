package main

import (
	"fmt"
	"net/http"
	// "time"
	"encoding/json"
	"github.com/gorilla/mux"
)

func viewTiers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if err := json.NewEncoder(w).Encode(listTiersSort()); err != nil {
		fmt.Println(err)
	}
}

func viewFindTierByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	vars := mux.Vars(r)
	id := vars["id"]
	if id != "" {
		if err := json.NewEncoder(w).Encode(findTierByID(id)); err != nil {
			fmt.Println(err)
		}
	}
}

func addNewTier(w http.ResponseWriter, r *http.Request) {
	var tier Tier
	if err := json.NewDecoder(r.Body).Decode(&tier); err != nil {
		fmt.Println(err)
	}
	// tier.TimeStamp = time.Now()
	if tier.Tier != 0 {
		if err := insertTier(tier); err != nil {
			fmt.Println(err)
		}
	}
}

func updateTier(w http.ResponseWriter, r *http.Request) {
	var tier Tier
	if err := json.NewDecoder(r.Body).Decode(&tier); err != nil {
		fmt.Println(err)
	}
	vars := mux.Vars(r)
	id := vars["id"]
	// tier.TimeStamp = time.Now()

	if id != "" {
		if err := updateTierByID(id,tier); err != nil {
			fmt.Println(err)
		}
	}
}

func removeTier(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	if id != "" {
		if err := removeTierByID(id); err != nil {
			fmt.Println(err)
		}
	}
}


