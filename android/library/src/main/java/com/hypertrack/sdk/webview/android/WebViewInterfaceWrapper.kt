package com.hypertrack.sdk.webview.android

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.util.Log
import android.provider.Settings
import android.webkit.WebView
import com.hypertrack.sdk.android.HyperTrack
import com.hypertrack.sdk.android.HyperTrack.errors
import com.hypertrack.sdk.webview.android.common.Failure
import com.hypertrack.sdk.webview.android.common.HyperTrackSdkWrapper
import com.hypertrack.sdk.webview.android.common.Serialization.serializeErrors
import com.hypertrack.sdk.webview.android.common.Serialization.serializeIsAvailable
import com.hypertrack.sdk.webview.android.common.Serialization.serializeIsTracking
import com.hypertrack.sdk.webview.android.common.Serialization.serializeLocateResult
import com.hypertrack.sdk.webview.android.common.Serialization.serializeLocationErrorFailure
import com.hypertrack.sdk.webview.android.common.Serialization.serializeLocationResult
import com.hypertrack.sdk.webview.android.common.Serialization.serializeLocationSuccess
import com.hypertrack.sdk.webview.android.common.Serialized
import com.hypertrack.sdk.webview.android.common.Success
import com.hypertrack.sdk.webview.android.common.WrapperResult

/**
 * All methods are called from the JavaBridge thread.
 */
class WebViewInterfaceWrapper(
    private val activity: Activity,
    private val webView: WebView
) {
    private var errorSubscriptionEnabled: Boolean = false
    private var isAvailableSubscriptionEnabled: Boolean = false
    private var isTrackingSubscriptionEnabled: Boolean = false
    private var locationSubscriptionEnabled: Boolean = false

    private val errorSubscription: HyperTrack.Cancellable
    private val isAvailableSubscription: HyperTrack.Cancellable
    private val isTrackingSubscription: HyperTrack.Cancellable
    private val locationSubscription: HyperTrack.Cancellable

    private var locateSubscription: HyperTrack.Cancellable? = null

    init {
        errorSubscription = HyperTrack.subscribeToErrors {
            WrapperResult
                .tryAsResult {
                    if (errorSubscriptionEnabled) {
                        sendEvent(EVENT_ERROR, serializeErrorsToObject(serializeErrors(it)))
                    }
                }
                .crashOnFailure()
        }

        isAvailableSubscription = HyperTrack.subscribeToIsAvailable {
            WrapperResult
                .tryAsResult {
                    if (isAvailableSubscriptionEnabled) {
                        sendEvent(EVENT_IS_AVAILABLE, serializeIsAvailable(it))
                    }
                }
                .crashOnFailure()
        }

        isTrackingSubscription = HyperTrack.subscribeToIsTracking {
            WrapperResult
                .tryAsResult {
                    if (isTrackingSubscriptionEnabled) {
                        sendEvent(EVENT_IS_TRACKING, serializeIsTracking(it))
                    }
                }
                .crashOnFailure()
        }

        locationSubscription = HyperTrack.subscribeToLocation {
            WrapperResult
                .tryAsResult {
                    if (locationSubscriptionEnabled) {
                        sendEvent(EVENT_LOCATION, serializeLocationResult(it))
                    }
                }
                .crashOnFailure()
        }
    }

    fun addGeotag(geotagData: String): String {
        return geotagData.parseToMap()
            .flatMapSuccess {
                HyperTrackSdkWrapper.addGeotag(it)
            }
            .mapSuccess {
                it.toJSONObject().toString()
            }
            .crashOnFailure()
    }

    fun addGeotagWithExpectedLocation(geotagData: String): String {
        return geotagData.parseToMap()
            .flatMapSuccess {
                HyperTrackSdkWrapper.addGeotag(it)
            }
            .mapSuccess {
                it.toJSONObject().toString()
            }
            .crashOnFailure()
    }

    fun cancelLocate() {
        WrapperResult
            .tryAsResult {
                locateSubscription?.cancel()
            }
            .crashOnFailure()

    }

    fun getDeviceId(): String {
        return HyperTrackSdkWrapper
            .getDeviceId()
            .mapSuccess {
                it.toJSONObject().toString()
            }
            .crashOnFailure()
    }

    fun getErrors(): String {
        return HyperTrackSdkWrapper
            .getErrors()
            .mapSuccess {
                it.toJSONArray().toString()
            }
            .crashOnFailure()
    }

    fun getIsAvailable(): String {
        return HyperTrackSdkWrapper
            .getIsAvailable()
            .mapSuccess {
                it.toJSONObject().toString()
            }
            .crashOnFailure()
    }

    fun getIsTracking(): String {
        return HyperTrackSdkWrapper
            .getIsTracking()
            .mapSuccess {
                it.toJSONObject().toString()
            }
            .crashOnFailure()
    }

    fun getLocation(): String {
        return HyperTrackSdkWrapper
            .getLocation()
            .mapSuccess {
                it.toJSONObject().toString()
            }
            .crashOnFailure()
    }

    fun getMetadata(): String {
        return HyperTrackSdkWrapper
            .getMetadata()
            .mapSuccess {
                it.toJSONObject().toString()
            }
            .crashOnFailure()
    }

    fun getName(): String {
        return HyperTrackSdkWrapper
            .getName()
            .mapSuccess {
                it.toJSONObject().toString()
            }
            .crashOnFailure()
    }

    fun locate() {
        locateSubscription?.cancel()
        locateSubscription = HyperTrack
            .locate {
                WrapperResult
                    .tryAsResult {
                        sendEvent(EVENT_LOCATE, serializeLocateResult(it))
                    }
                    .crashOnFailure()
            }
    }

    fun isBackgroundLocationPermissionGranted(): String {
        return WrapperResult
            .tryAsResult {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                    activity.checkSelfPermission(
                        android.Manifest.permission.ACCESS_BACKGROUND_LOCATION
                    ) == android.content.pm.PackageManager.PERMISSION_GRANTED
                } else {
                    true
                }
            }
            .mapSuccess {
                serializeIsBackgroundLocationPermissionGranted(it).toJSONObject().toString()
            }
            .crashOnFailure()
    }

    fun isLocationPermissionGranted(): String {
        return WrapperResult
            .tryAsResult {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                    activity.checkSelfPermission(
                        android.Manifest.permission.ACCESS_FINE_LOCATION
                    ) == android.content.pm.PackageManager.PERMISSION_GRANTED
                } else {
                    true
                }
            }
            .mapSuccess {
                serializeIsLocationPermissionGranted(it).toJSONObject().toString()
            }
            .crashOnFailure()
    }

    fun isLocationServicesEnabled(): String {
        return WrapperResult
            .tryAsResult {
                val locationManager =
                    activity.getSystemService(android.content.Context.LOCATION_SERVICE) as android.location.LocationManager
                locationManager.isProviderEnabled(android.location.LocationManager.GPS_PROVIDER)
            }
            .mapSuccess {
                serializeIsLocationServicesEnabled(it).toJSONObject().toString()
            }
            .crashOnFailure()
    }

    fun isNotificationsPermissionGranted(): String {
        return WrapperResult
            .tryAsResult {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                    activity.checkSelfPermission(
                        android.Manifest.permission.POST_NOTIFICATIONS
                    ) == android.content.pm.PackageManager.PERMISSION_GRANTED
                } else {
                    true
                }
            }
            .mapSuccess {
                serializeIsNotificationsPermissionGranted(it).toJSONObject().toString()
            }
            .crashOnFailure()
    }

    fun openAppSettings() {
        return WrapperResult
            .tryAsResult {
                activity.startActivity(
                    Intent(
                        Settings.ACTION_APPLICATION_DETAILS_SETTINGS,
                        Uri.parse("package:${activity.packageName}")
                    )
                )
            }
            .crashOnFailure()
    }

    fun openLocationServicesSettings() {
        return WrapperResult
            .tryAsResult {
                activity.startActivity(
                    Intent(
                        Settings.ACTION_LOCATION_SOURCE_SETTINGS
                    )
                )
            }
            .crashOnFailure()
    }

    fun requestLocationPermission() {
        return WrapperResult
            .tryAsResult {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                    activity.requestPermissions(
                        listOf(
                            android.Manifest.permission.ACCESS_FINE_LOCATION,
                            android.Manifest.permission.ACCESS_COARSE_LOCATION
                        ).toTypedArray(),
                        REQUEST_CODE
                    )
                }
            }
            .crashOnFailure()
    }

    fun requestBackgroundLocationPermission() {
        return WrapperResult
            .tryAsResult {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                    activity.requestPermissions(
                        listOf(
                            android.Manifest.permission.ACCESS_BACKGROUND_LOCATION
                        ).toTypedArray(),
                        REQUEST_CODE
                    )
                }
            }
            .crashOnFailure()
    }

    fun requestNotificationPermission() {
        return WrapperResult
            .tryAsResult {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                    activity.requestPermissions(
                        listOf(
                            android.Manifest.permission.ACCESS_NOTIFICATION_POLICY
                        ).toTypedArray(),
                        REQUEST_CODE
                    )
                }
            }
            .crashOnFailure()
    }

    fun setIsAvailable(isAvailable: String) {
        return isAvailable
            .parseToMap()
            .flatMapSuccess {
                HyperTrackSdkWrapper.setIsAvailable(it)
            }
            .crashOnFailure()
    }

    fun setIsTracking(isTracking: String) {
        return isTracking
            .parseToMap()
            .flatMapSuccess {
                HyperTrackSdkWrapper.setIsTracking(it)
            }
            .crashOnFailure()
    }

    fun setMetadata(metadata: String) {
        return metadata.parseToMap()
            .flatMapSuccess {
                HyperTrackSdkWrapper.setMetadata(it)
            }
            .crashOnFailure()
    }

    fun setName(name: String) {
        return name.parseToMap()
            .flatMapSuccess {
                HyperTrackSdkWrapper.setName(it)
            }
            .crashOnFailure()
    }

    fun subscribeToErrors() {
        WrapperResult
            .tryAsResult {
                errorSubscriptionEnabled = true
                sendEvent(EVENT_ERROR, serializeErrorsToObject(serializeErrors(errors)))
            }
            .crashOnFailure()
    }

    fun subscribeToIsAvailable() {
        WrapperResult
            .tryAsResult {
                isAvailableSubscriptionEnabled = true
                sendEvent(EVENT_IS_AVAILABLE, serializeIsAvailable(HyperTrack.isAvailable))
            }
            .crashOnFailure()
    }

    fun subscribeToIsTracking() {
        WrapperResult
            .tryAsResult {
                isTrackingSubscriptionEnabled = true
                sendEvent(EVENT_IS_TRACKING, serializeIsTracking(HyperTrack.isTracking))
            }
            .crashOnFailure()
    }

    fun subscribeToLocation() {
        WrapperResult
            .tryAsResult {
                locationSubscriptionEnabled = true
                sendEvent(EVENT_LOCATION, serializeLocationResult(HyperTrack.location))
            }
            .crashOnFailure()
    }

    fun unsubscribeFromErrors() {
        WrapperResult
            .tryAsResult {
                errorSubscriptionEnabled = false
            }
            .crashOnFailure()
    }

    fun unsubscribeFromIsAvailable() {
        WrapperResult
            .tryAsResult {
                isAvailableSubscriptionEnabled = false
            }
            .crashOnFailure()
    }

    fun unsubscribeFromIsTracking() {
        WrapperResult
            .tryAsResult {
                isTrackingSubscriptionEnabled = false
            }
            .crashOnFailure()
    }

    fun unsubscribeFromLocation() {
        WrapperResult
            .tryAsResult {
                locationSubscriptionEnabled = false
            }
            .crashOnFailure()
    }

    private fun <T> WrapperResult<T>.crashOnFailure(): T {
        return when (this) {
            is Success -> this.success
            is Failure -> throwExceptionOnUiThread(this.failure)
        }
    }

    /**
     * We need this to properly crash the app because all methods are called from the JavaBridge
     * thread, and WebView swallow all the crashes from this thread.
     */
    private fun <T> throwExceptionOnUiThread(exception: Throwable): T {
        activity.runOnUiThread {
            throw exception
        }
        throw exception
    }

    private fun sendEvent(name: String, data: Serialized) {
        activity.runOnUiThread {
            webView.evaluateJavascript(
                """
                HyperTrackEventReceiver.dispatchEvent(
                    {
                        name: "$name",
                        data: ${data.toJSONObject()}
                    }
                )
            """.trimIndent(),
                null
            )
        }
    }

    private fun serializeErrorsToObject(errors: List<Serialized>): Serialized {
        return mapOf(KEY_ERRORS to errors)
    }

    companion object {
        private const val REQUEST_CODE = 55658769

        private const val EVENT_ERROR = "errors"
        private const val EVENT_IS_AVAILABLE = "isAvailable"
        private const val EVENT_IS_TRACKING = "isTracking"
        private const val EVENT_LOCATION = "location"
        private const val EVENT_LOCATE = "locate"

        private const val KEY_ERRORS = "errors"
    }

}
