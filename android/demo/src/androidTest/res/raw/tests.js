try {
  function testCase(id, call, check) {
    try {
      let result = call();
      if (check != undefined) {
        if (result === undefined) {
          throw Error(
            JSON.stringify({
              id: id,
              type: "failure",
              message: "result is undefined",
            })
          );
        } else if (check(result) !== true) {
          throw Error(
            JSON.stringify({
              id: id,
              type: "failure",
              message: JSON.stringify({
                check: check.toString(),
                error: "Invalid result",
                result: result,
              }),
            })
          );
        }
      }
    } catch (e) {
      throw Error(
        JSON.stringify({ id: id, type: "failure", message: e.message })
      );
    }
  }

  function isValidUUID(uuid) {
    const regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return regex.test(uuid);
  }

  let metadata = {
    metadata_key: Math.random(),
  };
  let name = `Test Name ${Math.random()}`;
  let geotagData = {
    key: Math.random(),
  };
  let expectedLocation = {
    latitude: 0.0,
    longitude: 0.0,
  };

  testCase("setMetadata", function () {
    HyperTrack.setMetadata(metadata);
  });

  testCase("setName", function () {
    HyperTrack.setName(name);
  });

  testCase("getDeviceId", HyperTrack.getDeviceId, function (result) {
    return isValidUUID(result);
  });

  testCase("getIsTracking1", HyperTrack.getIsTracking, function (result) {
    return result === false;
  });

  testCase("getIsAvailable1", HyperTrack.getIsAvailable, function (result) {
    return result === false;
  });

  testCase(
    "addGeotagNotRunning",
    function () {
      return HyperTrack.addGeotag(geotagData);
    },
    function (result) {
      return (
        JSON.stringify(result) ===
        JSON.stringify({
          type: "failure",
          value: {
            type: "notRunning",
          },
        })
      );
    }
  );

  testCase(
    "addGeotagWithExpectedLocationNotRunning",
    function () {
      return HyperTrack.addGeotagWithExpectedLocation(
        geotagData,
        expectedLocation
      );
    },
    function (result) {
      return (
        JSON.stringify(result) ===
        JSON.stringify({
          type: "failure",
          value: {
            type: "notRunning",
          },
        })
      );
    }
  );

  testCase("getErrorsNotRunning", HyperTrack.getErrors, function (result) {
    return (
      JSON.stringify(result) === JSON.stringify(["permissionsLocationDenied"])
    );
  });

  testCase("getLocationNotRunning", HyperTrack.getLocation, function (result) {
    return (
      JSON.stringify(result) ===
      JSON.stringify({
        type: "failure",
        value: {
          type: "notRunning",
        },
      })
    );
  });

  testCase("getMetadata", HyperTrack.getMetadata, function (result) {
    return JSON.stringify(result) === JSON.stringify(metadata);
  });

  testCase("getName", HyperTrack.getName, function (result) {
    return result === name;
  });

  testCase("setIsAvailable", function () {
    HyperTrack.setIsAvailable(true);
  });

  testCase("getIsAvailable2", HyperTrack.getIsAvailable, function (result) {
    return result === true;
  });

  testCase("getIsTracking2", HyperTrack.getIsTracking, function (result) {
    return result === false;
  });

  testCase("setIsTracking", function () {
    HyperTrack.setIsTracking(true);
  });

  testCase("getIsAvailable3", HyperTrack.getIsAvailable, function (result) {
    return result === true;
  });

  testCase("getIsTracking3", HyperTrack.getIsTracking, function (result) {
    return result === true;
  });

  HyperTrack.setIsAvailable(false);

  testCase("getIsAvailable4", HyperTrack.getIsAvailable, function (result) {
    return result === false;
  });

  testCase("getIsTracking4", HyperTrack.getIsTracking, function (result) {
    return result === true;
  });

  testCase(
    "addGeotagOutage",
    function () {
      return HyperTrack.addGeotag(geotagData);
    },
    function (result) {
      return (
        JSON.stringify(result) ===
        JSON.stringify({
          type: "failure",
          value: {
            type: "errors",
            value: ["permissionsLocationDenied"],
          },
        })
      );
    }
  );

  testCase(
    "addGeotagWithExpectedLocationOutage",
    function () {
      return HyperTrack.addGeotagWithExpectedLocation(
        geotagData,
        expectedLocation
      );
    },
    function (result) {
      return (
        JSON.stringify(result) ===
        JSON.stringify({
          type: "failure",
          value: {
            type: "errors",
            value: ["permissionsLocationDenied"],
          },
        })
      );
    }
  );

  testCase("getErrorsOutage", HyperTrack.getErrors, function (result) {
    return (
      JSON.stringify(result) === JSON.stringify(["permissionsLocationDenied"])
    );
  });

  testCase("getLocationOutage", HyperTrack.getLocation, function (result) {
    return (
      JSON.stringify(result) ===
      JSON.stringify({
        type: "failure",
        value: {
          type: "errors",
          value: ["permissionsLocationDenied"],
        },
      })
    );
  });

  TestInterface.callbackCall(JSON.stringify({ type: "success" }));
} catch (e) {
  TestInterface.callbackCall(
    JSON.stringify({ type: "failure", message: e.message })
  );
}
