
var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=VRTAjvKPkg1PFiDcpMAOZ9M74OGx0q7jZf-Akyg76ps";

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
  new Promise((resolve, reject) => {
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/plants" + apiToken,
    });
    resolve(request);
  });

// THIS IS SOME SAMPLE CODE FOR HOW TO USE PROMISES -- feel free to adapt this into a function!
corsPromise().then( 
  (request) =>
    (request.onload = request.onerror = function () {
      // TODO: ADD FUNCTION, ETC. FOR WHATEVER YOU WANT TO DO ONCE THE DATA IS RECEIVED
      handleResponse(request.response)
    })
);

//// TODO: ADD WHATEVER FUN CONTENT YOU WANT ////
let plantsPoaceae=[];
const handleResponse =  (requestResponse) => {
  const jsonified = JSON.parse(requestResponse)
  const plantsArray = jsonified.data;
  plantsPoaceae = _.map(plantsArray.filter(plant => plant.family=='Poaceae'), 'common_name')
}

const displayDiv = () => {
  const wrapper = document.createElement("div")
  wrapper.setAttribute("id", "wrapper")
  const header = document.createElement("h1")
  header.innerText = "My Poaceae Plants"
  wrapper.appendChild(header)
  console.log(plantsPoaceae)
  plantsPoaceae.forEach(plant => {
    const p = document.createElement("p")
    p.innerText = plant
    wrapper.appendChild(p)
  })
  document.getElementById("plants").appendChild(wrapper)
}