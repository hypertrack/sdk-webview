package com.hypertrack.sdk.webview.android;

import android.app.Activity;
import android.content.Context;
import android.webkit.JavascriptInterface;

/**
 * This class is used to expose HyperTrack SDK methods to the WebView.
 * The client should set is as a JavaScript interface for the WebView.
 * It's written in Java instead of Kotlin for better compatibility with
 * non-Kotlin projects. The params and return values are JSON strings.
 */
public class HyperTrackWebViewJsApi {

    private final Activity activity;

    public HyperTrackWebViewJsApi(Activity activity) {
        this.activity = activity;
    }

    public static final String API_NAME = "HyperTrackWebViewInterface";

    @JavascriptInterface
    public String addGeotag(String geotagData) {
        return WebViewInterfaceWrapper.INSTANCE.addGeotag(geotagData);
    }

    @JavascriptInterface
    public String addGeotagWithExpectedLocation(String geotagData) {
        return WebViewInterfaceWrapper.INSTANCE.addGeotagWithExpectedLocation(geotagData);
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
    public void locate() {
        WebViewInterfaceWrapper.INSTANCE.locate();
    }

    @JavascriptInterface
    public void openAppSettings() {
        WebViewInterfaceWrapper.INSTANCE.openAppSettings(activity);
    }

    @JavascriptInterface
    public void requestLocationPermission() {
        WebViewInterfaceWrapper.INSTANCE.requestLocationPermission(activity);
    }

    @JavascriptInterface
    public void requestBackgroundLocationPermission() {
        WebViewInterfaceWrapper.INSTANCE.requestBackgroundLocationPermission(activity);
    }

    @JavascriptInterface
    public void requestNotificationsPermission() {
        WebViewInterfaceWrapper.INSTANCE.requestNotificationPermission(activity);
    }

    @JavascriptInterface
    public void setIsAvailable(String isAvailable) {
        WebViewInterfaceWrapper.INSTANCE.setIsAvailable(isAvailable);
    }

    @JavascriptInterface
    public void setIsTracking(String isTracking) {
        WebViewInterfaceWrapper.INSTANCE.setIsTracking(isTracking);
    }

    @JavascriptInterface
    public void setMetadata(String metadata) {
        WebViewInterfaceWrapper.INSTANCE.setMetadata(metadata);
    }

    @JavascriptInterface
    public void setName(String name) {
        WebViewInterfaceWrapper.INSTANCE.setName(name);
    }

}
