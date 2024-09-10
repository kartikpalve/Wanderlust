const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("express", express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

// index route
app.get("/listings", async (req, res) => {
  const allListing = await Listing.find({});
  res.render("./listings/index.ejs", { allListing });
});

// new route
app.get("/listings/new", (req, res) => {
  res.render("./listings/new.ejs");
});

// show route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("./listings/show.ejs", { listing });
});

// create route
app.post("/listings/", async (req, res) => {
  let listing = req.body.listing;
  console.log(listing);
  const newlisting = new Listing(req.body.listing);
  await newlisting.save();
  res.redirect("/listings/");
});

// app.get("/testListing",async (req,res)=>{
//   let samplelisting= new Listing({
//     title:"My villa",
//     description:"by the beach",
//     price:6000,
//     location:"pune, Maharashtra",
//     country:"India",
//   });

//   await samplelisting.save();
//   console.log("sample was saved");
//   res.send("testing succesfull");

// });

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
