declare var HyperTrackWebViewInterface: any;

let instance = {
  getDeviceId: function (): string {
    return HyperTrackWebViewInterface.getDeviceId();
  },
};

const HyperTrackTs = (function () {
  return instance;
})();
