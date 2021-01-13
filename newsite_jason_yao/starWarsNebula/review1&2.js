var express = require(“express“), app = express(), bodyParser = require(“body-parser“), mongoose = require(“mongoose“)

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost/yelp_camp");

var campgroundSchema = new mongoose.Schema({
	name:String,
	image:String
});

var Campground = mongoose.model("Campground",campgroundSchema);

app.get("/",function(res,req){
	res.render("landing");
});

app.get("/campgrounds",function(res,req){
	Campground.find({},function(err, campgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds",{campgrounds:campgrounds});
		}
	});
});

app.post("/campgrounds",function(res,req){
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name:name,image:image};
	Campground.create(name,function(err, campgrounds){
		if(err){
			console.log(err);
		}else{
			res.redirect("/campgrounds");
		}
	});
});

app.get("/campgrounds/new",function(res,req){
	res.render("new");
});