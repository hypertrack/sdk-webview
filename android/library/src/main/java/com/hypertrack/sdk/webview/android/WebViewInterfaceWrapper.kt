package com.hypertrack.sdk.webview.android

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.util.Log
import android.provider.Settings
import android.webkit.WebView
import com.hypertrack.sdk.android.HyperTrack
import com.hypertrack.sdk.webview.android.common.Failure
import com.hypertrack.sdk.webview.android.common.HyperTrackSdkWrapper
import com.hypertrack.sdk.webview.android.common.Serialization.serializeLocationResult
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

    private val locationSubscription: HyperTrack.Cancellable

    private var locationSubscriptionEnabled: Boolean = false

    init {
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

    fun subscribeToLocation() {
        WrapperResult
            .tryAsResult {
                locationSubscriptionEnabled = true
                sendEvent(EVENT_LOCATION, serializeLocationResult(HyperTrack.location))
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

    companion object {
        private const val REQUEST_CODE = 55658769

        private const val EVENT_LOCATION = "location"
    }

}
