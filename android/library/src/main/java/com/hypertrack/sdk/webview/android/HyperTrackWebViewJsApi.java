package com.hypertrack.sdk.webview.android;

import android.webkit.JavascriptInterface;

public class HyperTrackWebViewJsApi {

    public static final String API_NAME = "HyperTrack";

    @JavascriptInterface
    public String addGeotag(String dataJsonString) {
        return WebViewInterfaceWrapper.INSTANCE.addGeotag(dataJsonString);
    }

    @JavascriptInterface
    public String addGeotagWithExpectedLocation(String dataJsonString, String expectedLocationJsonString) {
        return WebViewInterfaceWrapper.INSTANCE.addGeotagWithExpectedLocation(
                dataJsonString,
                expectedLocationJsonString
        );
    }

    @JavascriptInterface
    public String getDeviceId() {
        return WebViewInterfaceWrapper.INSTANCE.getDeviceId();
    }

    @JavascriptInterface
    public String getErrors() {
        return WebViewInterfaceWrapper.INSTANCE.getErrors();
    }

    @JavascriptInterface
    public String getLocation() {
        return WebViewInterfaceWrapper.INSTANCE.getLocation();
    }

    @JavascriptInterface
    public void setIsTracking(boolean isTracking) {
        WebViewInterfaceWrapper.INSTANCE.setIsTracking(isTracking);
    }

    @JavascriptInterface
    public String setMetadata(String metadataString) {
        return WebViewInterfaceWrapper.INSTANCE.setMetadata(metadataString);
    }

    @JavascriptInterface
    public void setName(String name) {
        WebViewInterfaceWrapper.INSTANCE.setName(name);
    }

}
