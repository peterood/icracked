var mobileDevices;

function getDevices() {
  // get mobile devices
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://www.icracked.com/v2/api/mobiledevices', true);

  xhr.onload = function(e) {
    if (this.status == 200) {
      mobileDevices = JSON.parse(this.response);

      // render mobile devices
      var devices = document.querySelector(".devices"),
          devicesContent = "";

      // add event listener
      devices.addEventListener('click', selectDevice);

      for (var i = 0; i < mobileDevices.length; i++) {
        devices.innerHTML += '<img src="' + mobileDevices[i].image + '">';
      }
    }
  }

  xhr.send();
}

function selectDevice(event) {
  var deviceSelected = event.target.src || "",
      message = document.querySelector("header h2"),
      model = 0;

  if (deviceSelected.search("ipod") !== -1) {
    deviceSelected = "ipod";
  } else if (deviceSelected.search("iphone") !== -1) {
    deviceSelected = "iphone";
  } else if (deviceSelected.search("ipad") !== -1) {
    deviceSelected = "ipad";
  } else if (deviceSelected.search("samsung") !== -1) {
    deviceSelected = "samsung";
  }

  switch (deviceSelected) {
    case "ipod":
      message.innerHTML = "What Model iPod?";
      model = 1;
      break;
    case "iphone":
      message.innerHTML = "What Model iPhone?";
      model = 2;
      break;
    case "ipad":
      message.innerHTML = "What Model iPad?";
      model = 3;
      break;
    case "samsung":
      message.innerHTML = "What Model Samsung?";
      model = 4;
      break;
    default:
      break;
  }

  // set URL
  var stateObj = { foo: "bar" };
  history.pushState(stateObj, "Select Model", deviceSelected);

  selectModel(model);
}

function selectModel(model) {
  var mobileDeviceModels;

  // get mobile device models
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://www.icracked.com/v2/api/mobiledevices/' + model + '/models', true);

  xhr.onload = function(e) {
    if (this.status == 200) {
      mobileDeviceModels = JSON.parse(this.response);

      console.log(mobileDeviceModels);

      // render mobile models
      var models = document.querySelector(".models"),
          modelsContent = "";
      for (var i = 0; i < mobileDeviceModels.length; i++) {
        modelsContent += "<div>" + (mobileDeviceModels[i].name) + "</div>";
      }

      models.innerHTML = modelsContent;
    }
  }

  xhr.send();

  document.querySelector("#container").setAttribute("class", "models");

  var models = document.querySelector(".models");
  models.addEventListener("click", selectSpecs);
}

function selectSpecs(event) {
  console.log(event.target);
}

getDevices();
