async function testCaseAsync(id, call, check) {
  let hyperTrackFunction = call.bind(HyperTrack);
  try {
    let result = await hyperTrackFunction();
    console.log("result", result);
    if (check != undefined && check(result) !== true) {
      TestInterface.callbackCall(
        JSON.stringify({ id: id, type: "failure", message: result })
      );
    }
  } catch (e) {
    TestInterface.callbackCall(
      JSON.stringify({ id: id, type: "failure", message: e.message })
    );
  }
}

function isValidUUID(uuid) {
  const regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return regex.test(uuid);
}

testCaseAsync("getDeviceId", HyperTrack.getDeviceId, function () {
  return isValidUUID(HyperTrack.getDeviceId());
});

TestInterface.callbackCall(JSON.stringify({ type: "success" }));
