try {
  let deviceId = HyperTrack.getDeviceId();
  document.getElementById("device-id").innerText = deviceId;
} catch (e) {
  alert(e);
}

function startTracking() {
  try {
    HyperTrack.setIsTracking(true);
  } catch (e) {
    alert(e);
  }
}

function stopTracking() {
  try {
    HyperTrack.setIsTracking(false);
  } catch (e) {
    alert(e);
  }
}

function addGeotag() {
  try {
    let addGeotagResult = HyperTrack.addGeotag({
      test_object: {
        test_key1: "test_value1",
      },
    });
    alert(JSON.stringify(addGeotagResult, null, 2));
  } catch (e) {
    alert(e);
  }
}

function addGeotagWithExpectedLocation() {
  try {
    let addGeotagWithExpectedLocationResult =
      HyperTrack.addGeotagWithExpectedLocation(
        {
          with_expected_location: "true",
          test_object: {
            test_key1: "test_value1",
          },
        },
        {
          latitude: 37.7758,
          longitude: -122.435,
        }
      );
    alert(JSON.stringify(addGeotagWithExpectedLocationResult, null, 2));
  } catch (e) {
    alert(e);
  }
}

function getErrors() {
  try {
    let errors = HyperTrack.getErrors();
    alert(JSON.stringify(errors, null, 2));
  } catch (e) {
    alert(e);
  }
}

function getLocation() {
  try {
    let location = HyperTrack.getLocation();
    alert(JSON.stringify(location, null, 2));
  } catch (e) {
    alert(e);
  }
}

function setMetadata() {
  try {
    let metadata = {
      metadata_field: "test_metadata_value",
    };
    HyperTrack.setMetadata();
    alert(`Metadata set to ${JSON.stringify(metadata)}`);
  } catch (e) {
    alert(e);
  }
}

function setName() {
  try {
    let name = "test_name";
    HyperTrack.setName(name);
    alert(`Name set to ${name}`);
  } catch (e) {
    alert(e);
  }
}

function openAppSettings() {
  try {
    HyperTrack.openAppSettings();
  } catch (e) {
    alert(e);
  }
}

function requestLocationPermission() {
  try {
    console.log(HyperTrack.requestLocationPermission);
    HyperTrack.requestLocationPermission();
  } catch (e) {
    alert(e);
  }
}

function requestBackgroundLocationPermission() {
  try {
    HyperTrack.requestBackgroundLocationPermission();
  } catch (e) {
    alert(e);
  }
}

function requestNotificationsPermission() {
  try {
    HyperTrack.requestNotificationsPermission();
  } catch (e) {
    alert(e);
  }
}
