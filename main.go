package main

import (
	"fmt"
	"net/http"
	"os"
	"time"
)

func main() {

	fmt.Println(time.Now())

	addRoutes()

	// port := "8080"
	port := os.Getenv("PORT")
	fmt.Println("Listening on " + port + "...")

	err := http.ListenAndServe(":" + port, nil)
	if err != nil {
		fmt.Println(err)
	}
}





// fmt.Println("Insert new BadgeSet")
// bs1 := BadgeSet{Name: "Intern Developer", Tier: "1", Grade:"A", Compensation: "$40K",  Badge{Name: "Software Developer", level: "1", Desc:"Software Developer Level1 Desc...."}, TimeStamp: time.Now()}
// bs2 := BadgeSet{Name: "Junior Developer", Tier: "2", Grade:"A", Compensation: "$55K", Badge{Name: "Software Developer", level: "1", Desc:"Software Developer Level1 Desc...."}, TimeStamp: time.Now()}
// bs3 := BadgeSet{Name: "Senior Developer", Tier: "4", Grade:"A", Compensation: "$100K",  Badge{Name: "Software Developer", level: "1", Desc:"Software Developer Level1 Desc...."}, TimeStamp: time.Now()}
// insertBadgeSet(bs1)
// insertBadgeSet(bs2)
// insertBadgeSet(bs3)
// fmt.Println(listBadges())

// fmt.Println("Remove all Badges!!!")
// removeAllBadges()
// fmt.Println("Insert new Badge")

// bl1 := BadgeLevel{Level: "1", Desc:"Software Developer Level1 Desc...."}
// bl2 := BadgeLevel{Level: "2", Desc:"Software Developer Level2 Desc...."}
// bl3 := BadgeLevel{Level: "3", Desc:"Software Developer Level3 Desc...."}	
// b1 := Badge{Name: "Software Developer", Overview: "blah blah blah", BadgeLevels: []BadgeLevel{bl1, bl2, bl3}, Approved: true, InUsed: true, TimeStamp: time.Now()}
// b2 := Badge{Name: "Software Technoogy", Overview: "blah blah blah", BadgeLevel{level: "1", Desc:"Software Developer Level1 Desc...."}, TimeStamp: time.Now()}
// b3 := Badge{Name: "Software Support", Overview: "blah blah blah",  BadgeLevel{level: "1", Desc:"Software Developer Level1 Desc...."}, TimeStamp: time.Now()}
// insertBadge(b1)
// insertBadge(b1)
// insertBadge(b1)
// insertBadge(b1)
// insertBadge(b1)	
// insertBadgeSet(bs2)
// insertBadgeSet(bs3)
// fmt.Println(listBadges())


// fmt.Println("Remove all BadgeSets!!!")
// removeAllBadgeSets()

// bg1 := BadgeGroup{Badge: "Software Developer", Level:"1"}
// bg2 := BadgeGroup{Badge: "Software Technology [Java]", Level:"3"}
// bg3 := BadgeGroup{Badge: "Software Support", Level:"1"}
// bg4 := BadgeGroup{Badge: "Agile Practitioner", Level:"1"}	
// bs1 := BadgeSet{Name: "Junior Developer", BadgeGroups: []BadgeGroup{bg1, bg2, bg3, bg4}, Tier: "2", Grade: "A", Tags: []string{"DEV", "TECH", "AGI"}, TimeStamp: time.Now()}
// bs2 := BadgeSet{Name: "Intermediate Developer", BadgeGroups: []BadgeGroup{bg1, bg2, bg3, bg4}, Tier: "3", Grade: "D", Tags: []string{"DEV", "TECH", "AGI"}, TimeStamp: time.Now()}
// bs3 := BadgeSet{Name: "Experienced Developer", BadgeGroups: []BadgeGroup{bg1, bg2, bg3, bg4}, Tier: "4", Grade: "A", Tags: []string{"DEV", "TECH", "AGI"}, TimeStamp: time.Now()}
// insertBadgeSet(bs1)
// insertBadgeSet(bs2)
// insertBadgeSet(bs3)
// fmt.Println(listBadgeSets())

// fmt.Println("Remove all Staffs!!!")
// removeAllStaffs()


// fmt.Println("Remove all Tiers!!!")
// removeAllTiers()

// // ga := Grade{Grade: "A", Pay:"$40K"}
// // gb := Grade{Grade: "B", Pay:"$42K"}
// // gc := Grade{Grade: "C", Pay:"$44K"}
// // gd := Grade{Grade: "D", Pay:"$46K"}
// // ge := Grade{Grade: "E", Pay:"$48K"}
// // gf := Grade{Grade: "F", Pay:"$50K"}
// // t1 := Tier{Tier: "1", Grades: []Grade{ga, gb, gc, gd, ge,gf}, Judgement: "Judgement1", Expertise: "Expertise1", TimeStamp: time.Now()}
// // t2 := Tier{Tier: "2", Grades: []Grade{ga, gb, gc, gd, ge,gf}, Judgement: "Judgement2", Expertise: "Expertise2", TimeStamp: time.Now()}	
// // t3 := Tier{Tier: "3", Grades: []Grade{ga, gb, gc, gd, ge,gf}, Judgement: "Judgement3", Expertise: "Expertise3", TimeStamp: time.Now()}

// t1 := Tier{Tier: "1", Grades: []string{"$40K", "$42K", "$44K","$46K", "$48K", "$50K"}, Judgement: "Judgement1", Expertise: "Expertise1", TimeStamp: time.Now()}
// t2 := Tier{Tier: "2", Grades: []string{"$55K", "$57K", "$59K","$61K", "$63K", "$65K"}, Judgement: "Judgement2", Expertise: "Expertise2", TimeStamp: time.Now()}	
// t3 := Tier{Tier: "3", Grades: []string{"$75K", "$79K", "$83K","$87K", "$91K", "$95K"}, Judgement: "Judgement3", Expertise: "Expertise3", TimeStamp: time.Now()}
// insertTier(t1)
// insertTier(t2)
// insertTier(t3)
// fmt.Println(listTiersSort())

// fmt.Println(findPay("4","A"))


// loadData()



