package com.hypertrack.sdk.webview.android

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.util.Log
import android.provider.Settings
import com.hypertrack.sdk.webview.android.common.Failure
import com.hypertrack.sdk.webview.android.common.HyperTrackSdkWrapper
import com.hypertrack.sdk.webview.android.common.Success
import com.hypertrack.sdk.webview.android.common.WrapperResult

object WebViewInterfaceWrapper {

    private val TAG = javaClass.simpleName
    private const val REQUEST_CODE = 55658769

    fun addGeotag(geotagData: String): String {
        return geotagData.parseToMap()
            .flatMapSuccess {
                HyperTrackSdkWrapper.addGeotag(it)
            }
            .mapSuccess {
                it.toJSONObject().toString()
            }
            .swallowFailureAndLogError("addGeotag", "{}")
    }

    fun addGeotagWithExpectedLocation(geotagData: String): String {
        return geotagData.parseToMap()
            .flatMapSuccess {
                HyperTrackSdkWrapper.addGeotag(it)
            }
            .mapSuccess {
                it.toJSONObject().toString()
            }
            .swallowFailureAndLogError("addGeotagWithExpectedLocation", "{}")
    }

    fun getDeviceId(): String {
        return HyperTrackSdkWrapper
            .getDeviceId()
            .mapSuccess {
                it.toJSONObject().toString()
            }
            .swallowFailureAndLogError("getDeviceId", "{}")
    }

    fun getErrors(): String {
        return HyperTrackSdkWrapper
            .getErrors()
            .mapSuccess {
                it.toJSONArray().toString()
            }
            .swallowFailureAndLogError("getErrors", "[]")
    }

    fun getIsAvailable(): String {
        return HyperTrackSdkWrapper
            .getIsAvailable()
            .mapSuccess {
                it.toJSONObject().toString()
            }
            .swallowFailureAndLogError("getIsAvailable", "{}")
    }

    fun getIsTracking(): String {
        return HyperTrackSdkWrapper
            .getIsTracking()
            .mapSuccess {
                it.toJSONObject().toString()
            }
            .swallowFailureAndLogError("getIsTracking", "{}")
    }

    fun getLocation(): String {
        return HyperTrackSdkWrapper
            .getLocation()
            .mapSuccess {
                it.toJSONObject().toString()
            }
            .swallowFailureAndLogError("getLocation", "{}")
    }

    fun getMetadata(): String {
        return HyperTrackSdkWrapper
            .getMetadata()
            .mapSuccess {
                it.toJSONObject().toString()
            }
            .swallowFailureAndLogError("getMetadata", "{}")
    }

    fun getName(): String {
        return HyperTrackSdkWrapper
            .getName()
            .mapSuccess {
                it.toJSONObject().toString()
            }
            .swallowFailureAndLogError("getName", "{}")
    }

    fun locate() {

    }

    fun openAppSettings(activity: Activity) {
        return WrapperResult
            .tryAsResult {
                activity.startActivity(
                    Intent(
                        Settings.ACTION_APPLICATION_DETAILS_SETTINGS,
                        Uri.parse("package:${activity.packageName}")
                    )
                )
            }
            .swallowFailureAndLogError("openAppSettings", Unit)
    }

    fun requestLocationPermission(activity: Activity) {
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
            .swallowFailureAndLogError("requestLocationPermission", Unit)
    }

    fun requestBackgroundLocationPermission(activity: Activity) {
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
            .swallowFailureAndLogError("requestBackgroundLocationPermission", Unit)
    }

    fun requestNotificationPermission(activity: Activity) {
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
            .swallowFailureAndLogError("requestNotificationPermission", Unit)
    }

    fun setIsAvailable(isAvailable: String) {
        return isAvailable
            .parseToMap()
            .flatMapSuccess {
                HyperTrackSdkWrapper.setIsAvailable(it)
            }
            .swallowFailureAndLogError("setIsAvailable", Unit)
    }

    fun setIsTracking(isTracking: String) {
        return isTracking
            .parseToMap()
            .flatMapSuccess {
                HyperTrackSdkWrapper.setIsTracking(it)
            }
            .swallowFailureAndLogError("setIsTracking", Unit)
    }

    fun setMetadata(metadata: String) {
        return metadata.parseToMap()
            .flatMapSuccess {
                HyperTrackSdkWrapper.setMetadata(it)
            }
            .swallowFailureAndLogError("setMetadata", Unit)
    }

    fun setName(name: String) {
        return name.parseToMap()
            .flatMapSuccess {
                HyperTrackSdkWrapper.setName(it)
            }
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
