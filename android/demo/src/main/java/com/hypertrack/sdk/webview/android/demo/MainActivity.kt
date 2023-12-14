package com.hypertrack.sdk.webview.android.demo

import android.annotation.SuppressLint
import android.os.Bundle
import android.os.PersistableBundle
import android.util.Log
import android.webkit.ConsoleMessage
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebView
import androidx.appcompat.app.AppCompatActivity
import com.hypertrack.sdk.webview.android.HyperTrackWebViewJsApi

class MainActivity : AppCompatActivity() {

    private var webView: WebView? = null

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        webView = findViewById(R.id.webView)

        webView?.apply {
            settings.javaScriptEnabled = true
            settings.domStorageEnabled = true
            settings.javaScriptCanOpenWindowsAutomatically = true
            webChromeClient = object : WebChromeClient() {
//                override fun onConsoleMessage(consoleMessage: ConsoleMessage?): Boolean {
//                    Log.e("HT-DEBUG", consoleMessage?.message() ?: "no data");
//                    return true
//                }
            }
            addJavascriptInterface(TestInterface, "TestInterface")
            addJavascriptInterface(
                HyperTrackWebViewJsApi(this@MainActivity), HyperTrackWebViewJsApi.API_NAME
            )
        }

        if (savedInstanceState == null) {
            webView?.loadUrl("file:///android_asset/index.html")
        }
    }

    override fun onSaveInstanceState(outState: Bundle, outPersistentState: PersistableBundle) {
        super.onSaveInstanceState(outState, outPersistentState)
        webView?.saveState(outState)
    }

    override fun onRestoreInstanceState(savedInstanceState: Bundle) {
        super.onRestoreInstanceState(savedInstanceState)
        webView?.restoreState(savedInstanceState)
    }

}
