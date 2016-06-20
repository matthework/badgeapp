# badge

Badge System!

******************* todo list *******************
login system
improve warning dialog for delete
career path



******************* run locally *******************
// project root folder  
$GOPATH/src/github.com/propellerheadnz/badge/

// run mongoDB server  
mongod

// run mongoDB client  
mongo

// install dependency from package.json  
npm install

// compile *.ts to *.js  
npm run tsc

// compile *.ts to *.js and stay in watch mode for changes made  
npm run tsc:w

// get required libraries  
go get 

// compile changes   
go install

// run server  
go run *.go

// export local mongodb into json file
mongoexport --db badgeDB --collection badge --out badge.json

******************* deploy on heroku *******************

// install godep
$ go get github.com/tools/godep

// go to project root folder
$GOPATH/src/github.com/matthework/badge/

// create Godeps.json for Dependencies (or godep save for current folder only)
$ godep save
$ godep save ./...

// create Procfile of commands to run on Heroku
$ echo 'web: badge' > Procfile

// run locally
$ heroku local
$ heroku local web

// mlab mongodb
mongoimport -h ds017664-a0.mlab.com:17664 -d heroku_58200141 -c badgeset -u badge -p badgeps --file badgeset.json

mongoexport -h ds017664-a0.mlab.com:17664 -d heroku_58200141 -c badgeset -u badge -p badgeps -o badgeset.json


******************* mongodb commands *******************

// mongoDB commands  
show dbs  
use badgeDB  
show collections  
db.badge.find().pretty()  
db.badge.insert({})  
db.badge.remove({"_id":ObjectId("571078463d30b111bdc0986c")})  


****** WARNING ******  
// drop a collection  
db.badge.drop()  

// drop a database  
db.dropDatabase()  


******************* others *******************

matt.wang@propellerhead.co.nz


