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
    var soapContainer = document.createElement("div");
    soapContainer.classList.add("soap-container");
    document.querySelector(".container").append(soapContainer);

    // add song titles
    var soapName = document.createElement("h1");
    soapName.classList.add("soap-name");
    soapName.innerText = soap.fields.name;
    soapContainer.append(soapName);

     var soapImage = document.createElement("img");
    soapImage.classList.add("soap-image");
    soapImage.src = soap.fields.image[0].url;
    soapContainer.append(soapImage);

    var soapLink = document.createElement("p");
    soapLink.classList.add("soap-link");
    soapLink.innerText = soap.fields.link;
    soapContainer.append(soapLink);

    // add event listener to add active class to song container
    soapContainer.addEventListener("click", function(event) {
      soapImage.classList.toggle("active");
      soapLink.classList.toggle("active");
    });
  });
}


