"use strict";
const HYPERTRACK_EVENT_ERRORS = "errors";
const HYPERTRACK_EVENT_IS_AVAILABLE = "isAvailable";
const HYPERTRACK_EVENT_IS_TRACKING = "isTracking";
const HYPERTRACK_EVENT_LOCATE = "locate";
const HYPERTRACK_EVENT_LOCATION = "location";
let hyperTrackLocateSubscription;
let hyperTrackLocationSubscription;
let hyperTrackInstance = {
    addGeotag(data) {
        return hyperTrackDeserializeLocationResponse(JSON.parse(HyperTrackWebViewInterface.addGeotag(JSON.stringify({
            data,
        }))));
    },
    addGeotagWithExpectedLocation(data, expectedLocation) {
        return hyperTrackDeserializeLocationWithDeviationResponse(JSON.parse(HyperTrackWebViewInterface.addGeotagWithExpectedLocation(JSON.stringify({
            data,
            location: {
                type: "location",
                value: expectedLocation,
            },
        }))));
    },
    getDeviceId: function () {
        return JSON.parse(HyperTrackWebViewInterface.getDeviceId()).value;
    },
    getErrors: function () {
        return hyperTrackDeserializeHyperTrackErrors(JSON.parse(HyperTrackWebViewInterface.getErrors()));
    },
    getIsAvailable: function () {
        return JSON.parse(HyperTrackWebViewInterface.getIsAvailable()).value;
    },
    getIsTracking: function () {
        return JSON.parse(HyperTrackWebViewInterface.getIsTracking()).value;
    },
    getLocation: function () {
        return hyperTrackDeserializeLocationResponse(JSON.parse(HyperTrackWebViewInterface.getLocation()));
    },
    getMetadata: function () {
        return hyperTrackDeserializeMetadata(JSON.parse(HyperTrackWebViewInterface.getMetadata()));
    },
    getName: function () {
        return hyperTrackDeserializeName(JSON.parse(HyperTrackWebViewInterface.getName()));
    },
    locate: function () {
        return {
            cancel: () => { },
        };
        // locateSubscription?.remove();
        // locateSubscription = EventEmitter.addListener(
        //   EVENT_LOCATE,
        //   (location: Result<LocationInternal, HyperTrackErrorInternal[]>) => {
        //     callback(deserializeLocateResponse(location));
        //   }
        // );
        // HyperTrackWebViewInterface.locate();
        // return locateSubscription;
    },
    openAppSettings: function () {
        HyperTrackWebViewInterface.openAppSettings();
    },
    requestBackgroundLocationPermission: function () {
        HyperTrackWebViewInterface.requestBackgroundLocationPermission();
    },
    requestLocationPermission: function () {
        HyperTrackWebViewInterface.requestLocationPermission();
    },
    requestNotificationsPermission: function () {
        HyperTrackWebViewInterface.requestNotificationsPermission();
    },
    setIsAvailable: function (isAvailable) {
        HyperTrackWebViewInterface.setIsAvailable(JSON.stringify({
            type: "isAvailable",
            value: isAvailable,
        }));
    },
    setIsTracking: function (isTracking) {
        HyperTrackWebViewInterface.setIsTracking(JSON.stringify({
            type: "isTracking",
            value: isTracking,
        }));
    },
    setMetadata: function (metadata) {
        HyperTrackWebViewInterface.setMetadata(JSON.stringify({
            type: "metadata",
            value: metadata,
        }));
    },
    setName: function (name) {
        HyperTrackWebViewInterface.setName(JSON.stringify({
            type: "name",
            value: name,
        }));
    },
    subscribeToErrors: function (listener) {
        return {
            cancel: () => { },
        };
    },
    subscribeToIsAvailable: function (listener) {
        return {
            cancel: () => { },
        };
    },
    subscribeToIsTracking: function (listener) {
        return {
            cancel: () => { },
        };
    },
    subscribeToLocation: function (listener) {
        hyperTrackLocationSubscription = listener;
        HyperTrackWebViewInterface.subscribeToLocation();
        return {
            cancel: () => {
                hyperTrackLocationSubscription = undefined;
                HyperTrackWebViewInterface.unsubscribeFromLocation();
            },
        };
    },
};
let hyperTrackEventReceiver = {
    dispatchEvent: function (event) {
        console.log("dispatchEvent", JSON.stringify(event));
        switch (event.name) {
            case HYPERTRACK_EVENT_ERRORS:
                break;
            case HYPERTRACK_EVENT_IS_AVAILABLE:
                break;
            case HYPERTRACK_EVENT_IS_TRACKING:
                break;
            case HYPERTRACK_EVENT_LOCATE:
                break;
            case HYPERTRACK_EVENT_LOCATION:
                if (hyperTrackLocationSubscription) {
                    hyperTrackLocationSubscription(hyperTrackDeserializeLocationResponse(event.data));
                }
                break;
        }
    },
};
const HyperTrack = (function () {
    return hyperTrackInstance;
})();
const HyperTrackEventReceiver = (function () {
    return hyperTrackEventReceiver;
})();
/** @ignore */
function hyperTrackDeserializeHyperTrackErrors(errors) {
    let res = errors.map((error) => {
        if (error.type != "error") {
            throw new Error("Invalid error type");
        }
        return Object.keys(HyperTrackError).find((key) => HyperTrackError[key] === error.value);
    });
    return res;
}
/** @ignore */
function hyperTrackDeserializeLocateResponse(response) {
    switch (response.type) {
        case "success":
            return {
                type: "success",
                value: response.value.value,
            };
        case "failure":
            return {
                type: "failure",
                value: hyperTrackDeserializeHyperTrackErrors(response.value),
            };
    }
}
/** @ignore */
function hyperTrackDeserializeLocationError(locationError) {
    switch (locationError.type) {
        case "notRunning":
        case "starting":
            return locationError;
        case "errors":
            return {
                type: "errors",
                value: hyperTrackDeserializeHyperTrackErrors(locationError.value),
            };
    }
}
/** @ignore */
function hyperTrackDeserializeLocationResponse(response) {
    switch (response.type) {
        case "success":
            return {
                type: "success",
                value: response.value.value,
            };
        case "failure":
            return {
                type: "failure",
                value: hyperTrackDeserializeLocationError(response.value),
            };
    }
}
/** @ignore */
function hyperTrackDeserializeLocationWithDeviationResponse(response) {
    switch (response.type) {
        case "success":
            const locationWithDeviationInternal = response.value;
            const locationInternal = locationWithDeviationInternal.value.location;
            return {
                type: "success",
                value: {
                    location: locationInternal.value,
                    deviation: locationWithDeviationInternal.value.deviation,
                },
            };
        case "failure":
            return {
                type: "failure",
                value: hyperTrackDeserializeLocationError(response.value),
            };
    }
}
/** @ignore */
function hyperTrackDeserializeMetadata(metadata) {
    if (metadata.type != "metadata") {
        throw new Error(`Invalid metadata: ${JSON.stringify(metadata)}`);
    }
    return metadata.value;
}
/** @ignore */
function hyperTrackDeserializeName(name) {
    if (name.type != "name") {
        throw new Error(`Invalid name: ${JSON.stringify(name)}`);
    }
    return name.value;
}
/** @ignore */
function hyperTrackIsLocation(obj) {
    return ("latitude" in obj &&
        typeof obj.latitude == "number" &&
        "longitude" in obj &&
        typeof obj.longitude == "number");
}
// External
// enum naming convention is ignored to make datatype sync
// across platforms easier
var HyperTrackError;
(function (HyperTrackError) {
    /**
     * The SDK was remotely blocked from running.
     */
    HyperTrackError["blockedFromRunning"] = "blockedFromRunning";
    /**
     * The publishable key is invalid.
     */
    HyperTrackError["invalidPublishableKey"] = "invalidPublishableKey";
    /**
     * The user enabled mock location app while mocking locations is prohibited.
     */
    HyperTrackError["locationMocked"] = "location.mocked";
    /**
     * The user disabled location services systemwide.
     */
    HyperTrackError["locationServicesDisabled"] = "location.servicesDisabled";
    /**
     * [Android only] The device doesn't have location services.
     */
    HyperTrackError["locationServicesUnavailable"] = "location.servicesUnavailable";
    /**
     * GPS satellites are not in view.
     */
    HyperTrackError["locationSignalLost"] = "location.signalLost";
    /**
     * [Android only] The SDK wasn't able to start tracking because of the limitations imposed by the OS.
     * The exempt from background execution conditions weren't met.
     * {@link https://developer.android.com/guide/components/foreground-services#background-start-restriction-exemptions}
     */
    HyperTrackError["noExemptionFromBackgroundStartRestrictions"] = "noExemptionFromBackgroundStartRestrictions";
    /**
     * The user denied location permissions.
     */
    HyperTrackError["permissionsLocationDenied"] = "permissions.location.denied";
    /**
     * Can’t start tracking in background with When In Use location permissions.
     * SDK will automatically start tracking when app will return to foreground.
     */
    HyperTrackError["permissionsLocationInsufficientForBackground"] = "permissions.location.insufficientForBackground";
    /**
     * [iOS only] The user has not chosen whether the app can use location services.
     */
    HyperTrackError["permissionsLocationNotDetermined"] = "permissions.location.notDetermined";
    /**
     * [iOS only] The app is in Provisional Always authorization state, which stops sending locations when app is in background.
     */
    HyperTrackError["permissionsLocationProvisional"] = "permissions.location.provisional";
    /**
     * The user didn't grant precise location permissions or downgraded permissions to imprecise.
     */
    HyperTrackError["permissionsLocationReducedAccuracy"] = "permissions.location.reducedAccuracy";
    /**
     * [iOS only] The app is not authorized to use location services.
     */
    HyperTrackError["permissionsLocationRestricted"] = "permissions.location.restricted";
    /**
     * [Android only] The user denied notification permissions needed to display a persistent notification
     * needed for foreground location tracking.
     */
    HyperTrackError["permissionsNotificationsDenied"] = "permissions.notifications.denied";
})(HyperTrackError || (HyperTrackError = {}));