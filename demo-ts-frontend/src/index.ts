import { HyperTrack } from "hypertrack-sdk-webview";

declare var window: any;
declare var document: any;

window.onerror = function (
  message: any,
  _source: any,
  _lineno: any,
  _colno: any,
  _error: any
) {
  alert(`Error: ${message}\n`);
};

let dialog = document.getElementById("myDialog");
let dialogMessage = document.getElementById("dialogMessage");
let dialogTitle = document.getElementById("dialogTitle");
let btnPrimary = document.getElementById("btnPrimary");
let btnSecondary = document.getElementById("btnSecondary");

window.onclick = function (event: { target: any }) {
  if (event.target == dialog) {
    hideDialog();
  }
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

window.onAddGeotagClick = function () {
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
};

window.onAddGeotagWithExpectedLocationClick = function () {
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
};

window.onCancelLocateClick = function () {
  try {
    if (locateSubscription) {
      locateSubscription.cancel();
      locateSubscription = null;
    }
  } catch (e) {
    alert(e);
  }
};

window.onGetErrorsClick = function () {
  try {
    let errors = HyperTrack.getErrors();
    alert(JSON.stringify(errors, null, 2));
  } catch (e) {
    alert(e);
  }
};

window.onGetIsAvailableClick = function () {
  try {
    let isAvailable = HyperTrack.getIsAvailable();
    alert(JSON.stringify(isAvailable, null, 2));
  } catch (e) {
    alert(e);
  }
};

window.onGetIsTrackingClick = function () {
  try {
    let isTracking = HyperTrack.getIsTracking();
    alert(JSON.stringify(isTracking, null, 2));
  } catch (e) {
    alert(e);
  }
};

window.onGetLocationClick = function () {
  try {
    let location = HyperTrack.getLocation();
    alert(JSON.stringify(location, null, 2));
  } catch (e) {
    alert(e);
  }
};

window.onGetMetadataClick = function () {
  try {
    let metadata = HyperTrack.getMetadata();
    alert(JSON.stringify(metadata, null, 2));
  } catch (e) {
    alert(e);
  }
};

window.onGetNameClick = function () {
  try {
    let name = HyperTrack.getName();
    alert(JSON.stringify(name, null, 2));
  } catch (e) {
    alert(e);
  }
};

window.onLocateClick = function () {
  try {
    locateSubscription = HyperTrack.locate(function (locationResult: any) {
      console.log("locate listener", JSON.stringify(locationResult, null, 2));
      alert(JSON.stringify(locationResult, null, 2));
    });
  } catch (e) {
    alert(e);
  }
};

window.onIsBackgroundLocationPermissionGrantedClick = function () {
  try {
    let isBackgroundLocationPermissionGranted =
      HyperTrack.isBackgroundLocationPermissionGranted();
    alert(
      `isBackgroundLocationPermissionGranted: ${JSON.stringify(
        isBackgroundLocationPermissionGranted,
        null,
        2
      )}`
    );
  } catch (e) {
    alert(e);
  }
};

window.onIsLocationPermissionGrantedClick = function () {
  try {
    let isLocationPermissionGranted = HyperTrack.isLocationPermissionGranted();
    alert(
      `isLocationPermissionGranted: ${JSON.stringify(
        isLocationPermissionGranted,
        null,
        2
      )}`
    );
  } catch (e) {
    alert(e);
  }
};

window.onIsLocationServicesEnabledClick = function () {
  try {
    let isLocationServicesEnabled = HyperTrack.isLocationServicesEnabled();
    alert(
      `isLocationServicesEnabled: ${JSON.stringify(
        isLocationServicesEnabled,
        null,
        2
      )}`
    );
  } catch (e) {
    alert(e);
  }
};

window.onIsNotificationsPermissionGrantedClick = function () {
  try {
    let isNotificationsPermissionGranted =
      HyperTrack.isNotificationsPermissionGranted();
    alert(
      `isNotificationsPermissionGranted: ${JSON.stringify(
        isNotificationsPermissionGranted,
        null,
        2
      )}`
    );
  } catch (e) {
    alert(e);
  }
};

window.onOpenAppSettingsClick = function () {
  try {
    HyperTrack.openAppSettings();
  } catch (e) {
    alert(e);
  }
};

window.onOpenLocationServicesSettingsClick = function () {
  try {
    HyperTrack.openLocationServicesSettings();
  } catch (e) {
    alert(e);
  }
};

window.onRequestLocationPermissionClick = function () {
  try {
    HyperTrack.requestLocationPermission();
  } catch (e) {
    alert(e);
  }
};

window.onRequestBackgroundLocationPermissionClick = function () {
  try {
    HyperTrack.requestBackgroundLocationPermission();
  } catch (e) {
    alert(e);
  }
};

window.onRequestNotificationsPermissionClick = function () {
  try {
    HyperTrack.requestNotificationsPermission();
  } catch (e) {
    alert(e);
  }
};

window.onSetIsAvailableClick = function (value: any) {
  try {
    HyperTrack.setIsAvailable(value);
  } catch (e) {
    alert(e);
  }
};

window.onSetIsTrackingClick = function (value: any) {
  try {
    HyperTrack.setIsTracking(value);
  } catch (e) {
    alert(e);
  }
};

window.onSetMetadataClick = function () {
  try {
    let metadata = {
      metadata_field: "test_metadata_value",
    };
    HyperTrack.setMetadata(metadata);
    alert(`Metadata set to ${JSON.stringify(metadata)}`);
  } catch (e) {
    alert(e);
  }
};

window.onSetNameClick = function () {
  try {
    let name = "test_name";
    HyperTrack.setName(name);
    alert(`Name set to ${name}`);
  } catch (e) {
    alert(e);
  }
};

window.onSubscribeToListenersClick = function () {
  subscribeToListeners();
};

window.onUnsubscribeFromListenersClick = function () {
  unsubscribeFromListeners();
};

function subscribeToListeners() {
  errorsSubscription = HyperTrack.subscribeToErrors(function (errors: any) {
    console.log("errors listener", JSON.stringify(errors, null, 2));
    document.getElementById("errors").innerText = JSON.stringify(
      errors,
      null,
      2
    );
  });

  isAvailableSubscription = HyperTrack.subscribeToIsAvailable(function (
    isAvailable: any
  ) {
    console.log("isAvailable listener", JSON.stringify(isAvailable, null, 2));
    document.getElementById("is-available").innerText = JSON.stringify(
      isAvailable,
      null,
      2
    );
  });

  isTrackingSubscription = HyperTrack.subscribeToIsTracking(function (
    isTracking: any
  ) {
    console.log("isTracking listener", JSON.stringify(isTracking, null, 2));
    document.getElementById("is-tracking").innerText = JSON.stringify(
      isTracking,
      null,
      2
    );
  });

  locationSubscription = HyperTrack.subscribeToLocation(function (
    locationResult: any
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
  if (errorsSubscription) {
    errorsSubscription.cancel();
    errorsSubscription = null;
  }
  if (isAvailableSubscription) {
    isAvailableSubscription.cancel();
    isAvailableSubscription = null;
  }
  if (isTrackingSubscription) {
    isTrackingSubscription.cancel();
    isTrackingSubscription = null;
  }
  if (locateSubscription) {
    locateSubscription.cancel();
    locateSubscription = null;
  }
  if (locationSubscription) {
    locationSubscription.cancel();
    locationSubscription = null;
  }
}

function showDialog(
  title: string,
  text: string,
  onPrimaryClick: { (): void; (): void; (): void; (): void },
  onSecondaryClick: {
    (): void;
    (): void;
    (): void;
    (): void;
    (): void;
    toString?: any;
  }
) {
  dialog.style.display = "block";
  dialogMessage.innerText = text;
  dialogTitle.innerText = title;

  btnPrimary.onclick = function () {
    console.log("onPrimaryClick");
    onPrimaryClick();
  };
  btnSecondary.onclick = function () {
    console.log("onSecondaryClick", onSecondaryClick.toString());
    onSecondaryClick();
  };
}

function hideDialog() {
  dialog.style.display = "none";
}

function startPermissionsFlow() {
  if (!HyperTrack.isLocationPermissionGranted()) {
    requestForegroundLocation();
  } else {
    onForegroundLocationGranted();
  }
}

function requestForegroundLocation() {
  showDialog(
    "Please grant Location permission",
    `This app collects activity and location data \n to  manage your work on the move \n even when the app is closed or not in use\n\n
      We use this data to:\n
      - Show your movement history\n
      - Optimize routes\n
      - Mark places you visit\n
      - Make expense claims easier\n
      - Compute daily stats \n\t\t(like total driven distance)`,
    function () {
      if (!HyperTrack.isLocationPermissionGranted()) {
        HyperTrack.requestLocationPermission();
      } else {
        hideDialog();
        onForegroundLocationGranted();
      }
    },
    function () {
      HyperTrack.openAppSettings();
    }
  );
}

function onForegroundLocationGranted() {
  if (!HyperTrack.isBackgroundLocationPermissionGranted()) {
    requestBackgroundLocation();
  } else {
    onBackgroundLocationGranted();
  }
}

function requestBackgroundLocation() {
  showDialog(
    "Allow All the Time Location Access",
    "The permission is required to automatically start tracking location based on your work schedule (without you having to open app). The app will always show a notification when tracking is active.",
    function () {
      if (!HyperTrack.isBackgroundLocationPermissionGranted()) {
        HyperTrack.requestBackgroundLocationPermission();
      } else {
        hideDialog();
        onBackgroundLocationGranted();
      }
    },
    function () {
      HyperTrack.openAppSettings();
    }
  );
}

function onBackgroundLocationGranted() {
  if (!HyperTrack.isNotificationsPermissionGranted()) {
    requestNotifications();
  } else {
    hideDialog();
    onNotificationsGranted();
  }
}

function requestNotifications() {
  showDialog(
    "Allow Notifications permission",
    `The permission is required by Android OS to launch the service to track your
      location while the app is in the background \n\n
      Also the app will notify you about tracking status and any tracking issues.`,
    function () {
      if (!HyperTrack.isNotificationsPermissionGranted()) {
        HyperTrack.requestNotificationsPermission();
      } else {
        hideDialog();
        onNotificationsGranted();
      }
    },
    function () {
      HyperTrack.openAppSettings();
    }
  );
}

function onNotificationsGranted() {
  alert("All permissions are granted");
}
