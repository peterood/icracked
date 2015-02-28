var mobileDevices;

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
