package com.hypertrack.sdk.webview.android

import android.provider.Contacts.SettingsColumns.KEY
import com.hypertrack.sdk.android.HyperTrack
import com.hypertrack.sdk.android.HyperTrack.metadata
import com.hypertrack.sdk.android.HyperTrack.name
import com.hypertrack.sdk.webview.android.common.Failure
import com.hypertrack.sdk.webview.android.common.Serialization.KEY_DEVIATION
import com.hypertrack.sdk.webview.android.common.Serialized
import com.hypertrack.sdk.webview.android.common.Success
import com.hypertrack.sdk.webview.android.common.WrapperResult
import org.json.JSONArray
import org.json.JSONObject

private const val KEY_TYPE = "type"
private const val KEY_VALUE = "value"

internal fun serializeIsBackgroundLocationPermissionGranted(value: Boolean): Serialized {
    return mapOf(
        KEY_TYPE to "isBackgroundLocationPermissionGranted",
        KEY_VALUE to value
    )
}

internal fun serializeIsLocationPermissionGranted(value: Boolean): Serialized {
    return mapOf(
        KEY_TYPE to "isLocationPermissionGranted",
        KEY_VALUE to value
    )
}

internal fun serializeIsLocationServicesEnabled(value: Boolean): Serialized {
    return mapOf(
        KEY_TYPE to "isLocationServicesEnabled",
        KEY_VALUE to value
    )
}

internal fun serializeIsNotificationsPermissionGranted(value: Boolean): Serialized {
    return mapOf(
        KEY_TYPE to "isNotificationsPermissionGranted",
        KEY_VALUE to value
    )
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
