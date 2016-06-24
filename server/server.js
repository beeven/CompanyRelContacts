var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    database = require("./database");

var routes = require("./routes");



app.use(bodyParser.json())
app.use(express.static(__dirname+"/../web/contacts2/dist/"));

database.connect().then(function(){
    app.use("/api/contacts",routes);
    app.listen(8020);
    console.log("app listeninig on port 8020");
},function(err){
    console.error("Cannot connect to databse:",err);
});
