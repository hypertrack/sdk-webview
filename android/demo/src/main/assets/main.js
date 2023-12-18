window.onerror = function (message, _source, _lineno, _colno, _error) {
  alert(`Error: ${message}\nCheck "chrome://inspect" for details.`);
};

let errorsSubscription = null;
let isAvailableSubscription = null;
let isTrackingSubscription = null;
let locationSubscription = null;
let locateSubscription = null;

try {
  let deviceId = HyperTrack.getDeviceId();
  document.getElementById("device-id").innerText = deviceId;

  subscribeToListeners();
} catch (e) {
  alert(e);
}

function onAddGeotagClick() {
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

function onAddGeotagWithExpectedLocationClick() {
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

function onCancelLocateClick() {
  try {
    if (locateSubscription) {
      locateSubscription.cancel();
      locateSubscription = null;
    }
  } catch (e) {
    alert(e);
  }
}

function onGetErrorsClick() {
  try {
    let errors = HyperTrack.getErrors();
    alert(JSON.stringify(errors, null, 2));
  } catch (e) {
    alert(e);
  }
}

function onGetIsAvailableClick() {
  try {
    let isAvailable = HyperTrack.getIsAvailable();
    alert(JSON.stringify(isAvailable, null, 2));
  } catch (e) {
    alert(e);
  }
}

function onGetIsTrackingClick() {
  try {
    let isTracking = HyperTrack.getIsTracking();
    alert(JSON.stringify(isTracking, null, 2));
  } catch (e) {
    alert(e);
  }
}

function onGetLocationClick() {
  try {
    let location = HyperTrack.getLocation();
    alert(JSON.stringify(location, null, 2));
  } catch (e) {
    alert(e);
  }
}

function onGetMetadataClick() {
  try {
    let metadata = HyperTrack.getMetadata();
    alert(JSON.stringify(metadata, null, 2));
  } catch (e) {
    alert(e);
  }
}

function onGetNameClick() {
  try {
    let name = HyperTrack.getName();
    alert(JSON.stringify(name, null, 2));
  } catch (e) {
    alert(e);
  }
}

function onLocateClick() {
  try {
    locateSubscription = HyperTrack.locate(function (locationResult) {
      console.log("locate listener", JSON.stringify(locationResult, null, 2));
      alert(JSON.stringify(locationResult, null, 2));
    });
  } catch (e) {
    alert(e);
  }
}

function onOpenAppSettingsClick() {
  try {
    HyperTrack.openAppSettings();
  } catch (e) {
    alert(e);
  }
}

function onOpenLocationServicesSettingsClick() {
  try {
    HyperTrack.openLocationServicesSettings();
  } catch (e) {
    alert(e);
  }
}

function onRequestLocationPermissionClick() {
  try {
    HyperTrack.requestLocationPermission();
  } catch (e) {
    alert(e);
  }
}

function onRequestBackgroundLocationPermissionClick() {
  try {
    HyperTrack.requestBackgroundLocationPermission();
  } catch (e) {
    alert(e);
  }
}

function onRequestNotificationsPermissionClick() {
  try {
    HyperTrack.requestNotificationsPermission();
  } catch (e) {
    alert(e);
  }
}

function onSetIsAvailableClick(value) {
  try {
    HyperTrack.setIsAvailable(value);
  } catch (e) {
    alert(e);
  }
}

function onSetIsTrackingClick(value) {
  try {
    HyperTrack.setIsTracking(value);
  } catch (e) {
    alert(e);
  }
}

function onSetMetadataClick() {
  try {
    let metadata = {
      metadata_field: "test_metadata_value",
    };
    HyperTrack.setMetadata(metadata);
    alert(`Metadata set to ${JSON.stringify(metadata)}`);
  } catch (e) {
    alert(e);
  }
}

function onSetNameClick() {
  try {
    let name = "test_name";
    HyperTrack.setName(name);
    alert(`Name set to ${name}`);
  } catch (e) {
    alert(e);
  }
}

function onSubscribeToListenersClick() {
  subscribeToListeners();
}

function onUnsubscribeFromListenersClick() {
  unsubscribeFromListeners();
}

function subscribeToListeners() {
  errorsSubscription = HyperTrack.subscribeToErrors(function (errors) {
    console.log("errors listener", JSON.stringify(errors, null, 2));
    document.getElementById("errors").innerText = JSON.stringify(
      errors,
      null,
      2
    );
  });

  isAvailableSubscription = HyperTrack.subscribeToIsAvailable(function (
    isAvailable
  ) {
    console.log("isAvailable listener", JSON.stringify(isAvailable, null, 2));
    document.getElementById("is-available").innerText = JSON.stringify(
      isAvailable,
      null,
      2
    );
  });

  isTrackingSubscription = HyperTrack.subscribeToIsTracking(function (
    isTracking
  ) {
    console.log("isTracking listener", JSON.stringify(isTracking, null, 2));
    document.getElementById("is-tracking").innerText = JSON.stringify(
      isTracking,
      null,
      2
    );
  });

  locationSubscription = HyperTrack.subscribeToLocation(function (
    locationResult
  ) {
    console.log("location listener", JSON.stringify(locationResult, null, 2));
    document.getElementById("location").innerText = JSON.stringify(
      locationResult,
      null,
      2
    );
  });
}

function unsubscribeFromListeners() {
  if (locationSubscription) {
    locationSubscription.cancel();
    locationSubscription = null;
  }
}
