declare var HyperTrackWebViewInterface: HyperTrackWebViewInterfaceApi;

interface HyperTrackWebViewInterfaceApi {
  addGeotag(geotagData: string): string;
  addGeotagWithExpectedLocation(geotagData: string): string;
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
  subscribeToErrors(): void;
  subscribeToIsAvailable(): void;
  subscribeToIsTracking(): void;
  subscribeToLocation(): void;
  unsubscribeFromErrors(): void;
  unsubscribeFromIsAvailable(): void;
  unsubscribeFromIsTracking(): void;
  unsubscribeFromLocation(): void;
}

interface HyperTrackApi {
  addGeotag(data: Object): Result<HyperTrackLocation, LocationError>;
  addGeotagWithExpectedLocation(
    data: Object,
    expectedLocation: HyperTrackLocation
  ): Result<LocationWithDeviation, LocationError>;
  getDeviceId(): string;
  getErrors(): HyperTrackError[];
  getIsAvailable(): boolean;
  getIsTracking(): boolean;
  getLocation(): Result<HyperTrackLocation, LocationError>;
  getMetadata(): Object;
  getName(): string;
  locate(
    callback: (location: Result<HyperTrackLocation, HyperTrackError[]>) => void
  ): Subscription;
  openAppSettings(): void;
  requestBackgroundLocationPermission(): void;
  requestLocationPermission(): void;
  requestNotificationsPermission(): void;
  setIsAvailable(isAvailable: boolean): void;
  setIsTracking(isTracking: boolean): void;
  setMetadata(metadata: Object): void;
  setName(name: string): void;
  subscribeToErrors(
    listener: (errors: HyperTrackError[]) => void
  ): Subscription;
  subscribeToIsAvailable(
    listener: (isAvailable: boolean) => void
  ): Subscription;
  subscribeToIsTracking(listener: (isTracking: boolean) => void): Subscription;
  subscribeToLocation(
    listener: (location: Result<HyperTrackLocation, LocationError>) => void
  ): Subscription;
}

interface Subscription {
  cancel(): void;
}

const EVENT_ERRORS = "errors";
const EVENT_IS_AVAILABLE = "isAvailable";
const EVENT_IS_TRACKING = "isTracking";
const EVENT_LOCATE = "locate";
const EVENT_LOCATION = "location";

let locateSubscription: Subscription | undefined;

let instance: HyperTrackApi = {
  addGeotag(data: Object): Result<HyperTrackLocation, LocationError> {
    return deserializeLocationResponse(
      JSON.parse(
        HyperTrackWebViewInterface.addGeotag(
          JSON.stringify({
            data,
          } as GeotagData)
        )
      )
    );
  },

  addGeotagWithExpectedLocation(
    data: Object,
    expectedLocation: HyperTrackLocation
  ): Result<LocationWithDeviation, LocationError> {
    return deserializeLocationWithDeviationResponse(
      JSON.parse(
        HyperTrackWebViewInterface.addGeotagWithExpectedLocation(
          JSON.stringify({
            data,
            location: {
              type: "location",
              value: expectedLocation,
            } as LocationInternal,
          } as GeotagData)
        )
      )
    );
  },

  getDeviceId: function (): string {
    return JSON.parse(HyperTrackWebViewInterface.getDeviceId()).value;
  },

  getErrors: function (): HyperTrackError[] {
    return deserializeHyperTrackErrors(
      JSON.parse(HyperTrackWebViewInterface.getErrors())
    );
  },

  getIsAvailable: function (): boolean {
    return JSON.parse(HyperTrackWebViewInterface.getIsAvailable()).value;
  },

  getIsTracking: function (): boolean {
    return JSON.parse(HyperTrackWebViewInterface.getIsTracking()).value;
  },

  getLocation: function (): Result<HyperTrackLocation, LocationError> {
    return deserializeLocationResponse(
      JSON.parse(HyperTrackWebViewInterface.getLocation())
    );
  },

  getMetadata: function (): Object {
    return deserializeMetadata(
      JSON.parse(HyperTrackWebViewInterface.getMetadata())
    );
  },

  getName: function (): string {
    return deserializeName(JSON.parse(HyperTrackWebViewInterface.getName()));
  },

  locate: function (): Subscription {
    return {
      cancel: () => {},
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
      } as IsAvailable)
    );
  },

  setIsTracking: function (isTracking: boolean): void {
    HyperTrackWebViewInterface.setIsTracking(
      JSON.stringify({
        type: "isTracking",
        value: isTracking,
      } as IsTracking)
    );
  },

  setMetadata: function (metadata: Object): void {
    HyperTrackWebViewInterface.setMetadata(
      JSON.stringify({
        type: "metadata",
        value: metadata,
      } as Metadata)
    );
  },

  setName: function (name: string): void {
    HyperTrackWebViewInterface.setName(
      JSON.stringify({
        type: "name",
        value: name,
      } as Name)
    );
  },

  subscribeToErrors: function (
    listener: (errors: HyperTrackError[]) => void
  ): Subscription {
    return {
      cancel: () => {},
    };
  },

  subscribeToIsAvailable: function (
    listener: (isAvailable: boolean) => void
  ): Subscription {
    return {
      cancel: () => {},
    };
  },

  subscribeToIsTracking: function (
    listener: (isTracking: boolean) => void
  ): Subscription {
    return {
      cancel: () => {},
    };
  },

  subscribeToLocation: function (
    listener: (location: Result<HyperTrackLocation, LocationError>) => void
  ): Subscription {
    return {
      cancel: () => {},
    };
  },
};

const HyperTrack = (function () {
  return instance;
})();

/** @ignore */
function deserializeHyperTrackErrors(
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
function deserializeLocateResponse(
  response: Result<LocationInternal, HyperTrackErrorInternal[]>
): Result<HyperTrackLocation, HyperTrackError[]> {
  switch (response.type) {
    case "success":
      return {
        type: "success",
        value: response.value.value,
      };
    case "failure":
      return {
        type: "failure",
        value: deserializeHyperTrackErrors(response.value),
      };
  }
}

/** @ignore */
function deserializeLocationError(
  locationError: LocationErrorInternal
): LocationError {
  switch (locationError.type) {
    case "notRunning":
    case "starting":
      return locationError;
    case "errors":
      return {
        type: "errors",
        value: deserializeHyperTrackErrors(locationError.value),
      };
  }
}

/** @ignore */
function deserializeLocationResponse(
  response: Result<LocationInternal, LocationErrorInternal>
): Result<HyperTrackLocation, LocationError> {
  switch (response.type) {
    case "success":
      return {
        type: "success",
        value: response.value.value,
      };
    case "failure":
      return {
        type: "failure",
        value: deserializeLocationError(response.value),
      };
  }
}

/** @ignore */
function deserializeLocationWithDeviationResponse(
  response: Result<LocationWithDeviationInternal, LocationErrorInternal>
): Result<LocationWithDeviation, LocationError> {
  switch (response.type) {
    case "success":
      const locationWithDeviationInternal: LocationWithDeviationInternal =
        response.value;
      const locationInternal: LocationInternal =
        locationWithDeviationInternal.value.location;

      return {
        type: "success",
        value: {
          location: locationInternal.value,
          deviation: locationWithDeviationInternal.value.deviation,
        } as LocationWithDeviation,
      };
    case "failure":
      return {
        type: "failure",
        value: deserializeLocationError(response.value),
      };
  }
}

/** @ignore */
function deserializeMetadata(metadata: Metadata): Object {
  if (metadata.type != "metadata") {
    throw new Error(`Invalid metadata: ${JSON.stringify(metadata)}`);
  }
  return metadata.value;
}

/** @ignore */
function deserializeName(name: Name): string {
  if (name.type != "name") {
    throw new Error(`Invalid name: ${JSON.stringify(name)}`);
  }
  return name.value;
}

/** @ignore */
function isLocation(obj: HyperTrackLocation): obj is HyperTrackLocation {
  return (
    "latitude" in obj &&
    typeof obj.latitude == "number" &&
    "longitude" in obj &&
    typeof obj.longitude == "number"
  );
}

// Internal

type DeviceId = {
  type: "deviceID";
  value: string;
};

type GeotagData = {
  data: Object;
  expectedLocation?: LocationInternal;
};

type HyperTrackErrorInternal = {
  type: "error";
  value: string;
};

type IsAvailable = {
  type: "isAvailable";
  value: boolean;
};

type IsTracking = {
  type: "isTracking";
  value: boolean;
};

type NotRunning = {
  type: "notRunning";
};
type Starting = {
  type: "starting";
};
type ErrorsInternal = {
  type: "errors";
  value: HyperTrackErrorInternal[];
};

type LocationErrorInternal = NotRunning | Starting | ErrorsInternal;

type LocationInternal = {
  type: "location";
  value: {
    latitude: number;
    longitude: number;
  };
};

type LocationWithDeviationInternal = {
  type: "locationWithDeviation";
  value: {
    location: LocationInternal;
    deviation: number;
  };
};

type Metadata = {
  type: "metadata";
  value: Object;
};

type Name = {
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

type Errors = {
  type: "errors";
  value: HyperTrackError[];
};

type LocationError = NotRunning | Starting | Errors;

type LocationWithDeviation = {
  location: HyperTrackLocation;
  deviation: number;
};

type Success<S> = {
  type: "success";
  value: S;
};

type Failure<F> = {
  type: "failure";
  value: F;
};

type Result<S, F> = Success<S> | Failure<F>;
