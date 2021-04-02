// console.log("Is our script file working?");

// load the airtable library, call it "Airtable";
var Airtable = require("airtable");
// console.log(Airtable);

// use airtable library, connect to our base using API key
var base = new Airtable({ apiKey: "keyIHtpPY0omZcC9J" }).base(
  "appfYhcmGsgCcnApB"
);

// get our collection base, select all the records
// specify functions that will receive the data
base("soaplist")
  .select({})
  .eachPage(gotPageOfSoaps, gotAllSoaps);

// an empty array to hold our data
var soaps = [];

// callback function that receives our data
function gotPageOfSoaps(records, fetchNextPage) {
  console.log("gotPageOfSoaps()");
  // add the records from this page to our array
  soaps.push(...records);
  // request more pages
  fetchNextPage();
}

// call back function that is called when all pages are loaded
function gotAllSoaps(err) {
  console.log("gotAllSoaps()");

  // report an error, you'd want to do something better than this in production
  if (err) {
    console.log("error loading data");
    console.error(err);
    return;
  }

  // call functions to log and show the books
  consoleLogSoaps();
  showSoaps();
}

// just loop through the books and console.log them
function consoleLogSoaps() {
  console.log("consoleLogSoaps()");
  soaps.forEach(soap => {
    console.log("Soap:", soap);
  });
}

// look through our airtable data, create elements
function showSoaps() {
  console.log("showSoaps()");
  soaps.forEach(soap => {
    // create container for each song
    var songContainer = document.createElement("div");
    songContainer.classList.add("soap-container");
    document.querySelector(".container").append(soapContainer);

    // add song titles
    var soapName = document.createElement("h1");
    soapName.classList.add("soap-name");
    soapName.innerText = soap.fields.name;
    soapContainer.append(soapName);

    var soapLink = document.createElement("p");
    soapLink.classList.add("soap-link");
    soapLink.innerText = soap.fields.link;
    soapLink.append(soapLink);

    var soapImage = document.createElement("img");
    soapImage.classList.add("soap-image");
    soapImage.src = soap.fields.soap_image[0].url;
    soapContainer.append(soapImage);

    // add event listener to add active class to song container
    soapContainer.addEventListener("click", function(event) {
      soapDescription.classList.toggle("active");
      soapImage.classList.toggle("active");
    });

    // get genre field from airtable
    // loop through the array and add each genre as
    // a class to the song container

    var soapGenre = soap.fields.genre;
    soapGenre.forEach(function(genre) {
      soapContainer.classList.add(genre);
    });

    // clicking on filter by pop
    // change background of pop genres to red
    // else change to white
    var filterPop = document.querySelector(".pop");
    filterPop.addEventListener("click", function() {
      if (songContainer.classList.contains("pop")) {
        songContainer.style.background = "red";
      } else {
        songContainer.style.background = "white";
      }
    });

    // filter by indie music
    var filterIndie = document.querySelector(".indie");
    filterIndie.addEventListener("click", function() {
      if (soapContainer.classList.contains("indie")) {
        soapContainer.style.background = "red";
      } else {
        soapContainer.style.background = "white";
      }
    });
    
    // filter by shoegaze music
    var filterShoegaze = document.querySelector(".shoegaze");
    filterShoegaze.addEventListener("click", function() {
      if (songContainer.classList.contains("shoegaze")) {
        songContainer.style.background = "red";
      } else {
        songContainer.style.background = "white";
      }
    });

    // filter reset
    var filterReset = document.querySelector(".js-reset");
    filterReset.addEventListener("click", function() {
      soapContainer.style.background = "white";
    });
  });
}


