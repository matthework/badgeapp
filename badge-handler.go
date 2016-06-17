package main

import (
	"fmt"
	"net/http"
	"time"
	"encoding/json"
	"github.com/gorilla/mux"
)

func viewBadges(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	fmt.Println("***********listBadges*************")
	if err := json.NewEncoder(w).Encode(listBadgesSort()); err != nil {
		panic(err)
	}
}

func viewFindBadgeByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	vars := mux.Vars(r)
	id := vars["id"]
	fmt.Println("***********findBadgeByID*************")
	fmt.Println(id)
  	if id != "" {
  		fmt.Println("************insideBadge************")
  		if err := json.NewEncoder(w).Encode(findBadgeByID(id)); err != nil {
			panic(err)
		}
		fmt.Println("************findBadgeByID************")
		fmt.Println(findBadgeByID(id))
	}
}

func addNewBadge(w http.ResponseWriter, r *http.Request) {
	var badge Badge
	fmt.Println("***********addNewBadge*************")
	if err := json.NewDecoder(r.Body).Decode(&badge); err != nil {
		panic(err)
	}

	var bls []BadgeLevel
	for i := range badge.BadgeLevels {
		if badge.BadgeLevels[i].Desc != "" {
			bls = append(bls, badge.BadgeLevels[i])
		}
	}
	badge.BadgeLevels = bls

	badge.TimeStamp = time.Now()
	fmt.Println(badge.Name)
	fmt.Println(badge.Overview)
	fmt.Println(badge.TimeStamp)
	fmt.Println(badge)

	if badge.Name != "" {
		fmt.Println("************insideNewBadge************")
		if err := insertBadge(badge); err != nil {
			panic(err)
		}
	}
}

func updateBadge(w http.ResponseWriter, r *http.Request) {
	var badge Badge
	fmt.Println("***********updateBadge*************")
	if err := json.NewDecoder(r.Body).Decode(&badge); err != nil {
		panic(err)
	}
	vars := mux.Vars(r)
	id := vars["id"]
	fmt.Println("***********badge id*************")
	fmt.Println(id)

	badge.TimeStamp = time.Now()
	fmt.Println(badge.Name)
	fmt.Println(badge.Overview)
	fmt.Println(badge.TimeStamp)
	fmt.Println(badge)

	if id != "" {
		fmt.Println("************insideNewBadge************")
		if err := updateBadgeByID(id,badge); err != nil {
			panic(err)
		}
	}
}

func removeBadge(w http.ResponseWriter, r *http.Request) {

	fmt.Println("***********removeBadge*************")
	vars := mux.Vars(r)
	id := vars["id"]
	fmt.Println("***********badge id*************")
	fmt.Println(id)

	if id != "" {
		fmt.Println("************insideRemoveBadge************")
		if err := removeBadgeByID(id); err != nil {
			panic(err)
		}
	}
}

