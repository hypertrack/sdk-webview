package com.hypertrack.sdk.webview.android.demo

import android.util.Log
import android.webkit.JavascriptInterface
import org.json.JSONObject
import java.lang.Exception

sealed class TestResult {
    override fun toString(): String = javaClass.simpleName
}

data class Unknown(val value: String) : TestResult()
object Success : TestResult()
data class Failure(val message: String) : TestResult()

object TestInterface {
    var testResult: TestResult = Unknown("Initial")

    @JavascriptInterface
    fun callbackCall(param: String) {
        try {
            val parsedParam = JSONObject(param)
            testResult = when (parsedParam.getString("type")) {
                "success" -> Success
                "failure" -> Failure(parsedParam.getString("message"))
                else -> Unknown(param)
            }
        } catch (e: Exception) {
            testResult = Failure(e.toString())
        }
    }
}
