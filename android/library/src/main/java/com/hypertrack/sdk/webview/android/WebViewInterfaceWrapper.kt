package com.hypertrack.sdk.webview.android

import android.app.Activity
import android.content.Context
import android.os.Build
import android.util.Log
import com.hypertrack.sdk.webview.android.WebViewSerialization.deserializeDeviceIdFromInternalFormat
import com.hypertrack.sdk.webview.android.WebViewSerialization.deserializeHyperTrackErrorsFromInternalFormat
import com.hypertrack.sdk.webview.android.WebViewSerialization.deserializeLocationResponseFromInternalFormat
import com.hypertrack.sdk.webview.android.WebViewSerialization.deserializeLocationWithDeviationResponseFromInternalFormat
import com.hypertrack.sdk.webview.android.WebViewSerialization.serializeGeotagDataToInternalFormat
import com.hypertrack.sdk.webview.android.WebViewSerialization.serializeIsTrackingToInternalFormat
import com.hypertrack.sdk.webview.android.WebViewSerialization.serializeMetadataToInternalFormat
import com.hypertrack.sdk.webview.android.WebViewSerialization.serializeNameToInternalFormat
import com.hypertrack.sdk.webview.android.common.Failure
import com.hypertrack.sdk.webview.android.common.HyperTrackSdkWrapper
import com.hypertrack.sdk.webview.android.common.Serialized
import com.hypertrack.sdk.webview.android.common.Success
import com.hypertrack.sdk.webview.android.common.WrapperResult
import org.json.JSONObject

object WebViewInterfaceWrapper {

    private val TAG = javaClass.simpleName
    private const val REQUEST_CODE = 55658769

    fun addGeotag(dataJsonString: String): String {
        return HyperTrackSdkWrapper.addGeotag(
            serializeGeotagDataToInternalFormat(dataJsonString, null)
        )
            .flatMapSuccess {
                deserializeLocationResponseFromInternalFormat(it)
            }
            .toJsResponse()
    }

    fun addGeotagWithExpectedLocation(
        dataJsonString: String,
        expectedLocationJsonString: String
    ): String {
        return HyperTrackSdkWrapper
            .addGeotag(
                serializeGeotagDataToInternalFormat(dataJsonString, expectedLocationJsonString)
            )
            .flatMapSuccess {
                deserializeLocationWithDeviationResponseFromInternalFormat(it)
            }
            .toJsResponse()
    }

    fun askForLocationPermission(activity: Activity) {
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

    fun askForBackgroundLocationPermission(activity: Activity) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            activity.requestPermissions(
                listOf(
                    android.Manifest.permission.ACCESS_BACKGROUND_LOCATION
                ).toTypedArray(),
                REQUEST_CODE
            )
        }
    }

    fun askForNotificationPermission(activity: Activity) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            activity.requestPermissions(
                listOf(
                    android.Manifest.permission.ACCESS_NOTIFICATION_POLICY
                ).toTypedArray(),
                REQUEST_CODE
            )
        }
    }

    fun getDeviceId(): String? {
        return HyperTrackSdkWrapper
            .getDeviceId()
            .flatMapSuccess {
                deserializeDeviceIdFromInternalFormat(it)
            }
            .mapSuccess { it as String? }
            .swallowFailureAndLogError("getDeviceId", null)
    }

    fun getErrors(): String {
        return HyperTrackSdkWrapper
            .getErrors()
            .flatMapSuccess {
                deserializeHyperTrackErrorsFromInternalFormat(it)
            }
            .swallowFailureAndLogError(
                "getErrors", listOf(
                    "wrapperError"
                )
            )
            .toJsResponse()
    }

    fun getLocation(): String? {
        return HyperTrackSdkWrapper
            .getLocation()
            .flatMapSuccess {
                deserializeLocationResponseFromInternalFormat(it)
            }
            .mapSuccess { it as Serialized? }
            .swallowFailureAndLogError("getLocation", null)
            ?.toJsResponse()
    }

    fun setIsTracking(isTracking: Boolean) {
        return HyperTrackSdkWrapper
            .setIsTracking(
                serializeIsTrackingToInternalFormat(isTracking)
            )
            .swallowFailureAndLogError("setIsTracking", Unit)
    }

    fun setMetadata(metadataString: String): String {
        return WrapperResult.tryAsResult {
            JSONObject(metadataString).toMap()
        }
            .flatMapSuccess {
                HyperTrackSdkWrapper.setMetadata(serializeMetadataToInternalFormat(it))
            }
            .toJsResponse()
    }

    fun setName(name: String) {
        return HyperTrackSdkWrapper
            .setName(serializeNameToInternalFormat(name))
            .swallowFailureAndLogError("setName", Unit)
    }

    private fun <T> WrapperResult<T>.swallowFailureAndLogError(
        methodName: String,
        defaultValue: T
    ): T {
        return when (this) {
            is Success -> this.success
            is Failure -> {
                Log.e(TAG, "$methodName: ${this.failure}")
                defaultValue
            }
        }
    }

}
