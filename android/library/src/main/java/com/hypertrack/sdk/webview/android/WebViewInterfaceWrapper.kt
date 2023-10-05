package com.hypertrack.sdk.webview.android

import android.webkit.JavascriptInterface
import com.hypertrack.sdk.webview.android.WebViewSerialization.deserializeLocationResponseFromInternalFormat
import com.hypertrack.sdk.webview.android.WebViewSerialization.deserializeLocationWithDeviationResponseFromInternalFormat
import com.hypertrack.sdk.webview.android.WebViewSerialization.serializeGeotagDataToInternalFormat
import com.hypertrack.sdk.webview.android.common.HyperTrackSdkWrapper
import org.json.JSONObject

object WebViewInterfaceWrapper {

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
        return HyperTrackSdkWrapper.addGeotag(
            serializeGeotagDataToInternalFormat(dataJsonString, expectedLocationJsonString)
        ).flatMapSuccess {
            deserializeLocationWithDeviationResponseFromInternalFormat(it)
        }.toJsResponse()
    }

    fun getDeviceID(): String {
        return ""
    }

    fun getErrors(): String {
        return ""
    }

    fun getIsAvailable(): String {
        return ""
    }

    fun getIsTracking(): String {
        return ""
    }

    fun getLocation(): String {
        return ""
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

    fun setIsTracking(): String {
        return ""
    }

    fun setMetadata(): String {
        return ""
    }

    fun setName(): String {
        return ""
    }

}
