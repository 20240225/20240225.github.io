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
  var xhr = new XMLHttpRequest();
  xhr.overrideMimeType("application/json");
  xhr.open("GET", filePath, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status == "200") {
      callback(JSON.parse(xhr.responseText));
    }
  };
  xhr.send(null);
  // console.log(filePath);
  // fetch(filePath)
  //   .then((res) => {
  //     if (!res.ok) {
  //       throw new Error(`HTTP error! Status: ${res.status}`);
  //     }
  //     return res.json();
  //   })
  //   .then((data) => console.log(data))
  //   .catch((error) => console.error("Unable to fetch data:", error));
}
// Function to create clickable regions based on JSON data
function createClickableRegions(data) {
  // Extract location information from JSON data
  // parse, if doesn't exist, just return undefined
  var left = parseFloat(data.location_left);
  var top = parseFloat(data.location_top);
  var width = parseFloat(data.location_width);
  var height = parseFloat(data.location_height);
  var imagePath = data.imagePath;
  var videoPath = data.videoPath;
  var name = data.name;
  var message = data.message;

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
  region.style.backgroundColor = "rgba(0, 0, 0, 0.2)"; // Example background color
  region.style.cursor = "pointer";

  // Add click event listener to the region
  // region.addEventListener("click", function () {
  //   // Handle click event (e.g., show popup, navigate to another page, etc.)
  //   console.log("Region clicked!");
  // });

  region.addEventListener("click", function (event) {
    showPopup(name, message, videoPath, imagePath, event);
  });

  // Add hover effect using event listeners

  var textElement = document.createElement("span");
  region.appendChild(textElement);

  region.addEventListener("mouseenter", function (event) {
    region.style.border = "2px solid red";

    textElement.textContent = name; // Text to display on hover
    textElement.style.position = "absolute"; // Set position to absolute
    textElement.style.top = "-2vh"; // Position above the div
    textElement.style.left = "50%"; // Center horizontally
    textElement.style.transform = "translateX(-50%)"; // Center horizontally
    textElement.style.display = "inline-block"; // Display as inline block
    textElement.style.whiteSpace = "nowrap"; // Prevent text wrapping
    textElement.style.textAlign = "center"; // Center text horizontally
    textElement.style.color = "white";
  });

  region.addEventListener("mouseleave", function (event) {
    region.style.border = "none";
    textElement.style.display = "none";
  });

  // Append the region to the image container
  imageContainer.appendChild(region);
}

function generateImageRegions() {
  // Iterate through folders and load input.json files
  var folderNames = [
    // 1st row
    "./member/1stRow/01_이재서",
    "./member/1stRow/02_권태환",
    "./member/1stRow/03_남강현",
    "./member/1stRow/04_백승호",
    "./member/1stRow/05_이동형",
    "./member/1stRow/06_김명재",
    "./member/1stRow/07_김동은",
    "./member/1stRow/08_박준혁",
    // 2nd row
    "./member/2ndRow/01_신수인",
    "./member/2ndRow/02_김예진",
    "./member/2ndRow/03_김세현",
    "./member/2ndRow/04_이나경",
    "./member/2ndRow/05_김혜지",
    "./member/2ndRow/06_김예지",
    "./member/2ndRow/07_장효은",
    "./member/2ndRow/08_이재희",
    "./member/2ndRow/09_정은혜",
    // 3rd row
    "./member/3rdRow/01_김수정",
    "./member/3rdRow/02_이주현",
    "./member/3rdRow/03_김수빈",
    "./member/3rdRow/04_손유진",
    "./member/3rdRow/05_신소영",
    "./member/3rdRow/06_송혜린",
    "./member/3rdRow/07_강필구",
    "./member/3rdRow/08_김태원",
    "./member/3rdRow/09_안준성",
    "./member/3rdRow/10_이준호",
    "./member/3rdRow/11_김재영",
    "./member/3rdRow/12_강동욱",
    "./member/3rdRow/13_서민석",
  ];
  // Add folder names here
  folderNames.forEach(function (folderName) {
    var inputJSONFile = folderName + "/input.json";
    loadJSONFile(inputJSONFile, createClickableRegions);
  });
}

// Function to show the popup with custom message and position it next to the clicked point
function showPopup(name, message, videoSrc, imageSrc, event) {
  var popup = document.getElementById("popup");
  var popupName = document.getElementById("popupName");
  var popupMessage = document.getElementById("popupMessage");
  var mediaContainer = document.getElementById("mediaContainer");

  // Set popup message
  if (name) {
    popupName.textContent = name;
  }

  popupMessage.textContent = message;

  // Clear previous content from media container
  mediaContainer.innerHTML = "";

  // Check if src is provided and create appropriate media element
  console.log(videoSrc);
  if (videoSrc) {
    // If src is video
    var video = document.createElement("video");
    video.src = videoSrc;
    video.controls = true;
    video.style.maxWidth = "100%";
    mediaContainer.appendChild(video);
  }
  if (imageSrc) {
    // Assume src is image
    var image = document.createElement("img");
    image.src = imageSrc;
    image.style.maxWidth = "100%";
    mediaContainer.appendChild(image);
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
