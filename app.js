const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));

var today = new Date();
var opts = {
    weekday: "long",
    day: "numeric",
    month: "long"
}
var day = today.toLocaleDateString("en-US", opts);
var items = ["JavaScript", "Dynamic Programming", "Aptitude"];
var work = [];

app.get("/", (req, res) => {
    res.render("home", { title: day, data: items });
});

app.post("/", (req, res) => {
    var item = req.body.addtodo;
    if (req.body.button === "Work List") {
        work.push(item);
        res.redirect("/work");
    }
    else {
        if (item != "")
            items.push(item);
        res.redirect("/");
    }
});

app.get("/work", (req, res) => {
    res.render("home", { title: "Work List", data: work });
})

app.get("/about", (req,res)=>{
    res.render("about", {title : "About Us"});
});

app.listen(3000, function () {
    console.log("Server Started Successfully");
});