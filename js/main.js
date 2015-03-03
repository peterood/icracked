var mobileDevices;

// add event listener
devices.addEventListener('click', selectDevice);

// get mobile devices
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://www.icracked.com/v2/api/mobiledevices', true);

xhr.onload = function(e) {
  if (this.status == 200) {
    mobileDevices = JSON.parse(this.response);

    // render mobile devices
    var devices = document.querySelector("#devices"),
        devicesContent = "";
    for (var i = 0; i < mobileDevices.length; i++) {
      devices.innerHTML += '<img src="' + mobileDevices[i].image + '">';
    }


  }
}

xhr.send();

function selectDevice(event) {
  var deviceSelected = event.target.src || "";

  if (deviceSelected.search("iphone") !== -1) {
    deviceSelected = "iphone";
  } else if (deviceSelected.search("ipad") !== -1) {
    deviceSelected = "ipad";
  } else if (deviceSelected.search("ipod") !== -1) {
    deviceSelected = "ipod";
  } else if (deviceSelected.search("samsung") !== -1) {
    deviceSelected = "samsung";
  }

  switch (deviceSelected) {
    case "iphone":
      break;
    case "ipad":
      break;
    case "ipod":
      break;
    case "samsung":
      break;
    default:
      break;
  }
}
