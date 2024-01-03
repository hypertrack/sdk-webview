/** @ignore */
declare var HyperTrackWebViewInterface: HyperTrackWebViewInterfaceApi;

// All names have HyperTrack prefix to avoid name collisions

/** @ignore */
interface HyperTrackWebViewInterfaceApi {
  addGeotag(geotagData: string): string;
  addGeotagWithExpectedLocation(geotagData: string): string;
  cancelLocate(): void;
  getDeviceId(): string;
  getErrors(): string;
  getIsAvailable(): string;
  getIsTracking(): string;
  getLocation(): string;
  getMetadata(): string;
  getName(): string;
  isBackgroundLocationPermissionGranted(): string;
  isLocationPermissionGranted(): string;
  isLocationServicesEnabled(): string;
  isNotificationsPermissionGranted(): string;
  locate(): string;
  openAppSettings(): void;
  openLocationServicesSettings(): void;
  requestBackgroundLocationPermission(): void;
  requestLocationPermission(): void;
  requestNotificationsPermission(): void;
  setIsAvailable(isAvailable: string): void;
  setIsTracking(isTracking: string): void;
  setMetadata(metadata: string): void;
  setName(name: string): void;
  subscribeToErrors(): HyperTrackSubscription;
  subscribeToIsAvailable(): HyperTrackSubscription;
  subscribeToIsTracking(): HyperTrackSubscription;
  subscribeToLocation(): HyperTrackSubscription;
  unsubscribeFromErrors(): void;
  unsubscribeFromIsAvailable(): void;
  unsubscribeFromIsTracking(): void;
  unsubscribeFromLocation(): void;
}

interface HyperTrackApi {
  /**
   * Adds a new geotag
   *
   * @param {Object} data - Geotad data JSON
   * @returns current location if success or LocationError if failure
   */
  addGeotag(
    data: Object
  ): HyperTrackResult<HyperTrackLocation, HyperTrackLocationError>;

  /**
   * Adds a new geotag with expected location
   *
   * @param {Object} data - Geotad data JSON
   * @param {Location} expectedLocation - Expected location
   * @returns location with deviation if success or LocationError if failure
   */
  addGeotagWithExpectedLocation(
    data: Object,
    expectedLocation: HyperTrackLocation
  ): HyperTrackResult<HyperTrackLocationWithDeviation, HyperTrackLocationError>;

  /**
   * Returns a string that is used to uniquely identify the device
   *
   * @returns {string} Device ID
   */
  getDeviceId(): string;

  /**
   * Returns a list of errors that blocks SDK from tracking
   *
   * @returns {HyperTrackError[]} List of errors
   */
  getErrors(): HyperTrackError[];

  /**
   * Reflects availability of the device for the Nearby search
   *
   * @returns true when is available or false when unavailable
   */
  getIsAvailable(): boolean;

  /**
   * Reflects the tracking intent for the device
   *
   * @returns {boolean} Whether the user's movement data is getting tracked or not.
   */
  getIsTracking(): boolean;

  /**
   * Reflects the current location of the user or an outage reason
   */
  getLocation(): HyperTrackResult<HyperTrackLocation, HyperTrackLocationError>;

  /**
   * Gets the metadata that is set for the device
   *
   * @returns {Object} Metadata JSON
   */
  getMetadata(): Object;

  /**
   * Gets the name that is set for the device
   *
   * @returns {string} Device name
   */
  getName(): string;

  /**
   * Checks the state of the background location permission.
   *
   * @returns {boolean} true if the permission is granted, false otherwise
   */
  isBackgroundLocationPermissionGranted(): boolean;

  /**
   * Checks the state of the location permission.
   *
   * @returns {boolean} true if the permission is granted, false otherwise
   */
  isLocationPermissionGranted(): boolean;

  /**
   * Checks the state of the location services.
   *
   * @returns {boolean} true if the location services are enabled, false otherwise
   */
  isLocationServicesEnabled(): boolean;

  /**
   * Checks the state of the notifications permission.
   *
   * @returns {boolean} true if the permission is granted, false otherwise
   */
  isNotificationsPermissionGranted(): boolean;

  /**
   * Requests one-time location update and returns the location once it is available, or error.
   *
   * Only one locate subscription can be active at a time. If you re-subscribe, the old EmitterSubscription
   * will be automaticaly removed.
   *
   * This method will start location tracking if called, and will stop it when the location is received or
   * the subscription is cancelled. If any other tracking intent is present (e.g. isAvailable is set to `true`),
   * the tracking will not be stopped.
   *
   * @param callback
   * @returns EmitterSubscription
   * @example
   * ```js
   * const subscription = HyperTrack.locate(location => {
   *  ...
   * })
   *
   * // to unsubscribe
   * subscription.remove()
   * ```
   */
  locate(
    callback: (
      location: HyperTrackResult<HyperTrackLocation, HyperTrackError[]>
    ) => void
  ): HyperTrackSubscription;

  /**
   * Opens the App settings screen
   */
  openAppSettings(): void;

  /**
   * Opens the Location Services settings screen
   */
  openLocationServicesSettings(): void;

  /**
   * Requests the background location permission
   */
  requestBackgroundLocationPermission(): void;

  /**
   * Requests the location permission
   */
  requestLocationPermission(): void;

  /**
   * Requests the notifications permission
   */
  requestNotificationsPermission(): void;

  /**
   * Sets the availability of the device for the Nearby search
   *
   * @param availability true when is available or false when unavailable
   */
  setIsAvailable(isAvailable: boolean): void;

  /**
   * Sets the tracking intent for the device
   *
   * @param {boolean} isTracking
   */
  setIsTracking(isTracking: boolean): void;

  /**
   * Sets the metadata for the device
   *
   * @param {Object} data - Metadata JSON
   */
  setMetadata(metadata: Object): void;

  /**
   * Sets the name for the device
   *
   * @param {string} name
   */
  setName(name: string): void;

  /**
   * Subscribe to tracking errors.
   * Only one errors subscription can be active at a time. If you re-subscribe, the old subscription will be automaticaly removed.
   *
   * @param listener
   * @returns HyperTrackSubscription
   * @example
   * ```js
   * const subscription = HyperTrack.subscribeToErrors(errors => {
   *   errors.forEach(error => {
   *     // ... error
   *   })
   * })
   *
   * // later, to stop listening
   * subscription.cancel()
   * ```
   */
  subscribeToErrors(listener: (errors: HyperTrackError[]) => void): void;

  /**
   * Subscribe to availability changes.
   * Only one isAvailable subscription can be active at a time. If you re-subscribe, the old subscription will be automaticaly removed.
   *
   * @param listener
   * @returns HyperTrackSubscription
   * @example
   * ```js
   * const subscription = HyperTrack.subscribeToIsAvailable(isAvailable => {
   *   if (isAvailable) {
   *     // ... ready to go
   *   }
   * })
   *
   * // later, to stop listening
   * subscription.cancel()
   * ```
   */
  subscribeToIsAvailable(listener: (isAvailable: boolean) => void): void;

  /**
   * Subscribe to tracking intent changes.
   * Only one isTracking subscription can be active at a time. If you re-subscribe, the old subscription will be automaticaly removed.
   *
   * @param listener
   * @returns HyperTrackSubscription
   * @example
   * ```js
   * const subscription = HyperTrack.subscribeToIsTracking(isTracking => {
   *   if (isTracking) {
   *     // ... ready to go
   *   }
   * })
   *
   * // later, to stop listening
   * subscription.cancel()
   * ```
   */
  subscribeToIsTracking(listener: (isTracking: boolean) => void): void;

  /**
   * Subscribe to location changes.
   * Only one location subscription can be active at a time. If you re-subscribe, the old subscription will be automaticaly removed.
   *
   * @param listener
   * @returns HyperTrackSubscription
   * @example
   * ```js
   * const subscription = HyperTrack.subscribeToLocation(location => {
   *   ...
   * })
   *
   * // later, to stop listening
   * subscription.cancel()
   * ```
   */
  subscribeToLocation(
    listener: (
      location: HyperTrackResult<HyperTrackLocation, HyperTrackLocationError>
    ) => void
  ): void;
}

interface HyperTrackSubscription {
  cancel(): void;
}

/** @ignore */
interface HyperTrackEventReceiverApi {
  dispatchEvent(event: Object): void;
}

/** @ignore */
type HyperTrackEvent =
  | HyperTrackErrorsEvent
  | HyperTrackIsAvailableEvent
  | HyperTrackIsTrackingEvent
  | HyperTrackLocateEvent
  | HyperTrackLocationEvent;

/** @ignore */
type HyperTrackErrorsEvent = {
  name: typeof HYPERTRACK_EVENT_ERRORS;
  data: HyperTrackErrorsObject;
};

/** @ignore */
type HyperTrackIsAvailableEvent = {
  name: typeof HYPERTRACK_EVENT_IS_AVAILABLE;
  data: HyperTrackIsAvailable;
};

/** @ignore */
type HyperTrackIsTrackingEvent = {
  name: typeof HYPERTRACK_EVENT_IS_TRACKING;
  data: HyperTrackIsTracking;
};

/** @ignore */
type HyperTrackLocateEvent = {
  name: typeof HYPERTRACK_EVENT_LOCATE;
  data: HyperTrackResult<HyperTrackLocationInternal, HyperTrackErrorInternal[]>;
};

/** @ignore */
type HyperTrackLocationEvent = {
  name: typeof HYPERTRACK_EVENT_LOCATION;
  data: HyperTrackResult<
    HyperTrackLocationInternal,
    HyperTrackLocationErrorInternal
  >;
};

/** @ignore */
type HyperTrackErrorsObject = {
  errors: HyperTrackErrorInternal[];
};

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
let hyperTrackErrorsListener: ((errors: HyperTrackError[]) => void) | undefined;

/** @ignore */
let hyperTrackIsAvailableListener: ((isAvailable: boolean) => void) | undefined;

/** @ignore */
let hyperTrackIsTrackingListener: ((isTracking: boolean) => void) | undefined;

/** @ignore */
let hyperTrackLocationListener:
  | ((
      location: HyperTrackResult<HyperTrackLocation, HyperTrackLocationError>
    ) => void)
  | undefined;

/** @ignore */
let hyperTrackLocateListener:
  | ((
      location: HyperTrackResult<HyperTrackLocation, HyperTrackError[]>
    ) => void)
  | undefined;

/** @ignore */
let hyperTrackInstance: HyperTrackApi = {
  addGeotag(
    data: Object
  ): HyperTrackResult<HyperTrackLocation, HyperTrackLocationError> {
    if (!data) {
      throw new Error(
        "You should provide a JSON-compatible object as data param"
      );
    }
    return hyperTrackDeserializeLocationResponse(
      JSON.parse(
        HyperTrackWebViewInterface.addGeotag(
          JSON.stringify({
            data,
          } as HyperTrackGeotagData)
        )
      )
    );
  },

  addGeotagWithExpectedLocation(
    data: Object,
    expectedLocation: HyperTrackLocation
  ): HyperTrackResult<
    HyperTrackLocationWithDeviation,
    HyperTrackLocationError
  > {
    if (!data || !expectedLocation || !hyperTrackIsLocation(expectedLocation)) {
      throw new Error(
        "You should provide a JSON-compatible object as data param and expectedLocation should be a valid location object"
      );
    }
    return hyperTrackDeserializeLocationWithDeviationResponse(
      JSON.parse(
        HyperTrackWebViewInterface.addGeotagWithExpectedLocation(
          JSON.stringify({
            data,
            location: {
              type: "location",
              value: expectedLocation,
            } as HyperTrackLocationInternal,
          } as HyperTrackGeotagData)
        )
      )
    );
  },

  getDeviceId: function (): string {
    return JSON.parse(HyperTrackWebViewInterface.getDeviceId()).value;
  },

  getErrors: function (): HyperTrackError[] {
    return hyperTrackDeserializeHyperTrackErrors(
      JSON.parse(HyperTrackWebViewInterface.getErrors())
    );
  },

  getIsAvailable: function (): boolean {
    return JSON.parse(HyperTrackWebViewInterface.getIsAvailable()).value;
  },

  getIsTracking: function (): boolean {
    return JSON.parse(HyperTrackWebViewInterface.getIsTracking()).value;
  },

  getLocation: function (): HyperTrackResult<
    HyperTrackLocation,
    HyperTrackLocationError
  > {
    return hyperTrackDeserializeLocationResponse(
      JSON.parse(HyperTrackWebViewInterface.getLocation())
    );
  },

  getMetadata: function (): Object {
    return hyperTrackDeserializeMetadata(
      JSON.parse(HyperTrackWebViewInterface.getMetadata())
    );
  },

  getName: function (): string {
    return hyperTrackDeserializeName(
      JSON.parse(HyperTrackWebViewInterface.getName())
    );
  },

  isBackgroundLocationPermissionGranted: function (): boolean {
    let result = JSON.parse(
      HyperTrackWebViewInterface.isBackgroundLocationPermissionGranted()
    ) as HyperTrackIsBackgroundLocationPermissionGranted;
    if (result.type != "isBackgroundLocationPermissionGranted") {
      throw new Error(`Invalid result: ${JSON.stringify(result)}`);
    }
    return result.value;
  },

  isLocationPermissionGranted: function (): boolean {
    let result = JSON.parse(
      HyperTrackWebViewInterface.isLocationPermissionGranted()
    ) as HyperTrackIsLocationPermissionGranted;
    if (result.type != "isLocationPermissionGranted") {
      throw new Error(`Invalid result: ${JSON.stringify(result)}`);
    }
    return result.value;
  },

  isLocationServicesEnabled: function (): boolean {
    let result = JSON.parse(
      HyperTrackWebViewInterface.isLocationServicesEnabled()
    ) as HyperTrackIsLocationServicesEnabled;
    if (result.type != "isLocationServicesEnabled") {
      throw new Error(`Invalid result: ${JSON.stringify(result)}`);
    }
    return result.value;
  },

  isNotificationsPermissionGranted: function (): boolean {
    let result = JSON.parse(
      HyperTrackWebViewInterface.isNotificationsPermissionGranted()
    ) as HyperTrackIsNotificationsPermissionGranted;
    if (result.type != "isNotificationsPermissionGranted") {
      throw new Error(`Invalid result: ${JSON.stringify(result)}`);
    }
    return result.value;
  },

  locate: function (
    callback: (
      location: HyperTrackResult<HyperTrackLocation, HyperTrackError[]>
    ) => void
  ): HyperTrackSubscription {
    hyperTrackLocateListener = callback;
    HyperTrackWebViewInterface.locate();
    return {
      cancel: () => {
        HyperTrackWebViewInterface.cancelLocate();
        hyperTrackLocateListener = undefined;
      },
    };
  },

  openAppSettings: function (): void {
    HyperTrackWebViewInterface.openAppSettings();
  },

  openLocationServicesSettings: function (): void {
    HyperTrackWebViewInterface.openLocationServicesSettings();
  },

  requestBackgroundLocationPermission: function (): void {
    HyperTrackWebViewInterface.requestBackgroundLocationPermission();
  },

  requestLocationPermission: function (): void {
    HyperTrackWebViewInterface.requestLocationPermission();
  },

  requestNotificationsPermission: function (): void {
    HyperTrackWebViewInterface.requestNotificationsPermission();
  },

  setIsAvailable: function (isAvailable: boolean): void {
    if (typeof isAvailable !== "boolean") {
      throw new Error("isAvailable should be a boolean value");
    }
    HyperTrackWebViewInterface.setIsAvailable(
      JSON.stringify({
        type: "isAvailable",
        value: isAvailable,
      } as HyperTrackIsAvailable)
    );
  },

  setIsTracking: function (isTracking: boolean): void {
    if (typeof isTracking !== "boolean") {
      throw new Error("isTracking should be a boolean value");
    }
    HyperTrackWebViewInterface.setIsTracking(
      JSON.stringify({
        type: "isTracking",
        value: isTracking,
      } as HyperTrackIsTracking)
    );
  },

  setMetadata: function (metadata: Object): void {
    if (!metadata) {
      throw new Error(
        "You should provide a JSON-compatible object as metadata param"
      );
    }
    HyperTrackWebViewInterface.setMetadata(
      JSON.stringify({
        type: "metadata",
        value: metadata,
      } as HyperTrackMetadata)
    );
  },

  setName: function (name: string): void {
    if (name != undefined && typeof name !== "string") {
      throw new Error("You should provide a string as name param");
    }
    HyperTrackWebViewInterface.setName(
      JSON.stringify({
        type: "name",
        value: name,
      } as HyperTrackName)
    );
  },

  subscribeToErrors: function (
    listener: (errors: HyperTrackError[]) => void
  ): HyperTrackSubscription {
    hyperTrackErrorsListener = listener;
    HyperTrackWebViewInterface.subscribeToErrors();
    return {
      cancel: () => {
        hyperTrackErrorsListener = undefined;
        HyperTrackWebViewInterface.unsubscribeFromErrors();
      },
    };
  },

  subscribeToIsAvailable: function (
    listener: (isAvailable: boolean) => void
  ): HyperTrackSubscription {
    hyperTrackIsAvailableListener = listener;
    HyperTrackWebViewInterface.subscribeToIsAvailable();
    return {
      cancel: () => {
        hyperTrackIsAvailableListener = undefined;
        HyperTrackWebViewInterface.unsubscribeFromIsAvailable();
      },
    };
  },

  subscribeToIsTracking: function (
    listener: (isTracking: boolean) => void
  ): HyperTrackSubscription {
    hyperTrackIsTrackingListener = listener;
    HyperTrackWebViewInterface.subscribeToIsTracking();
    return {
      cancel: () => {
        hyperTrackIsTrackingListener = undefined;
        HyperTrackWebViewInterface.unsubscribeFromIsTracking();
      },
    };
  },

  subscribeToLocation: function (
    listener: (
      location: HyperTrackResult<HyperTrackLocation, HyperTrackLocationError>
    ) => void
  ): HyperTrackSubscription {
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
let hyperTrackEventReceiver: HyperTrackEventReceiverApi = {
  dispatchEvent: function (event: HyperTrackEvent): void {
    switch (event.name) {
      case HYPERTRACK_EVENT_ERRORS:
        if (hyperTrackErrorsListener) {
          hyperTrackErrorsListener(
            hyperTrackDeserializeHyperTrackErrors(
              (event.data as HyperTrackErrorsObject).errors
            )
          );
        }
        break;
      case HYPERTRACK_EVENT_IS_AVAILABLE:
        if (hyperTrackIsAvailableListener) {
          hyperTrackIsAvailableListener(
            (event.data as HyperTrackIsAvailable).value
          );
        }
        break;
      case HYPERTRACK_EVENT_IS_TRACKING:
        if (hyperTrackIsTrackingListener) {
          hyperTrackIsTrackingListener(
            (event.data as HyperTrackIsTracking).value
          );
        }
        break;
      case HYPERTRACK_EVENT_LOCATE:
        if (hyperTrackLocateListener) {
          hyperTrackLocateListener(
            hyperTrackDeserializeLocateResponse(event.data)
          );
        }
        break;
      case HYPERTRACK_EVENT_LOCATION:
        if (hyperTrackLocationListener) {
          hyperTrackLocationListener(
            hyperTrackDeserializeLocationResponse(event.data)
          );
        }
        break;
    }
  },
};

/** @ignore */
const HyperTrack = (function () {
  return hyperTrackInstance;
})();

/** @ignore */
const HyperTrackEventReceiver = (function () {
  return hyperTrackEventReceiver;
})();

/** @ignore */
function hyperTrackDeserializeHyperTrackErrors(
  errors: HyperTrackErrorInternal[]
): HyperTrackError[] {
  let res = errors.map((error: HyperTrackErrorInternal) => {
    if (error.type != "error") {
      throw new Error("Invalid error type");
    }
    return Object.keys(HyperTrackError).find(
      (key) =>
        HyperTrackError[key as keyof typeof HyperTrackError] === error.value
    ) as HyperTrackError;
  });
  return res;
}

/** @ignore */
function hyperTrackDeserializeLocateResponse(
  response: HyperTrackResult<
    HyperTrackLocationInternal,
    HyperTrackErrorInternal[]
  >
): HyperTrackResult<HyperTrackLocation, HyperTrackError[]> {
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
function hyperTrackDeserializeLocationError(
  locationError: HyperTrackLocationErrorInternal
): HyperTrackLocationError {
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
function hyperTrackDeserializeLocationResponse(
  response: HyperTrackResult<
    HyperTrackLocationInternal,
    HyperTrackLocationErrorInternal
  >
): HyperTrackResult<HyperTrackLocation, HyperTrackLocationError> {
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
function hyperTrackDeserializeLocationWithDeviationResponse(
  response: HyperTrackResult<
    HyperTrackLocationWithDeviationInternal,
    HyperTrackLocationErrorInternal
  >
): HyperTrackResult<HyperTrackLocationWithDeviation, HyperTrackLocationError> {
  switch (response.type) {
    case "success":
      const locationWithDeviationInternal: HyperTrackLocationWithDeviationInternal =
        response.value;
      const locationInternal: HyperTrackLocationInternal =
        locationWithDeviationInternal.value.location;

      return {
        type: "success",
        value: {
          location: locationInternal.value,
          deviation: locationWithDeviationInternal.value.deviation,
        } as HyperTrackLocationWithDeviation,
      };
    case "failure":
      return {
        type: "failure",
        value: hyperTrackDeserializeLocationError(response.value),
      };
  }
}

/** @ignore */
function hyperTrackDeserializeMetadata(metadata: HyperTrackMetadata): Object {
  if (metadata.type != "metadata") {
    throw new Error(`Invalid metadata: ${JSON.stringify(metadata)}`);
  }
  return metadata.value;
}

/** @ignore */
function hyperTrackDeserializeName(name: HyperTrackName): string {
  if (name.type != "name") {
    throw new Error(`Invalid name: ${JSON.stringify(name)}`);
  }
  return name.value;
}

/** @ignore */
function hyperTrackIsLocation(
  obj: HyperTrackLocation
): obj is HyperTrackLocation {
  return (
    "latitude" in obj &&
    typeof obj.latitude == "number" &&
    "longitude" in obj &&
    typeof obj.longitude == "number"
  );
}

// Internal

/** @ignore */
type HyperTrackDeviceId = {
  type: "deviceID";
  value: string;
};

/** @ignore */
type HyperTrackGeotagData = {
  data: Object;
  expectedLocation?: HyperTrackLocationInternal;
};

/** @ignore */
type HyperTrackErrorInternal = {
  type: "error";
  value: string;
};

/** @ignore */
type HyperTrackIsAvailable = {
  type: "isAvailable";
  value: boolean;
};

/** @ignore */
type HyperTrackIsTracking = {
  type: "isTracking";
  value: boolean;
};

/** @ignore */
type HyperTrackNotRunning = {
  type: "notRunning";
};

/** @ignore */
type HyperTrackStarting = {
  type: "starting";
};

/** @ignore */
type HyperTrackErrorsInternal = {
  type: "errors";
  value: HyperTrackErrorInternal[];
};

/** @ignore */
type HyperTrackLocationErrorInternal =
  | HyperTrackNotRunning
  | HyperTrackStarting
  | HyperTrackErrorsInternal;

/** @ignore */
type HyperTrackLocationInternal = {
  type: "location";
  value: {
    latitude: number;
    longitude: number;
  };
};

/** @ignore */
type HyperTrackLocationWithDeviationInternal = {
  type: "locationWithDeviation";
  value: {
    location: HyperTrackLocationInternal;
    deviation: number;
  };
};

/** @ignore */
type HyperTrackMetadata = {
  type: "metadata";
  value: Object;
};

/** @ignore */
type HyperTrackName = {
  type: "name";
  value: string;
};

/** @ignore */
type HyperTrackIsBackgroundLocationPermissionGranted = {
  type: "isBackgroundLocationPermissionGranted";
  value: boolean;
};

/** @ignore */
type HyperTrackIsLocationPermissionGranted = {
  type: "isLocationPermissionGranted";
  value: boolean;
};

/** @ignore */
type HyperTrackIsLocationServicesEnabled = {
  type: "isLocationServicesEnabled";
  value: boolean;
};

/** @ignore */
type HyperTrackIsNotificationsPermissionGranted = {
  type: "isNotificationsPermissionGranted";
  value: boolean;
};

// External
// enum naming convention is ignored to make datatype sync
// across platforms easier
enum HyperTrackError {
  /**
   * The SDK was remotely blocked from running.
   */
  blockedFromRunning = "blockedFromRunning",

  /**
   * The publishable key is invalid.
   */
  invalidPublishableKey = "invalidPublishableKey",

  /**
   * The user enabled mock location app while mocking locations is prohibited.
   */
  locationMocked = "location.mocked",

  /**
   * The user disabled location services systemwide.
   */
  locationServicesDisabled = "location.servicesDisabled",

  /**
   * [Android only] The device doesn't have location services.
   */
  locationServicesUnavailable = "location.servicesUnavailable",

  /**
   * GPS satellites are not in view.
   */
  locationSignalLost = "location.signalLost",

  /**
   * [Android only] The SDK wasn't able to start tracking because of the limitations imposed by the OS.
   * The exempt from background execution conditions weren't met.
   * {@link https://developer.android.com/guide/components/foreground-services#background-start-restriction-exemptions}
   */
  noExemptionFromBackgroundStartRestrictions = "noExemptionFromBackgroundStartRestrictions",

  /**
   * The user denied location permissions.
   */
  permissionsLocationDenied = "permissions.location.denied",

  /**
   * Can’t start tracking in background with When In Use location permissions.
   * SDK will automatically start tracking when app will return to foreground.
   */
  permissionsLocationInsufficientForBackground = "permissions.location.insufficientForBackground",

  /**
   * [iOS only] The user has not chosen whether the app can use location services.
   */
  permissionsLocationNotDetermined = "permissions.location.notDetermined",

  /**
   * [iOS only] The app is in Provisional Always authorization state, which stops sending locations when app is in background.
   */
  permissionsLocationProvisional = "permissions.location.provisional",

  /**
   * The user didn't grant precise location permissions or downgraded permissions to imprecise.
   */
  permissionsLocationReducedAccuracy = "permissions.location.reducedAccuracy",

  /**
   * [iOS only] The app is not authorized to use location services.
   */
  permissionsLocationRestricted = "permissions.location.restricted",

  /**
   * [Android only] The user denied notification permissions needed to display a persistent notification
   * needed for foreground location tracking.
   */
  permissionsNotificationsDenied = "permissions.notifications.denied",
}

type HyperTrackLocation = {
  latitude: number;
  longitude: number;
};

type HyperTrackErrors = {
  type: "errors";
  value: HyperTrackError[];
};

type HyperTrackLocationError =
  | HyperTrackNotRunning
  | HyperTrackStarting
  | HyperTrackErrors;

type HyperTrackLocationWithDeviation = {
  location: HyperTrackLocation;
  deviation: number;
};

type HyperTrackSuccess<S> = {
  type: "success";
  value: S;
};

type HyperTrackFailure<F> = {
  type: "failure";
  value: F;
};

type HyperTrackResult<S, F> = HyperTrackSuccess<S> | HyperTrackFailure<F>;
