"use strict";
let instance = {
    getDeviceId: function () {
        return HyperTrackWebViewInterface.getDeviceId();
    },
};
const HyperTrackTs = (function () {
    return instance;
})();
