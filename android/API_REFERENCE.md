# API documentation

## HyperTrack object

### addGeotag()

Adds a geotag.

```javascript
HyperTrack.addGeotag(
  JSON.stringify({
    test_object: {
      test_key1: "test_value1",
    },
  })
);
```

#### Parameters

| Name       | Type        | Description |
| ---------- | ----------- | ----------- |
| geotagData | JSON String | Geotag data |

#### Returns

JSON String of result object:
[Result](#resultsuccess-failure)<[Result](#resultsuccess-failure)<[Location](#location), [LocationError](#locationerror)>, [JsError](#jserror)>

Example responses:

```JSON
{
  "type": "success",
  "value": {
    "type": "success",
    "value": {
      "latitude": 37.33182,
      "longitude": -122.03118
    }
  }
}
```

```JSON
{
  "type": "failure",
  "value": {
    "error": "<invalid geotagData value error>"
  }
}
```

### addGeotagWithExpectedLocation()

Adds a geotag with expected location.

```javascript
HyperTrack.addGeotagWithExpectedLocation(
  JSON.stringify({
    test_object: {
      test_key1: "test_value1",
    },
  }),
  JSON.stringify({
    latitude: 37.33182,
    longitude: -122.03118,
  })
);
```

#### Parameters

| Name             | Type        | Description                                         |
| ---------------- | ----------- | --------------------------------------------------- |
| geotagData       | JSON String | Geotag data                                         |
| expectedLocation | JSON String | Expected location as [Location](#location-1) object |

#### Returns

JSON String of result object:
[Result](#resultsuccess-failure)<[Result](#resultsuccess-failure)<[LocationWithDeviation](#locationwithdeviation), [LocationError](#locationerror)>, [JsError](#jserror)>

### askForLocationPermission()

Asks for location permission (`ACCESS_FINE_LOCATION`).

### askForBackgroundLocationPermission()

Asks for background location permission (`ACCESS_BACKGROUND_LOCATION`).

### askForNotificationsPermission()

Asks for notifications permission (`POST_NOTIFICATIONS`).

### getDeviceId()

Returns the device ID.

```javascript
HyperTrack.getDeviceId();
```

#### Returns

Device ID String

### setIsTracking(isTracking: Boolean)

Starts or stops tracking.

```javascript
HyperTrack.setIsTracking(true);
```

### setMetadata(metadataObjectString: JSON String)

Sets metadata.

```javascript
HyperTrack.setMetadata(
  JSON.stringify({
    test_object: {
      test_key1: "test_value1",
    },
  })
);
```

#### Parameters

| Name                 | Type        | Description     |
| -------------------- | ----------- | --------------- |
| metadataObjectString | JSON String | Metadata object |

#### Returns

JSON String of result object:
[Result](#resultsuccess-failure)<`Void`>

Example responses:

```JSON
{
  "type": "success",
}
```

```JSON
{
  "type": "failure",
  "value": {
    "error": "<invalid metadataObjectString value error>"
  }
}
```

### setName(name: String)

Sets name.

```javascript
HyperTrack.setName("John Doe");
```

## Data types

### HyperTrackError

```javascript
enum HyperTrackError {
  /**
   * The SDK was remotely blocked from running.
   */
  blockedFromRunning = 'blockedFromRunning',

  /**
   * The publishable key is invalid.
   */
  invalidPublishableKey = 'invalidPublishableKey',

  /**
   * The user enabled mock location app while mocking locations is prohibited.
   */
  locationMocked = 'location.mocked',

  /**
   * The user disabled location services systemwide.
   */
  locationServicesDisabled = 'location.servicesDisabled',

  /**
   * [Android only] The device doesn't have location services.
   */
  locationServicesUnavailable = 'location.servicesUnavailable',

  /**
   * GPS satellites are not in view.
   */
  locationSignalLost = 'location.signalLost',

  /**
   * [Android only] The SDK wasn't able to start tracking because of the limitations imposed by the OS.
   * The exempt from background execution conditions weren't met.
   * {@link https://developer.android.com/guide/components/foreground-services#background-start-restriction-exemptions}
   */
  noExemptionFromBackgroundStartRestrictions = 'noExemptionFromBackgroundStartRestrictions',

  /**
   * The user denied location permissions.
   */
  permissionsLocationDenied = 'permissions.location.denied',

  /**
   * Can’t start tracking in background with When In Use location permissions.
   * SDK will automatically start tracking when app will return to foreground.
   */
  permissionsLocationInsufficientForBackground = 'permissions.location.insufficientForBackground',

  /**
   * [iOS only] The user has not chosen whether the app can use location services.
   */
  permissionsLocationNotDetermined = 'permissions.location.notDetermined',

  /**
   * [iOS only] The app is in Provisional Always authorization state, which stops sending locations when app is in background.
   */
  permissionsLocationProvisional = 'permissions.location.provisional',

  /**
   * The user didn't grant precise location permissions or downgraded permissions to imprecise.
   */
  permissionsLocationReducedAccuracy = 'permissions.location.reducedAccuracy',

  /**
   * [iOS only] The app is not authorized to use location services.
   */
  permissionsLocationRestricted = 'permissions.location.restricted',

  /**
   * [Android only] The user denied notification permissions needed to display a persistent notification
   * needed for foreground location tracking.
   */
  permissionsNotificationsDenied = 'permissions.notifications.denied',
}
```

### JsError

```javascript
{
    "error": String,
}
```

### Location

```javascript
{
    "latitude": Double,
    "longitude": Double,
}
```

### Location

```
{
  "latitude": Double,
  "longitude": Double,
}
```

### LocationError

- Tracking is not started (adding geotags is not possible)

```
{
  "type": "notRunning
}
```

- SDK is not initialized yet (no location data to add geotag)

```
{
    "type": "starting
}
```

- There was an outage while getting the location data

```
{
    "type": "hyperTrackError",
    "value": HyperTrackError
}
```

### LocationWithDeviation

```javascript
{
    "location": Location,
    "deviation": Double,
}
```

### Result<Success, Failure>

```javascript
{
    "type": "success",
    "value": Success,
}
```

```javascript
{
    "type": "failure",
    "value": Failure,
}
```
