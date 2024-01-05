"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HyperTrack = void 0;
/** @ignore */
const HYPERTRACK_EVENT_ERRORS = "errors";
/** @ignore */
const HYPERTRACK_EVENT_IS_AVAILABLE = "isAvailable";
/** @ignore */
const HYPERTRACK_EVENT_IS_TRACKING = "isTracking";
/** @ignore */
const HYPERTRACK_EVENT_LOCATE = "locate";
/** @ignore */
const HYPERTRACK_EVENT_LOCATION = "location";
/** @ignore */
let hyperTrackErrorsListener;
/** @ignore */
let hyperTrackIsAvailableListener;
/** @ignore */
let hyperTrackIsTrackingListener;
/** @ignore */
let hyperTrackLocationListener;
/** @ignore */
let hyperTrackLocateListener;
const HYPERTRACK_ADD_GEOTAG_VALIDATION_ERROR = new Error("You should provide a JSON-compatible object as data param");
const HYPERTRACK_ADD_GEOTAG_WITH_EXPECTED_LOCATION_VALIDATION_ERROR = new Error("You should provide a JSON-compatible object as data param and expectedLocation should be a valid location object");
const HYPERTRACK_SET_IS_AVAILABLE_VALIDATION_ERROR = new Error("isAvailable should be a boolean value");
const HYPERTRACK_SET_IS_TRACKING_VALIDATION_ERROR = new Error("isTracking should be a boolean value");
const HYPERTRACK_SET_NAME_VALIDATION_ERROR = new Error("You should provide a string as name param");
const HYPERTRACK_SET_METADATA_VALIDATION_ERROR = new Error("You should provide a JSON-compatible object as metadata param");
const HYPERTRACK_MISSING_WEBVIEW_INTERFACE_ERROR = new Error("HyperTrack WebView interface is not defined. Please make sure you have integrated the native part of the SDK correctly.");
/**
 * @ignore
 *
 * The convention for errors here is that we crash on any error that prevents mutation
 * methods (addGeotag, setMetadata, setIsTracking, etc) from execution, and swallow all
 * other errors, print them to console and return a stub result for non-mutation methods.
 * But the layers underneeth already handle all the errors except for parsing ones, so
 * there is no need for explicit error handling here.
 * We don't handle parsing errors, because they should never happen as we control
 * the data from the both JS and native sides.
 */
let hyperTrackInstance = {
    addGeotag(data) {
        if (!data) {
            throw HYPERTRACK_ADD_GEOTAG_VALIDATION_ERROR;
        }
        let geotagData;
        try {
            // JSON.stringify will crash if data is not JSON-compatible
            geotagData = JSON.stringify({
                data,
            });
        }
        catch (e) {
            throw HYPERTRACK_ADD_GEOTAG_VALIDATION_ERROR;
        }
        // not handling crashes, mutation method
        return hyperTrackDeserializeLocationResponse(JSON.parse(HyperTrackWebViewInterface.addGeotag(geotagData)));
    },
    addGeotagWithExpectedLocation(data, expectedLocation) {
        if (!data || !expectedLocation || !hyperTrackIsLocation(expectedLocation)) {
            throw HYPERTRACK_ADD_GEOTAG_WITH_EXPECTED_LOCATION_VALIDATION_ERROR;
        }
        let geotagData;
        try {
            // JSON.stringify will crash if data is not JSON-compatible
            geotagData = JSON.stringify({
                data,
                expectedLocation: {
                    type: "location",
                    value: expectedLocation,
                },
            });
        }
        catch (e) {
            throw HYPERTRACK_ADD_GEOTAG_WITH_EXPECTED_LOCATION_VALIDATION_ERROR;
        }
        // not handling crashes, mutation method
        if (typeof HyperTrackWebViewInterface === "undefined") {
            throw HYPERTRACK_MISSING_WEBVIEW_INTERFACE_ERROR;
        }
        return hyperTrackDeserializeLocationWithDeviationResponse(JSON.parse(HyperTrackWebViewInterface.addGeotagWithExpectedLocation(geotagData)));
    },
    getDeviceId: function () {
        if (typeof HyperTrackWebViewInterface === "undefined") {
            console.error(HYPERTRACK_MISSING_WEBVIEW_INTERFACE_ERROR);
            return "";
        }
        return JSON.parse(HyperTrackWebViewInterface.getDeviceId()).value;
    },
    getErrors: function () {
        if (typeof HyperTrackWebViewInterface === "undefined") {
            console.error(HYPERTRACK_MISSING_WEBVIEW_INTERFACE_ERROR);
            return HYPERTRACK_MISSING_WEBVIEW_INTERFACE_ERRORS_VALUE;
        }
        return hyperTrackDeserializeHyperTrackErrors(JSON.parse(HyperTrackWebViewInterface.getErrors()));
    },
    getIsAvailable: function () {
        if (typeof HyperTrackWebViewInterface === "undefined") {
            console.error(HYPERTRACK_MISSING_WEBVIEW_INTERFACE_ERROR);
            return false;
        }
        return JSON.parse(HyperTrackWebViewInterface.getIsAvailable()).value;
    },
    getIsTracking: function () {
        if (typeof HyperTrackWebViewInterface === "undefined") {
            console.error(HYPERTRACK_MISSING_WEBVIEW_INTERFACE_ERROR);
            return false;
        }
        return JSON.parse(HyperTrackWebViewInterface.getIsTracking()).value;
    },
    getLocation: function () {
        if (typeof HyperTrackWebViewInterface === "undefined") {
            console.error(HYPERTRACK_MISSING_WEBVIEW_INTERFACE_ERROR);
            return HYPERTRACK_MISSING_WEBVIEW_INTERFACE_LOCATION_RESULT_VALUE;
        }
        return hyperTrackDeserializeLocationResponse(JSON.parse(HyperTrackWebViewInterface.getLocation()));
    },
    getMetadata: function () {
        if (typeof HyperTrackWebViewInterface === "undefined") {
            console.error(HYPERTRACK_MISSING_WEBVIEW_INTERFACE_ERROR);
            return {};
        }
        return hyperTrackDeserializeMetadata(JSON.parse(HyperTrackWebViewInterface.getMetadata()));
    },
    getName: function () {
        if (typeof HyperTrackWebViewInterface === "undefined") {
            console.error(HYPERTRACK_MISSING_WEBVIEW_INTERFACE_ERROR);
            return "";
        }
        return hyperTrackDeserializeName(JSON.parse(HyperTrackWebViewInterface.getName()));
    },
    isBackgroundLocationPermissionGranted: function () {
        if (typeof HyperTrackWebViewInterface === "undefined") {
            console.error(HYPERTRACK_MISSING_WEBVIEW_INTERFACE_ERROR);
            return false;
        }
        let result = JSON.parse(HyperTrackWebViewInterface.isBackgroundLocationPermissionGranted());
        if (result.type != "isBackgroundLocationPermissionGranted") {
            throw new Error(`Invalid result: ${JSON.stringify(result)}`);
        }
        return result.value;
    },
    isLocationPermissionGranted: function () {
        if (typeof HyperTrackWebViewInterface === "undefined") {
            console.error(HYPERTRACK_MISSING_WEBVIEW_INTERFACE_ERROR);
            return false;
        }
        let result = JSON.parse(HyperTrackWebViewInterface.isLocationPermissionGranted());
        if (result.type != "isLocationPermissionGranted") {
            throw new Error(`Invalid result: ${JSON.stringify(result)}`);
        }
        return result.value;
    },
    isLocationServicesEnabled: function () {
        if (typeof HyperTrackWebViewInterface === "undefined") {
            console.error(HYPERTRACK_MISSING_WEBVIEW_INTERFACE_ERROR);
            return false;
        }
        let result = JSON.parse(HyperTrackWebViewInterface.isLocationServicesEnabled());
        if (result.type != "isLocationServicesEnabled") {
            throw new Error(`Invalid result: ${JSON.stringify(result)}`);
        }
        return result.value;
    },
    isNotificationsPermissionGranted: function () {
        if (typeof HyperTrackWebViewInterface === "undefined") {
            console.error(HYPERTRACK_MISSING_WEBVIEW_INTERFACE_ERROR);
            return false;
        }
        let result = JSON.parse(HyperTrackWebViewInterface.isNotificationsPermissionGranted());
        if (result.type != "isNotificationsPermissionGranted") {
            throw new Error(`Invalid result: ${JSON.stringify(result)}`);
        }
        return result.value;
    },
    locate: function (callback) {
        if (typeof HyperTrackWebViewInterface === "undefined") {
            setTimeout(() => {
                callback({
                    type: "failure",
                    value: HYPERTRACK_MISSING_WEBVIEW_INTERFACE_ERRORS_VALUE,
                });
            }, 0);
            return {
                cancel: () => { },
            };
        }
        hyperTrackLocateListener = callback;
        HyperTrackWebViewInterface.locate();
        return {
            cancel: () => {
                HyperTrackWebViewInterface.cancelLocate();
                hyperTrackLocateListener = undefined;
            },
        };
    },
    openAppSettings: function () {
        if (typeof HyperTrackWebViewInterface === "undefined") {
            console.error(HYPERTRACK_MISSING_WEBVIEW_INTERFACE_ERROR);
            return;
        }
        HyperTrackWebViewInterface.openAppSettings();
    },
    openLocationServicesSettings: function () {
        if (typeof HyperTrackWebViewInterface === "undefined") {
            console.error(HYPERTRACK_MISSING_WEBVIEW_INTERFACE_ERROR);
            return;
        }
        HyperTrackWebViewInterface.openLocationServicesSettings();
    },
    requestBackgroundLocationPermission: function () {
        if (typeof HyperTrackWebViewInterface === "undefined") {
            console.error(HYPERTRACK_MISSING_WEBVIEW_INTERFACE_ERROR);
            return;
        }
        HyperTrackWebViewInterface.requestBackgroundLocationPermission();
    },
    requestLocationPermission: function () {
        if (typeof HyperTrackWebViewInterface === "undefined") {
            console.error(HYPERTRACK_MISSING_WEBVIEW_INTERFACE_ERROR);
            return;
        }
        HyperTrackWebViewInterface.requestLocationPermission();
    },
    requestNotificationsPermission: function () {
        if (typeof HyperTrackWebViewInterface === "undefined") {
            console.error(HYPERTRACK_MISSING_WEBVIEW_INTERFACE_ERROR);
            return;
        }
        HyperTrackWebViewInterface.requestNotificationsPermission();
    },
    setIsAvailable: function (isAvailable) {
        // not handling crashes, mutation method
        if (typeof HyperTrackWebViewInterface === "undefined") {
            throw HYPERTRACK_MISSING_WEBVIEW_INTERFACE_ERROR;
        }
        if (typeof isAvailable !== "boolean") {
            throw HYPERTRACK_SET_IS_AVAILABLE_VALIDATION_ERROR;
        }
        HyperTrackWebViewInterface.setIsAvailable(JSON.stringify({
            type: "isAvailable",
            value: isAvailable,
        }));
    },
    setIsTracking: function (isTracking) {
        // not handling crashes, mutation method
        if (typeof HyperTrackWebViewInterface === "undefined") {
            throw HYPERTRACK_MISSING_WEBVIEW_INTERFACE_ERROR;
        }
        if (typeof isTracking !== "boolean") {
            throw HYPERTRACK_SET_IS_TRACKING_VALIDATION_ERROR;
        }
        HyperTrackWebViewInterface.setIsTracking(JSON.stringify({
            type: "isTracking",
            value: isTracking,
        }));
    },
    setMetadata: function (metadata) {
        // not handling crashes, mutation method
        if (typeof HyperTrackWebViewInterface === "undefined") {
            throw HYPERTRACK_MISSING_WEBVIEW_INTERFACE_ERROR;
        }
        if (!metadata) {
            throw HYPERTRACK_SET_METADATA_VALIDATION_ERROR;
        }
        let metadataString;
        try {
            // JSON.stringify will crash if metadata is not JSON-compatible
            metadataString = JSON.stringify({
                type: "metadata",
                value: metadata,
            });
        }
        catch (e) {
            throw HYPERTRACK_SET_METADATA_VALIDATION_ERROR;
        }
        HyperTrackWebViewInterface.setMetadata(metadataString);
    },
    setName: function (name) {
        if (typeof name !== "string") {
            throw HYPERTRACK_SET_NAME_VALIDATION_ERROR;
        }
        HyperTrackWebViewInterface.setName(JSON.stringify({
            type: "name",
            value: name,
        }));
    },
    subscribeToErrors: function (listener) {
        if (typeof HyperTrackWebViewInterface === "undefined") {
            console.error(HYPERTRACK_MISSING_WEBVIEW_INTERFACE_ERROR);
            setTimeout(() => {
                listener(HYPERTRACK_MISSING_WEBVIEW_INTERFACE_ERRORS_VALUE);
            }, 0);
            return {
                cancel: () => { },
            };
        }
        hyperTrackErrorsListener = listener;
        HyperTrackWebViewInterface.subscribeToErrors();
        return {
            cancel: () => {
                hyperTrackErrorsListener = undefined;
                HyperTrackWebViewInterface.unsubscribeFromErrors();
            },
        };
    },
    subscribeToIsAvailable: function (listener) {
        if (typeof HyperTrackWebViewInterface === "undefined") {
            console.error(HYPERTRACK_MISSING_WEBVIEW_INTERFACE_ERROR);
            setTimeout(() => {
                listener(false);
            }, 0);
            return {
                cancel: () => { },
            };
        }
        hyperTrackIsAvailableListener = listener;
        HyperTrackWebViewInterface.subscribeToIsAvailable();
        return {
            cancel: () => {
                hyperTrackIsAvailableListener = undefined;
                HyperTrackWebViewInterface.unsubscribeFromIsAvailable();
            },
        };
    },
    subscribeToIsTracking: function (listener) {
        if (typeof HyperTrackWebViewInterface === "undefined") {
            console.error(HYPERTRACK_MISSING_WEBVIEW_INTERFACE_ERROR);
            setTimeout(() => {
                listener(false);
            }, 0);
            return {
                cancel: () => { },
            };
        }
        hyperTrackIsTrackingListener = listener;
        HyperTrackWebViewInterface.subscribeToIsTracking();
        return {
            cancel: () => {
                hyperTrackIsTrackingListener = undefined;
                HyperTrackWebViewInterface.unsubscribeFromIsTracking();
            },
        };
    },
    subscribeToLocation: function (listener) {
        if (typeof HyperTrackWebViewInterface === "undefined") {
            console.error(HYPERTRACK_MISSING_WEBVIEW_INTERFACE_ERROR);
            setTimeout(() => {
                listener(HYPERTRACK_MISSING_WEBVIEW_INTERFACE_LOCATION_RESULT_VALUE);
            }, 0);
            return {
                cancel: () => { },
            };
        }
        hyperTrackLocationListener = listener;
        HyperTrackWebViewInterface.subscribeToLocation();
        return {
            cancel: () => {
                hyperTrackLocationListener = undefined;
                HyperTrackWebViewInterface.unsubscribeFromLocation();
            },
        };
    },
};
/** @ignore */
let hyperTrackEventReceiver = {
    dispatchEvent: function (event) {
        switch (event.name) {
            case HYPERTRACK_EVENT_ERRORS:
                if (hyperTrackErrorsListener) {
                    hyperTrackErrorsListener(hyperTrackDeserializeHyperTrackErrors(event.data.errors));
                }
                break;
            case HYPERTRACK_EVENT_IS_AVAILABLE:
                if (hyperTrackIsAvailableListener) {
                    hyperTrackIsAvailableListener(event.data.value);
                }
                break;
            case HYPERTRACK_EVENT_IS_TRACKING:
                if (hyperTrackIsTrackingListener) {
                    hyperTrackIsTrackingListener(event.data.value);
                }
                break;
            case HYPERTRACK_EVENT_LOCATE:
                if (hyperTrackLocateListener) {
                    hyperTrackLocateListener(hyperTrackDeserializeLocateResponse(event.data));
                }
                break;
            case HYPERTRACK_EVENT_LOCATION:
                if (hyperTrackLocationListener) {
                    hyperTrackLocationListener(hyperTrackDeserializeLocationResponse(event.data));
                }
                break;
        }
    },
};
/** @ignore */
const HyperTrack = (function () {
    return hyperTrackInstance;
})();
exports.HyperTrack = HyperTrack;
/** @ignore */
const HyperTrackEventReceiver = (function () {
    return hyperTrackEventReceiver;
})();
window.HyperTrackEventReceiver = HyperTrackEventReceiver;
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
const HYPERTRACK_MISSING_WEBVIEW_INTERFACE_ERRORS_VALUE = [
    HyperTrackError.locationServicesUnavailable,
    HyperTrackError.blockedFromRunning,
];
const HYPERTRACK_MISSING_WEBVIEW_INTERFACE_LOCATION_RESULT_VALUE = {
    type: "failure",
    value: {
        type: "notRunning",
    },
};
