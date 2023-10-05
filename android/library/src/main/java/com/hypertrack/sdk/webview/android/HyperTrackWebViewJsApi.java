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
    public String getIsAvailable() {
        return WebViewInterfaceWrapper.INSTANCE.getIsAvailable();
    }

    @JavascriptInterface
    public String getIsTracking() {
        return WebViewInterfaceWrapper.INSTANCE.getIsTracking();
    }

    @JavascriptInterface
    public String getLocation() {
        return WebViewInterfaceWrapper.INSTANCE.getLocation();
    }

    @JavascriptInterface
    public String getMetadata() {
        return WebViewInterfaceWrapper.INSTANCE.getMetadata();
    }

    @JavascriptInterface
    public String getName() {
        return WebViewInterfaceWrapper.INSTANCE.getName();
    }

    @JavascriptInterface
    public String setIsAvailable() {
        return WebViewInterfaceWrapper.INSTANCE.setIsAvailable();
    }

    @JavascriptInterface
    public void setIsTracking(boolean isTracking) {
        WebViewInterfaceWrapper.INSTANCE.setIsTracking(isTracking);
    }

    @JavascriptInterface
    public String setMetadata() {
        return WebViewInterfaceWrapper.INSTANCE.setMetadata();
    }

    @JavascriptInterface
    public String setName() {
        return WebViewInterfaceWrapper.INSTANCE.setName();
    }

}
