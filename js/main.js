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
  document.querySelector(".devices").removeEventListener('click', selectDevice);

  var deviceSelected = event.target.src || "",
      message = document.querySelector("header h2"),
      device = 0;

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
      device = 1;
      break;
    case "iphone":
      message.innerHTML = "What Model iPhone?";
      device = 2;
      break;
    case "ipad":
      message.innerHTML = "What Model iPad?";
      device = 3;
      break;
    case "samsung":
      message.innerHTML = "What Model Samsung?";
      device = 4;
      break;
    default:
      break;
  }

  // set URL
  var stateObj = { foo: "bar" };
  history.pushState(stateObj, "Select Model", deviceSelected);

  selectModels(device);
}

function selectModels(device) {
  var mobileDeviceModels;

  // get mobile device models
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://www.icracked.com/v2/api/mobiledevices/' + device + '/models', true);

  xhr.onload = function(e) {
    if (this.status == 200) {
      mobileDeviceModels = JSON.parse(this.response);

      console.log(mobileDeviceModels);

      document.querySelector("#container").setAttribute("class", "models");

      // render mobile models
      var models = document.querySelector(".models"),
          modelsContent = "";
      for (var i = 0; i < mobileDeviceModels.length; i++) {
        modelsContent += "<div>" + (mobileDeviceModels[i].name) + "</div>";
      }

      models.innerHTML = modelsContent;

      selectModel(mobileDeviceModels);
    }
  }

  xhr.send();
}

function selectModel(mobileDeviceModels) {
  var deviceID,
      model;
  document.querySelector(".models").addEventListener("click", function(){
    for (var i = 0; i < mobileDeviceModels.length; i++) {
      if (event.target.innerHTML === mobileDeviceModels[i].name) {
        deviceID = mobileDeviceModels[i].device_id;
        model = mobileDeviceModels[i].id;
        console.log("deviceID " + deviceID + " model " + model);
      }
    }

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.icracked.com/v2/api/mobiledevices/' + deviceID + '/models/' + model + '/colors', true);

    xhr.onload = function(e) {
      if (this.status == 200) {
        var mobileDeviceModel = JSON.parse(this.response);

        console.log(mobileDeviceModel);

        document.querySelector("header h2").innerHTML = "Excellent, what color is it?";
      }
    }

    xhr.send();
  });
}

getDevices();
