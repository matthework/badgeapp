package main

import (
	"fmt"
	"net/http"
	"time"
	"encoding/json"
	"github.com/gorilla/mux"
)

func viewBadgeSets(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	fmt.Println("***********listBadgeSetsSort*************")
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
	fmt.Println("***********findBadgeSetByID*************")
	fmt.Println(id)
  	if id != "" {
  		fmt.Println("************insideBadgeSet************")
  		if err := json.NewEncoder(w).Encode(findBadgeSetByID(id)); err != nil {
			panic(err)
		}
		fmt.Println("************findBadgeSetByID************")
		fmt.Println(findBadgeSetByID(id))
	}
}

func addNewBadgeSet(w http.ResponseWriter, r *http.Request) {
	var badgeset BadgeSet
	fmt.Println("***********addNewBadgeSet*************")
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
	fmt.Println(badgeset.Name)
	fmt.Println(badgeset)

	if badgeset.Name != "" {
		fmt.Println("************insideNewBadgeSet************")
		if err := insertBadgeSet(badgeset); err != nil {
			panic(err)
		}
	}
}

func updateBadgeSet(w http.ResponseWriter, r *http.Request) {
	var badgeset BadgeSet
	fmt.Println("***********updateBadgeSet*************")
	if err := json.NewDecoder(r.Body).Decode(&badgeset); err != nil {
		panic(err)
	}
	vars := mux.Vars(r)
	id := vars["id"]
	fmt.Println("***********badgeset id*************")
	fmt.Println(id)

	badgeset.TimeStamp = time.Now()
	fmt.Println(badgeset.Name)
	fmt.Println(badgeset)

	if id != "" {
		fmt.Println("************insideNewBadgeSet************")
		if err := updateBadgeSetByID(id,badgeset); err != nil {
			panic(err)
		}
	}
}

func removeBadgeSet(w http.ResponseWriter, r *http.Request) {

	fmt.Println("***********removeBadgeSet*************")
	vars := mux.Vars(r)
	id := vars["id"]
	fmt.Println("***********badgeset id*************")
	fmt.Println(id)

	if id != "" {
		fmt.Println("************insideRemoveBadgeSet************")
		if err := removeBadgeSetByID(id); err != nil {
			panic(err)
		}
	}
}



