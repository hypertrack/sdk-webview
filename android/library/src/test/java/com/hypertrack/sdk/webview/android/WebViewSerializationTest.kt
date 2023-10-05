package com.hypertrack.sdk.webview.android

import com.hypertrack.sdk.webview.android.common.Success
import junit.framework.TestCase.assertEquals
import org.junit.Test

class WebViewSerializationTest {

    @Test
    fun deviceId() {
        val serialized = mapOf(
            "type" to "deviceID",
            "value" to "deviceId"
        )
        val expected = "deviceId"
        val value = WebViewSerialization.deserializeDeviceIdFromInternalFormat(serialized)
        assertEquals(expected, (value as Success).success)
    }

    @Test
    fun locationResponseSuccess() {
        val serialized = mapOf(
            "type" to "success",
            "value" to mapOf(
                "type" to "location",
                "value" to mapOf(
                    "latitude" to 1.0,
                    "longitude" to 2.0,
                )
            )
        )
        val expected = mapOf(
            "type" to "success",
            "value" to mapOf(
                "latitude" to 1.0,
                "longitude" to 2.0,
            )
        )
        val value = WebViewSerialization.deserializeLocationResponseFromInternalFormat(serialized)
        assertEquals(expected, (value as Success).success)
    }

    @Test
    fun locationResponseFailureNotRunning() {
        val serialized = mapOf(
            "type" to "failure",
            "value" to mapOf(
                "type" to "notRunning"
            )
        )
        val expected = serialized
        val value = WebViewSerialization.deserializeLocationResponseFromInternalFormat(serialized)
        assertEquals(expected, (value as Success).success)
    }

    @Test
    fun locationResponseFailureStarting() {
        val serialized = mapOf(
            "type" to "failure",
            "value" to mapOf(
                "type" to "starting"
            )
        )
        val expected = serialized
        val value = WebViewSerialization.deserializeLocationResponseFromInternalFormat(serialized)
        assertEquals(expected, (value as Success).success)
    }

    @Test
    fun locationResponseFailureErrors() {
        val serialized = mapOf(
            "type" to "failure",
            "value" to mapOf(
                "type" to "errors",
                "value" to listOf(
                    mapOf(
                        "type" to "error",
                        "value" to "error1"
                    ),
                    mapOf(
                        "type" to "error",
                        "value" to "error2"
                    )
                )
            )
        )
        val expected = mapOf(
            "type" to "failure",
            "value" to mapOf(
                "type" to "errors",
                "value" to listOf(
                    "error1",
                    "error2"
                )
            )
        )
        val value = WebViewSerialization.deserializeLocationResponseFromInternalFormat(serialized)
        assertEquals(expected, (value as Success).success)
    }

    @Test
    fun locationWithDeviationResponseSuccess() {
        val serialized = mapOf(
            "type" to "success",
            "value" to mapOf(
                "type" to "locationWithDeviation",
                "value" to mapOf(
                    "location" to mapOf(
                        "type" to "location",
                        "value" to mapOf(
                            "latitude" to 1.0,
                            "longitude" to 2.0,
                        )
                    ),
                    "deviation" to 3.0
                )
            )
        )
        val expected = mapOf(
            "type" to "success",
            "value" to mapOf(
                "location" to mapOf(
                    "latitude" to 1.0,
                    "longitude" to 2.0,
                ),
                "deviation" to 3.0
            )
        )
        val value = WebViewSerialization.deserializeLocationWithDeviationResponseFromInternalFormat(
            serialized
        )
        assertEquals(expected, (value as Success).success)
    }

    @Test
    fun locationWithDeviationResponseFailureNotRunning() {
        val serialized = mapOf(
            "type" to "failure",
            "value" to mapOf(
                "type" to "notRunning"
            )
        )
        val expected = serialized
        val value = WebViewSerialization.deserializeLocationWithDeviationResponseFromInternalFormat(
            serialized
        )
        assertEquals(expected, (value as Success).success)
    }

    @Test
    fun locationWithDeviationResponseFailureStarting() {
        val serialized = mapOf(
            "type" to "failure",
            "value" to mapOf(
                "type" to "starting"
            )
        )
        val expected = serialized
        val value = WebViewSerialization.deserializeLocationWithDeviationResponseFromInternalFormat(
            serialized
        )
        assertEquals(expected, (value as Success).success)
    }

    @Test
    fun locationWithDeviationResponseFailureErrors() {
        val serialized = mapOf(
            "type" to "failure",
            "value" to mapOf(
                "type" to "errors",
                "value" to listOf(
                    mapOf(
                        "type" to "error",
                        "value" to "error1"
                    ),
                    mapOf(
                        "type" to "error",
                        "value" to "error2"
                    )
                )
            )
        )
        val expected = mapOf(
            "type" to "failure",
            "value" to mapOf(
                "type" to "errors",
                "value" to listOf(
                    "error1",
                    "error2"
                )
            )
        )
        val value = WebViewSerialization.deserializeLocationWithDeviationResponseFromInternalFormat(
            serialized
        )
        assertEquals(expected, (value as Success).success)
    }
}
