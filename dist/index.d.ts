export { HyperTrack };
interface HyperTrackApi {
    /**
     * Adds a new geotag
     *
     * @param {Object} data - Geotad data JSON
     * @returns current location if success or LocationError if failure
     */
    addGeotag(data: Object): HyperTrackResult<HyperTrackLocation, HyperTrackLocationError>;
    /**
     * Adds a new geotag with expected location
     *
     * @param {Object} data - Geotad data JSON
     * @param {Location} expectedLocation - Expected location
     * @returns location with deviation if success or LocationError if failure
     */
    addGeotagWithExpectedLocation(data: Object, expectedLocation: HyperTrackLocation): HyperTrackResult<HyperTrackLocationWithDeviation, HyperTrackLocationError>;
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
    locate(callback: (location: HyperTrackResult<HyperTrackLocation, HyperTrackError[]>) => void): HyperTrackSubscription;
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
    subscribeToLocation(listener: (location: HyperTrackResult<HyperTrackLocation, HyperTrackLocationError>) => void): void;
}
interface HyperTrackSubscription {
    cancel(): void;
}
/** @ignore */
declare const HyperTrack: HyperTrackApi;
/** @ignore */
type HyperTrackNotRunning = {
    type: "notRunning";
};
/** @ignore */
type HyperTrackStarting = {
    type: "starting";
};
declare enum HyperTrackError {
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
    permissionsNotificationsDenied = "permissions.notifications.denied"
}
type HyperTrackLocation = {
    latitude: number;
    longitude: number;
};
type HyperTrackErrors = {
    type: "errors";
    value: HyperTrackError[];
};
type HyperTrackLocationError = HyperTrackNotRunning | HyperTrackStarting | HyperTrackErrors;
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
