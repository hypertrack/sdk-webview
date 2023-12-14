try {
  let deviceId = HyperTrackWebViewInterface.getDeviceId();
  document.getElementById("device-id").innerText = deviceId;
} catch (e) {
  alert(e);
}

function startTracking() {
  try {
    HyperTrackWebViewInterface.setIsTracking(true);
  } catch (e) {
    alert(e);
  }
}

function stopTracking() {
  try {
    HyperTrackWebViewInterface.setIsTracking(false);
  } catch (e) {
    alert(e);
  }
}

function addGeotag() {
  try {
    let addGeotagResult = HyperTrackWebViewInterface.addGeotag(
      JSON.stringify({
        test_object: {
          test_key1: "test_value1",
        },
      })
    );
    alert(JSON.stringify(JSON.parse(addGeotagResult), null, 2));
  } catch (e) {
    alert(e);
  }
}

function addGeotagWithExpectedLocation() {
  try {
    let addGeotagWithExpectedLocationResult =
      HyperTrackWebViewInterface.addGeotagWithExpectedLocation(
        JSON.stringify({
          with_expected_location: "true",
          test_object: {
            test_key1: "test_value1",
          },
        }),
        JSON.stringify({
          latitude: 37.7758,
          longitude: -122.435,
        })
      );
    alert(
      JSON.stringify(JSON.parse(addGeotagWithExpectedLocationResult), null, 2)
    );
  } catch (e) {
    alert(e);
  }
}

function getErrors() {
  try {
    let errors = HyperTrackWebViewInterface.getErrors();
    alert(JSON.stringify(JSON.parse(errors), null, 2));
  } catch (e) {
    alert(e);
  }
}

function getLocation() {
  try {
    let location = HyperTrackWebViewInterface.getLocation();
    alert(JSON.stringify(JSON.parse(location), null, 2));
  } catch (e) {
    alert(e);
  }
}

function setMetadata() {
  try {
    let result = HyperTrackWebViewInterface.setMetadata(
      JSON.stringify({
        metadata_field: "test_metadata_value",
      })
    );
    alert(JSON.stringify(JSON.parse(result), null, 2));
  } catch (e) {
    alert(e);
  }
}

function setName() {
  try {
    HyperTrackWebViewInterface.setName("test_name");
  } catch (e) {
    alert(e);
  }
}

function openAppSettings() {
  try {
    HyperTrackWebViewInterface.openAppSettings();
  } catch (e) {
    alert(e);
  }
}

function requestLocationPermission() {
  try {
    HyperTrackWebViewInterface.requestLocationPermission();
  } catch (e) {
    alert(e);
  }
}

function requestBackgroundLocationPermission() {
  try {
    HyperTrackWebViewInterface.requestBackgroundLocationPermission();
  } catch (e) {
    alert(e);
  }
}

function requestNotificationsPermission() {
  try {
    HyperTrackWebViewInterface.requestNotificationsPermission();
  } catch (e) {
    alert(e);
  }
}
