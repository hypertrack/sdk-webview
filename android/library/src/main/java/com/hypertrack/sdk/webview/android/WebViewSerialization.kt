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
private const val TYPE_LOCATION = "location"
private const val TYPE_METADATA = "metadata"
private const val TYPE_NAME = "name"

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

internal fun String.parseToMap(): WrapperResult<Serialized> {
    return WrapperResult.tryAsResult {
        JSONObject(this).toMap()
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
            is Unit -> Unit
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
