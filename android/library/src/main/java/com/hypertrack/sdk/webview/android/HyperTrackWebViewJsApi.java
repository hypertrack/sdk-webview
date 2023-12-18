package com.hypertrack.sdk.webview.android;

import android.app.Activity;
import android.content.Context;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;

/**
 * This class is used to expose HyperTrack SDK methods to the WebView.
 * The client should set is as a JavaScript interface for the WebView.
 * It's written in Java instead of Kotlin for better compatibility with
 * non-Kotlin projects. The params and return values are JSON strings.
 */
public class HyperTrackWebViewJsApi {

    private final WebViewInterfaceWrapper wrapper;

    public HyperTrackWebViewJsApi(
            Activity activity,
            WebView webView
    ) {
        this.wrapper = new WebViewInterfaceWrapper(activity, webView);
    }

    public static final String API_NAME = "HyperTrackWebViewInterface";

    @JavascriptInterface
    public String addGeotag(String geotagData) {
        return wrapper.addGeotag(geotagData);
    }

    @JavascriptInterface
    public String addGeotagWithExpectedLocation(String geotagData) {
        return wrapper.addGeotagWithExpectedLocation(geotagData);
    }

    @JavascriptInterface
    public void cancelLocate() {
        wrapper.cancelLocate();
    }

    @JavascriptInterface
    public String getDeviceId() {
        return wrapper.getDeviceId();
    }

    @JavascriptInterface
    public String getErrors() {
        return wrapper.getErrors();
    }

    @JavascriptInterface
    public String getIsAvailable() {
        return wrapper.getIsAvailable();
    }

    @JavascriptInterface
    public String getIsTracking() {
        return wrapper.getIsTracking();
    }

    @JavascriptInterface
    public String getLocation() {
        return wrapper.getLocation();
    }

    @JavascriptInterface
    public String getMetadata() {
        return wrapper.getMetadata();
    }

    @JavascriptInterface
    public String getName() {
        return wrapper.getName();
    }

    @JavascriptInterface
    public void locate() {
        wrapper.locate();
    }

    @JavascriptInterface
    public void openAppSettings() {
        wrapper.openAppSettings();
    }

    @JavascriptInterface
    public void requestLocationPermission() {
        wrapper.requestLocationPermission();
    }

    @JavascriptInterface
    public void requestBackgroundLocationPermission() {
        wrapper.requestBackgroundLocationPermission();
    }

    @JavascriptInterface
    public void requestNotificationsPermission() {
        wrapper.requestNotificationPermission();
    }

    @JavascriptInterface
    public void setIsAvailable(String isAvailable) {
        wrapper.setIsAvailable(isAvailable);
    }

    @JavascriptInterface
    public void setIsTracking(String isTracking) {
        wrapper.setIsTracking(isTracking);
    }

    @JavascriptInterface
    public void setMetadata(String metadata) {
        wrapper.setMetadata(metadata);
    }

    @JavascriptInterface
    public void setName(String name) {
        wrapper.setName(name);
    }

    @JavascriptInterface
    public void subscribeToErrors() {
        wrapper.subscribeToErrors();
    }

    @JavascriptInterface
    public void subscribeToIsAvailable() {
        wrapper.subscribeToIsAvailable();
    }

    @JavascriptInterface
    public void subscribeToIsTracking() {
        wrapper.subscribeToIsTracking();
    }

    @JavascriptInterface
    public void subscribeToLocation() {
        wrapper.subscribeToLocation();
    }

    @JavascriptInterface
    public void unsubscribeFromErrors() {
        wrapper.unsubscribeFromErrors();
    }

    @JavascriptInterface
    public void unsubscribeFromIsAvailable() {
        wrapper.unsubscribeFromIsAvailable();
    }

    @JavascriptInterface
    public void unsubscribeFromIsTracking() {
        wrapper.unsubscribeFromIsTracking();
    }

    @JavascriptInterface
    public void unsubscribeFromLocation() {
        wrapper.unsubscribeFromLocation();
    }
}
