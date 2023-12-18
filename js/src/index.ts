declare var HyperTrackWebViewInterface: HyperTrackWebViewInterfaceApi;

// All names have HyperTrack prefix to avoid name collisions

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
  locate(): string;
  openAppSettings(): void;
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
  addGeotag(
    data: Object
  ): HyperTrackResult<HyperTrackLocation, HyperTrackLocationError>;
  addGeotagWithExpectedLocation(
    data: Object,
    expectedLocation: HyperTrackLocation
  ): HyperTrackResult<HyperTrackLocationWithDeviation, HyperTrackLocationError>;
  getDeviceId(): string;
  getErrors(): HyperTrackError[];
  getIsAvailable(): boolean;
  getIsTracking(): boolean;
  getLocation(): HyperTrackResult<HyperTrackLocation, HyperTrackLocationError>;
  getMetadata(): Object;
  getName(): string;
  locate(
    callback: (
      location: HyperTrackResult<HyperTrackLocation, HyperTrackError[]>
    ) => void
  ): HyperTrackSubscription;
  openAppSettings(): void;
  requestBackgroundLocationPermission(): void;
  requestLocationPermission(): void;
  requestNotificationsPermission(): void;
  setIsAvailable(isAvailable: boolean): void;
  setIsTracking(isTracking: boolean): void;
  setMetadata(metadata: Object): void;
  setName(name: string): void;
  subscribeToErrors(listener: (errors: HyperTrackError[]) => void): void;
  subscribeToIsAvailable(listener: (isAvailable: boolean) => void): void;
  subscribeToIsTracking(listener: (isTracking: boolean) => void): void;
  subscribeToLocation(
    listener: (
      location: HyperTrackResult<HyperTrackLocation, HyperTrackLocationError>
    ) => void
  ): void;
}

interface HyperTrackSubscription {
  cancel(): void;
}

interface HyperTrackEventReceiverApi {
  dispatchEvent(event: Object): void;
}

type HyperTrackEvent =
  | HyperTrackErrorsEvent
  | HyperTrackIsAvailableEvent
  | HyperTrackIsTrackingEvent
  | HyperTrackLocateEvent
  | HyperTrackLocationEvent;

type HyperTrackErrorsEvent = {
  name: typeof HYPERTRACK_EVENT_ERRORS;
  data: HyperTrackErrorsObject;
};

type HyperTrackIsAvailableEvent = {
  name: typeof HYPERTRACK_EVENT_IS_AVAILABLE;
  data: HyperTrackIsAvailable;
};

type HyperTrackIsTrackingEvent = {
  name: typeof HYPERTRACK_EVENT_IS_TRACKING;
  data: HyperTrackIsTracking;
};

type HyperTrackLocateEvent = {
  name: typeof HYPERTRACK_EVENT_LOCATE;
  data: HyperTrackResult<HyperTrackLocationInternal, HyperTrackErrorInternal[]>;
};

type HyperTrackLocationEvent = {
  name: typeof HYPERTRACK_EVENT_LOCATION;
  data: HyperTrackResult<
    HyperTrackLocationInternal,
    HyperTrackLocationErrorInternal
  >;
};

type HyperTrackErrorsObject = {
  errors: HyperTrackErrorInternal[];
};

const HYPERTRACK_EVENT_ERRORS = "errors";
const HYPERTRACK_EVENT_IS_AVAILABLE = "isAvailable";
const HYPERTRACK_EVENT_IS_TRACKING = "isTracking";
const HYPERTRACK_EVENT_LOCATE = "locate";
const HYPERTRACK_EVENT_LOCATION = "location";

let hyperTrackErrorsListener: ((errors: HyperTrackError[]) => void) | undefined;

let hyperTrackIsAvailableListener: ((isAvailable: boolean) => void) | undefined;

let hyperTrackIsTrackingListener: ((isTracking: boolean) => void) | undefined;

let hyperTrackLocationListener:
  | ((
      location: HyperTrackResult<HyperTrackLocation, HyperTrackLocationError>
    ) => void)
  | undefined;

let hyperTrackLocateListener:
  | ((
      location: HyperTrackResult<HyperTrackLocation, HyperTrackError[]>
    ) => void)
  | undefined;

let hyperTrackInstance: HyperTrackApi = {
  addGeotag(
    data: Object
  ): HyperTrackResult<HyperTrackLocation, HyperTrackLocationError> {
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
    HyperTrackWebViewInterface.setIsAvailable(
      JSON.stringify({
        type: "isAvailable",
        value: isAvailable,
      } as HyperTrackIsAvailable)
    );
  },

  setIsTracking: function (isTracking: boolean): void {
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

const HyperTrack = (function () {
  return hyperTrackInstance;
})();

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

type HyperTrackDeviceId = {
  type: "deviceID";
  value: string;
};

type HyperTrackGeotagData = {
  data: Object;
  expectedLocation?: HyperTrackLocationInternal;
};

type HyperTrackErrorInternal = {
  type: "error";
  value: string;
};

type HyperTrackIsAvailable = {
  type: "isAvailable";
  value: boolean;
};

type HyperTrackIsTracking = {
  type: "isTracking";
  value: boolean;
};

type HyperTrackNotRunning = {
  type: "notRunning";
};
type HyperTrackStarting = {
  type: "starting";
};
type HyperTrackErrorsInternal = {
  type: "errors";
  value: HyperTrackErrorInternal[];
};

type HyperTrackLocationErrorInternal =
  | HyperTrackNotRunning
  | HyperTrackStarting
  | HyperTrackErrorsInternal;

type HyperTrackLocationInternal = {
  type: "location";
  value: {
    latitude: number;
    longitude: number;
  };
};

type HyperTrackLocationWithDeviationInternal = {
  type: "locationWithDeviation";
  value: {
    location: HyperTrackLocationInternal;
    deviation: number;
  };
};

type HyperTrackMetadata = {
  type: "metadata";
  value: Object;
};

type HyperTrackName = {
  type: "name";
  value: string;
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
