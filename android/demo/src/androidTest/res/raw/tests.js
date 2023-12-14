try {
  function testCaseTs(id, call, check) {
    try {
      let result = call();
      console.log(check(result));
      console.log(check(result) !== true);
      if (check != undefined && check(result) !== true) {
        throw Error(
          JSON.stringify({ id: id, type: "failure", message: result })
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

  testCaseTs("getDeviceIdTs", HyperTrackTs.getDeviceId, function (result) {
    return isValidUUID(result);
  });

  TestInterface.callbackCall(JSON.stringify({ type: "success" }));
} catch (e) {
  TestInterface.callbackCall(
    JSON.stringify({ type: "failure", message: e.message })
  );
}
