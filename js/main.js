window.onload = getDevices;

var container = document.querySelector("#container"),
    deviceID,
    deviceSelected,
    mobileDevices,
    mobileDeviceModels,
    mobileDeviceModelColors,
    mobileDeviceModelColor,
    mobileDeviceModelConditions,
    mobileDeviceModelNetworks,
    model,
    selectMessage = document.querySelector("header h2"),
    urlPath;

container.addEventListener("click", handleEvents);

function handleEvents() {
  var selectStage = event.target.parentElement.className;

  switch (selectStage) {
    case "devices":
      selectDevice(event);
      break;
    case "models":
      selectModel();
      break;
    case "colors":
      selectColor();
      break;
    case "networks":
      selectNetwork();
      break;
    case "conditions":
      selectCondition();
      break;
    default:
      break;
  }
}

function getDevices() {
  console.log("getDevices called");
  // get mobile devices
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://www.icracked.com/v2/api/mobiledevices', true);

  xhr.onload = function(e) {
    if (this.status == 200) {
      mobileDevices = JSON.parse(this.response);

      // render mobile devices
      var devices = document.querySelector(".devices"),
          devicesContent = "";

      for (var i = 0; i < mobileDevices.length; i++) {
        devices.innerHTML += '<img src="' + mobileDevices[i].image + '">';
      }
    }
  }

  xhr.send();
}

function selectDevice(event) {
  console.log("selectDevice called");

  var device = 0;

  deviceSelected = event.target.src || "";

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
      selectMessage.innerHTML = "What Model iPod?";
      device = 1;
      break;
    case "iphone":
      selectMessage.innerHTML = "What Model iPhone?";
      device = 2;
      break;
    case "ipad":
      selectMessage.innerHTML = "What Model iPad?";
      device = 3;
      break;
    case "samsung":
      selectMessage.innerHTML = "What Model Samsung?";
      device = 4;
      break;
    default:
      break;
  }

  // set URL
  var stateObj = { foo: "bar" };
  urlPath = deviceSelected;
  history.replaceState(stateObj, "Select Device", urlPath);

  // get mobile device models
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://www.icracked.com/v2/api/mobiledevices/' + device + '/models', true);

  xhr.onload = function(e) {
    if (this.status == 200) {
      mobileDeviceModels = JSON.parse(this.response);

      document.querySelector("#container").setAttribute("class", "models");

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
}

function selectModel() {
  console.log("selectModel called");

  for (var i = 0; i < mobileDeviceModels.length; i++) {
    if (event.target.innerHTML === mobileDeviceModels[i].name) {
      deviceID = mobileDeviceModels[i].device_id;
      model = mobileDeviceModels[i].id;
    }
  }

  // set URL
  var stateObj = { foo: "bar" };
  urlPath = deviceSelected + "/" + model;
  history.replaceState(stateObj, "Select Model", urlPath);

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://www.icracked.com/v2/api/mobiledevices/' + deviceID + '/models/' + model + '/colors', true);

  xhr.onload = function(e) {
    if (this.status == 200) {
      mobileDeviceModelColors = JSON.parse(this.response);

      container.setAttribute("class", "colors");
      selectMessage.innerHTML = "Excellent, what color is it?";
      container.innerHTML = "";


      for (var i = 0; i < mobileDeviceModelColors.length; i++) {
        container.innerHTML += "<div>" + mobileDeviceModelColors[i].name + "</div>";
      }
    }
  }

  xhr.send();
}

function selectColor() {
  console.log("selectColor called");

  for (var i = 0; i < mobileDeviceModelColors.length; i++) {
    if (event.target.innerHTML === mobileDeviceModelColors[i].name) {
      mobileDeviceModelColor = mobileDeviceModelColors[i].name;
    }
  }

  // set URL
  var stateObj = { foo: "bar" };
  urlPath = model + "/" + mobileDeviceModelColor;
  history.replaceState(stateObj, "Select Color", urlPath);

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://www.icracked.com/v2/api/mobiledevices/' + deviceID + '/models/' + model + '/networks', true);

  xhr.onload = function(e) {
    if (this.status == 200) {
      mobileDeviceModelNetworks = JSON.parse(this.response);

      container.setAttribute("class", "networks");
      selectMessage.innerHTML = "What Network Are You On?";
      container.innerHTML = "";

      for (var i = 0; i < mobileDeviceModelNetworks.length; i++) {
        container.innerHTML += "<div>" + mobileDeviceModelNetworks[i].name + "</div>";
      }
    }
  }

  xhr.send();
}

function selectNetwork(mobileDeviceModelColors) {
  console.log("selectNetwork called");

  for (var i = 0; i < mobileDeviceModelNetworks.length; i++) {
    if (event.target.innerHTML === mobileDeviceModelNetworks[i].name) {
      mobileDeviceModelNetworks = mobileDeviceModelNetworks[i].name;
    }
  }

  // set URL
  var stateObj = { foo: "bar" };
  urlPath = mobileDeviceModelColor + "/" + mobileDeviceModelNetworks;
  history.replaceState(stateObj, "Select Model", urlPath);

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://www.icracked.com/v2/api/mobiledevices/' + deviceID + '/models/' + model + '/conditions', true);

  xhr.onload = function(e) {
    if (this.status == 200) {
      mobileDeviceModelConditions = JSON.parse(this.response);

      container.setAttribute("class", "conditions");
      selectMessage.innerHTML = "And, what is the issue?";
      container.innerHTML = "";

      for (var i = 0; i < mobileDeviceModelConditions.length; i++) {
        container.innerHTML += "<div>" + mobileDeviceModelConditions[i].text + "</div>";
      }
    }
  }

  xhr.send();
}

function selectCondition() {
  console.log("selectCondition called");
  selectMessage.innerHTML = "Thanks for choosing iCracked";
  container.innerHTML = "We appreciate your <a href='https://github.com/peterood/icracked/issues'>feedback</a>.";
}
