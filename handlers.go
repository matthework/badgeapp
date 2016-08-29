package main

import (
	// "fmt"
	"io"
	"io/ioutil"
	"net/http"
	"os"
	"encoding/json"
	"github.com/gorilla/mux"
)

var domain = os.Getenv("Domain")
var cid = os.Getenv("Client_ID")
var auth = map[string]string{"domain": domain, "cid": cid}

func loadIndex(w http.ResponseWriter) {
	pwd, _ := os.Getwd()
	filepath := pwd + "/index.html"
	index, _ := ioutil.ReadFile(filepath)

	io.WriteString(w, string(index))
}

func serveFile(w http.ResponseWriter, filePath string) {
	pwd, _ := os.Getwd()
	filePath = pwd + "/" + filePath
	file, err := ioutil.ReadFile(filePath)
	if err != nil {
		loadIndex(w)
	} else {
		io.WriteString(w, string(file))
	}
}

func handlerURL(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path == "/" {
		loadIndex(w)
	} else {
		serveFile(w, r.URL.Path)
	}
}

func viewLogin(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if err := json.NewEncoder(w).Encode(auth); err != nil {
		panic(err)
	}
}

func addRoutes() {

	http.HandleFunc("/", handlerURL)

	router := mux.NewRouter()

	router.HandleFunc("/api/login", viewLogin).Methods("GET")
	router.HandleFunc("/api/badges", viewBadges).Methods("GET")
	router.HandleFunc("/api/badge/detail/{id}", viewFindBadgeByID).Methods("GET")
	router.HandleFunc("/api/badge/new", addNewBadge).Methods("POST")
	router.HandleFunc("/api/badge/update/{id}", updateBadge).Methods("POST")
	router.HandleFunc("/api/badge/remove/{id}", removeBadge).Methods("POST")

	router.HandleFunc("/api/staffs", viewStaffs).Methods("GET")
	router.HandleFunc("/api/staff/edit/{id}", viewFindStaffByID).Methods("GET")
	router.HandleFunc("/api/staff/detail/email/{email}", viewFindStaffByEmail).Methods("GET")
	router.HandleFunc("/api/staff/new", addNewStaff).Methods("POST")
	router.HandleFunc("/api/staff/update/{id}", updateStaff).Methods("POST")
	router.HandleFunc("/api/staff/remove/{id}", removeStaff).Methods("POST")

	router.HandleFunc("/api/tiers", viewTiers).Methods("GET")
	router.HandleFunc("/api/tier/edit/{id}", viewFindTierByID).Methods("GET")
	router.HandleFunc("/api/tier/new", addNewTier).Methods("POST")
	router.HandleFunc("/api/tier/update/{id}", updateTier).Methods("POST")
	router.HandleFunc("/api/tier/remove/{id}", removeTier).Methods("POST")
	// router.HandleFunc("/api/tier/pay/{t}/{g}", viewFindPay).Methods("GET")

	router.HandleFunc("/api/bs", viewBadgeSets).Methods("GET")
	router.HandleFunc("/api/bs/edit/{id}", viewFindBadgeSetByID).Methods("GET")
	router.HandleFunc("/api/bs/new", addNewBadgeSet).Methods("POST")
	router.HandleFunc("/api/bs/update/{id}", updateBadgeSet).Methods("POST")
	router.HandleFunc("/api/bs/remove/{id}", removeBadgeSet).Methods("POST")

	router.HandleFunc("/api/bcats", viewBadgeCats).Methods("GET")
	router.HandleFunc("/api/bcat/edit/{id}", viewFindBadgeCatByID).Methods("GET")
	router.HandleFunc("/api/bcat/new", addNewBadgeCat).Methods("POST")
	router.HandleFunc("/api/bcat/update/{id}", updateBadgeCat).Methods("POST")
	router.HandleFunc("/api/bcat/remove/{id}", removeBadgeCat).Methods("POST")

	http.Handle("/api/", router)

}


