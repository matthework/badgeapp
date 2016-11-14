package main

import (
	"fmt"
	"net/http"
	// "time"
	"encoding/json"
	"github.com/gorilla/mux"
)

func viewBadges(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if err := json.NewEncoder(w).Encode(listBadgesSort()); err != nil {
		fmt.Println(err)
	}
}

func viewFindBadgeByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	vars := mux.Vars(r)
	id := vars["id"]
  	if id != "" {
  		if err := json.NewEncoder(w).Encode(findBadgeByID(id)); err != nil {
			fmt.Println(err)
		}
	}
}

func viewMarketBadges(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if err := json.NewEncoder(w).Encode(listMarketBadges()); err != nil {
		fmt.Println(err)
	}
}

func addNewBadge(w http.ResponseWriter, r *http.Request) {
	var badge Badge
	if err := json.NewDecoder(r.Body).Decode(&badge); err != nil {
		fmt.Println(err)
	}
	// var bls []BadgeLevel
	// for i := range badge.BadgeLevels {
	// 	if badge.BadgeLevels[i].Desc != "" {
	// 		bls = append(bls, badge.BadgeLevels[i])
	// 	}
	// }
	// badge.BadgeLevels = bls
	// badge.TimeStamp = time.Now()
	if badge.Name != "" {
		if err := insertBadge(badge); err != nil {
			fmt.Println(err)
		}
	}
}

func updateBadge(w http.ResponseWriter, r *http.Request) {
	var badge Badge
	if err := json.NewDecoder(r.Body).Decode(&badge); err != nil {
		fmt.Println(err)
	}
	vars := mux.Vars(r)
	id := vars["id"]
	// badge.TimeStamp = time.Now()
	if id != "" {
		if err := updateBadgeByID(id,badge); err != nil {
			fmt.Println(err)
		}
	}
}

func removeBadge(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	if id != "" {
		if err := removeBadgeByID(id); err != nil {
			fmt.Println(err)
		}
	}
}



