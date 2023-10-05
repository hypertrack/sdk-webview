package com.hypertrack.sdk.webview.android

import android.provider.Contacts.SettingsColumns.KEY
import com.hypertrack.sdk.android.HyperTrack.metadata
import com.hypertrack.sdk.android.HyperTrack.name
import com.hypertrack.sdk.webview.android.common.Failure
import com.hypertrack.sdk.webview.android.common.Serialization.KEY_DEVIATION
import com.hypertrack.sdk.webview.android.common.Serialized
import com.hypertrack.sdk.webview.android.common.Success
import com.hypertrack.sdk.webview.android.common.WrapperResult
import org.json.JSONArray
import org.json.JSONObject

private const val KEY_GEOTAG_DATA = "data"
private const val KEY_GEOTAG_EXPECTED_LOCATION = "expectedLocation"
private const val KEY_LOCATION = "location"
private const val KEY_TYPE = "type"
private const val KEY_VALUE = "value"

private const val TYPE_DEVICE_ID = "deviceID"
private const val TYPE_SUCCESS = "success"
private const val TYPE_FAILURE = "failure"

@Suppress("UNCHECKED_CAST")
internal object WebViewSerialization {

    fun serializeGeotagDataToInternalFormat(
        dataJsonString: String,
        expectedLocationString: String?
    ): Serialized {
        return mapOf(
            KEY_GEOTAG_DATA to JSONObject(dataJsonString).toMap(),
            KEY_GEOTAG_EXPECTED_LOCATION to expectedLocationString?.let {
                JSONObject(it).toMap()
            }
        )
    }

    fun serializeIsTrackingToInternalFormat(
        isTracking: Boolean
    ): Serialized {
        return mapOf(
            KEY_TYPE to "isTracking",
            KEY_VALUE to isTracking
        )
    }

    fun deserializeDeviceIdFromInternalFormat(
        deviceId: Serialized
    ): WrapperResult<String> {
        if (deviceId[KEY_TYPE] != TYPE_DEVICE_ID) {
            return Failure(Exception("Invalid device id type: $deviceId"))
        }
        return Success(deviceId[KEY_VALUE] as String)
    }

    fun deserializeHyperTrackErrorsFromInternalFormat(
        hyperTrackErrors: List<Serialized>
    ): WrapperResult<List<String>> {
        return hyperTrackErrors.map { error ->
            if (error[KEY_TYPE] != "error") {
                return Failure(Exception("Invalid error type: $error"))
            }
            error[KEY_VALUE] as String
        }.let { Success(it) }
    }

    private fun deserializeLocationErrorFromInternalFormat(
        locationError: Serialized
    ): WrapperResult<Serialized> {
        return when {
            locationError[KEY_TYPE] == "notRunning" -> {
                Success(locationError)
            }

            locationError[KEY_TYPE] == "starting" -> {
                Success(locationError)
            }

            locationError[KEY_TYPE] == "errors" -> {
                deserializeHyperTrackErrorsFromInternalFormat(
                    locationError[KEY_VALUE] as List<Serialized>
                ).mapSuccess {
                    mapOf(
                        KEY_TYPE to "errors",
                        KEY_VALUE to it
                    )
                }
            }

            else -> {
                throw Exception("Invalid location error: $locationError")
            }
        }
    }

    fun deserializeLocationResponseFromInternalFormat(
        locationResponse: Serialized
    ): WrapperResult<Serialized> {
        return when {
            locationResponse[KEY_TYPE] == TYPE_SUCCESS -> {
                mapOf(
                    KEY_TYPE to TYPE_SUCCESS,
                    KEY_VALUE to (locationResponse[KEY_VALUE] as Serialized)[KEY_VALUE]
                ).let { Success(it) }
            }

            locationResponse[KEY_TYPE] == TYPE_FAILURE -> {
                deserializeLocationErrorFromInternalFormat(
                    locationResponse[KEY_VALUE] as Serialized
                ).mapSuccess {
                    mapOf(
                        KEY_TYPE to TYPE_FAILURE,
                        KEY_VALUE to it
                    )
                }
            }

            else -> {
                Failure(Exception("Invalid location response: $locationResponse"))
            }
        }
    }

    fun deserializeLocationWithDeviationResponseFromInternalFormat(
        locationWithDeviationResponse: Serialized
    ): WrapperResult<Serialized> {
        return when {
            locationWithDeviationResponse[KEY_TYPE] == TYPE_SUCCESS -> {
                val locationWithDeviationInternal =
                    locationWithDeviationResponse[KEY_VALUE] as Serialized
                val locationInternal =
                    (locationWithDeviationInternal[KEY_VALUE] as Serialized)[KEY_LOCATION] as Serialized
                val deviation =
                    (locationWithDeviationInternal[KEY_VALUE] as Serialized)[KEY_DEVIATION] as Double

                mapOf(
                    KEY_TYPE to TYPE_SUCCESS,
                    KEY_VALUE to mapOf(
                        KEY_LOCATION to locationInternal[KEY_VALUE],
                        KEY_DEVIATION to deviation
                    )
                ).let { Success(it) }
            }

            locationWithDeviationResponse[KEY_TYPE] == TYPE_FAILURE -> {
                deserializeLocationErrorFromInternalFormat(
                    locationWithDeviationResponse[KEY_VALUE] as Serialized
                ).mapSuccess {
                    mapOf(
                        KEY_TYPE to TYPE_FAILURE,
                        KEY_VALUE to it
                    )
                }
            }

            else -> {
                Failure(Exception("Invalid location response: $locationWithDeviationResponse"))
            }
        }
    }

}

internal fun List<String>.toJsResponse(): String {
    return this.toJSONArray().toString()
}

internal fun Serialized.toJsResponse(): String {
    return this.toJSONObject().toString()
}

internal fun <T> WrapperResult<T>.toJsResponse(): String {
    return when (this) {
        is Success -> {
            mapOf(
                KEY_TYPE to TYPE_SUCCESS,
                KEY_VALUE to this.success
            ).toJSONObject().toString()
        }

        is Failure -> {
            if (this.failure is Exception) {
                mapOf(
                    KEY_TYPE to TYPE_FAILURE,
                    KEY_VALUE to this.failure.message
                ).toJSONObject().toString()
            } else {
                throw this.failure
            }
        }
    }
}

internal fun JSONObject.toMap(): Map<String, Any?> {
    return keys().asSequence().associateWith { key ->
        when (val value = this.get(key)) {
            is Boolean,
            is String,
            is Double,
            is Int -> {
                value
            }

            is JSONArray -> {
                value.toList()
            }

            is JSONObject -> {
                value.toMap()
            }

            else -> {
                null
            }
        }
    }
}

private fun JSONArray.toList(): List<Any> {
    return (0..length()).mapNotNull { index ->
        when (val value = this.get(index)) {
            is Boolean,
            is String,
            is Double,
            is Int -> {
                value
            }

            is JSONArray -> {
                value.toList()
            }

            is JSONObject -> {
                value.toMap()
            }

            else -> {
                null
            }
        }
    }
}

@Suppress("UNCHECKED_CAST")
internal fun Map<String, Any?>.toJSONObject(): JSONObject {
    val jsonObject = JSONObject()
    for ((key, value) in this) {
        when (value) {
            is Map<*, *> -> jsonObject.put(key, (value as Map<String, Any?>).toJSONObject())
            is List<*> -> jsonObject.put(key, (value as List<Any?>).toJSONArray())
            else -> jsonObject.put(key, value)
        }
    }
    return jsonObject
}

@Suppress("UNCHECKED_CAST")
internal fun List<Any?>.toJSONArray(): JSONArray {
    val jsonArray = JSONArray()
    for (value in this) {
        when (value) {
            is Map<*, *> -> jsonArray.put((value as Map<String, Any?>).toJSONObject())
            is List<*> -> jsonArray.put((value as List<Any?>).toJSONArray())
            else -> jsonArray.put(value)
        }
    }
    return jsonArray
}
