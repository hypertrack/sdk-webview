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
        return null;
    }

    @JavascriptInterface
    public String getDeviceID() {
        return null;
    }

    @JavascriptInterface
    public String getErrors() {
        return null;
    }

    @JavascriptInterface
    public String getIsAvailable() {
        return null;
    }

    @JavascriptInterface
    public String getIsTracking() {
        return null;
    }

    @JavascriptInterface
    public String getLocation() {
        return null;
    }

    @JavascriptInterface
    public String getMetadata() {
        return null;
    }

    @JavascriptInterface
    public String getName() {
        return null;
    }

    @JavascriptInterface
    public String setIsAvailable() {
        return null;
    }

    @JavascriptInterface
    public String setIsTracking() {
        return null;
    }

    @JavascriptInterface
    public String setMetadata() {
        return null;
    }

    @JavascriptInterface
    public String setName() {
        return null;
    }

}
