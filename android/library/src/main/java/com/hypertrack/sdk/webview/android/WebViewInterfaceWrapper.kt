package com.hypertrack.sdk.webview.android

import android.nfc.Tag
import android.util.Log
import android.webkit.JavascriptInterface
import com.hypertrack.sdk.webview.android.WebViewSerialization.deserializeDeviceIdFromInternalFormat
import com.hypertrack.sdk.webview.android.WebViewSerialization.deserializeHyperTrackErrorsFromInternalFormat
import com.hypertrack.sdk.webview.android.WebViewSerialization.deserializeLocationResponseFromInternalFormat
import com.hypertrack.sdk.webview.android.WebViewSerialization.deserializeLocationWithDeviationResponseFromInternalFormat
import com.hypertrack.sdk.webview.android.WebViewSerialization.serializeGeotagDataToInternalFormat
import com.hypertrack.sdk.webview.android.WebViewSerialization.serializeIsTrackingToInternalFormat
import com.hypertrack.sdk.webview.android.common.Failure
import com.hypertrack.sdk.webview.android.common.HyperTrackSdkWrapper
import com.hypertrack.sdk.webview.android.common.Serialized
import com.hypertrack.sdk.webview.android.common.Success
import com.hypertrack.sdk.webview.android.common.WrapperResult

object WebViewInterfaceWrapper {

    private val TAG = javaClass.simpleName

    fun addGeotag(dataJsonString: String): String {
        return HyperTrackSdkWrapper.addGeotag(
            serializeGeotagDataToInternalFormat(dataJsonString, null)
        ).flatMapSuccess {
            deserializeLocationResponseFromInternalFormat(it)
        }.toJsResponse()
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

    fun getIsAvailable(): String {
        return ""
    }

    fun getIsTracking(): String {
        return ""
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

    fun getMetadata(): String {
        return ""
    }

    fun getName(): String {
        return ""
    }

    fun setIsAvailable(): String {
        return ""
    }

    fun setIsTracking(isTracking: Boolean) {
        return HyperTrackSdkWrapper
            .setIsTracking(
                serializeIsTrackingToInternalFormat(isTracking)
            )
            .swallowFailureAndLogError("setIsTracking", Unit)
    }

    fun setMetadata(): String {
        return ""
    }

    fun setName(): String {
        return ""
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
