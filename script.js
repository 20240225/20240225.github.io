// Number of image regions to generate
const numberOfRegions = 5;

// Reference to the image container
const imageContainer = document.querySelector(".image-container");

// Reference to the image element
const image = document.getElementById("clickableImage");

// Calculate the width and height of the image
const imageWidth = image.width;
const imageHeight = image.height;

// Function to generate unique ID for each region
function generateRegionId(index) {
  return "region" + index;
}

// Function to load JSON data from a file
function loadJSONFile(filePath, callback) {
  // var xhr = new XMLHttpRequest();
  // xhr.overrideMimeType("application/json");
  // xhr.open("GET", filePath, true);
  // xhr.onreadystatechange = function () {
  //   if (xhr.readyState === 4 && xhr.status == "200") {
  //     callback(JSON.parse(xhr.responseText));
  //   }
  //   console.log("test");
  // };
  // console.log("test");
  console.log(filePath);
  fetch(filePath)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => console.log(data))
    .catch((error) => console.error("Unable to fetch data:", error));
}
// Function to create clickable regions based on JSON data
function createClickableRegions(data) {
  // Extract location information from JSON data
  var left = parseFloat(data.location_left);
  var top = parseFloat(data.location_top);
  var width = parseFloat(data.location_width);
  var height = parseFloat(data.location_height);

  // Calculate position and size of the region relative to the image dimensions
  var imageWidth = document.getElementById("clickableImage").naturalWidth;
  var imageHeight = document.getElementById("clickableImage").naturalHeight;
  var leftPercentage = (left / imageWidth) * 100;
  var topPercentage = (top / imageHeight) * 100;
  var widthPercentage = (width / imageWidth) * 100;
  var heightPercentage = (height / imageHeight) * 100;

  // Create a div element for the region
  var region = document.createElement("div");

  // Set position and size of the region
  region.style.left = leftPercentage + "%";
  region.style.top = topPercentage + "%";
  region.style.width = widthPercentage + "%";
  region.style.height = heightPercentage + "%";
  region.style.position = "absolute";
  region.style.backgroundColor = "rgba(0, 0, 0, 0.3)"; // Example background color
  region.style.cursor = "pointer";

  // Add click event listener to the region
  region.addEventListener("click", function () {
    // Handle click event (e.g., show popup, navigate to another page, etc.)
    console.log("Region clicked!");
  });

  // Append the region to the image container
  document.querySelector(".image-container").appendChild(region);
}

function generateImageRegions() {
  // Iterate through folders and load input.json files
  var folderNames = ["."]; // Add folder names here
  folderNames.forEach(function (folderName) {
    var inputJSONFile = folderName + "/input.json";
    loadJSONFile(inputJSONFile, createClickableRegions);
  });
}

// Function to generate image regions
// function generateImageRegions() {
//   for (let i = 0; i < numberOfRegions; i++) {
//     // Create a div element for the region
//     const region = document.createElement("div");

//     // Set the unique id for the region
//     region.id = generateRegionId(i);

//     // Calculate the position and size of the region (random for demonstration)
//     const left = Math.random() * imageWidth;
//     const top = Math.random() * imageHeight;
//     const width = Math.random() * 100; // Random width between 0 and 100
//     const height = Math.random() * 100; // Random height between 0 and 100

//     // Set the position and size of the region
//     region.style.left = left + "px";
//     region.style.top = top + "px";
//     region.style.width = width + "px";
//     region.style.height = height + "px";

//     // Add class to style the region
//     region.classList.add("clickable-area");

//     // Add click event listener to show popup
//     region.addEventListener("click", function (event) {
//       showPopup("Clicked on Region " + i, "your-image.jpg", event);
//     });

//     // Append the region to the image container
//     imageContainer.appendChild(region);
//   }
// }

// Function to show the popup with custom message and position it next to the clicked point
function showPopup(message, src, event) {
  var popup = document.getElementById("popup");
  var popupMessage = document.getElementById("popupMessage");
  var mediaContainer = document.getElementById("mediaContainer");

  // Set popup message
  popupMessage.textContent = message;

  // Clear previous content from media container
  mediaContainer.innerHTML = "";

  // Check if src is provided and create appropriate media element
  if (src) {
    if (src.endsWith(".mp4")) {
      // If src is video
      var video = document.createElement("video");
      video.src = src;
      video.controls = true;
      video.style.maxWidth = "100%";
      mediaContainer.appendChild(video);
    } else {
      // Assume src is image
      var image = document.createElement("img");
      image.src = src;
      image.style.maxWidth = "100%";
      mediaContainer.appendChild(image);
    }
  }

  // Calculate the position of the popup relative to the clicked point
  var posX = event.clientX + window.pageXOffset;
  var posY = event.clientY + window.pageYOffset;

  // Position the popup next to the clicked point
  popup.style.left = posX + 10 + "px"; // Add 10px offset for better visibility
  popup.style.top = posY + "px";

  // Show the popup
  popup.style.display = "block";
}

// Function to close the popup
function closePopup() {
  document.getElementById("popup").style.display = "none";
}

// Call the function to generate image regions when the page is loaded
window.addEventListener("load", generateImageRegions);
