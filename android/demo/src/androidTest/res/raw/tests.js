try {
  function testCase(id, call, check) {
    try {
      let result = call();
      if (result === undefined) {
        throw Error(
          JSON.stringify({
            id: id,
            type: "failure",
            message: "result is undefined",
          })
        );
      }
      console.log(JSON.stringify(result));
      if (check != undefined && check(result) !== true) {
        throw Error(
          JSON.stringify({
            id: id,
            type: "failure",
            message: JSON.stringify(result),
          })
        );
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

  testCase("getDeviceId", HyperTrack.getDeviceId, function (result) {
    return isValidUUID(result);
  });

  TestInterface.callbackCall(JSON.stringify({ type: "success" }));
} catch (e) {
  TestInterface.callbackCall(
    JSON.stringify({ type: "failure", message: e.message })
  );
}
