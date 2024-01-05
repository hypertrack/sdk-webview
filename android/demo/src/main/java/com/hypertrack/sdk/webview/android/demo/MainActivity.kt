package com.hypertrack.sdk.webview.android.demo

import android.annotation.SuppressLint
import android.net.Uri
import android.os.Bundle
import android.os.PersistableBundle
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import androidx.appcompat.app.AppCompatActivity
import androidx.webkit.WebViewAssetLoader
import androidx.webkit.WebViewClientCompat
import com.hypertrack.sdk.webview.android.demo.BuildConfig
import com.hypertrack.sdk.webview.android.HyperTrackWebViewJsApi

class MainActivity : AppCompatActivity() {

    private var webView: WebView? = null

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val useLocalAssets = false

        val assetLoader: WebViewAssetLoader = WebViewAssetLoader.Builder()
            .addPathHandler("/assets/", WebViewAssetLoader.AssetsPathHandler(this))
            .build()

        webView = findViewById(R.id.webView)
        webView?.apply {
            settings.javaScriptEnabled = true
            settings.domStorageEnabled = true
            settings.javaScriptCanOpenWindowsAutomatically = true
            settings.allowFileAccessFromFileURLs = false
            settings.allowUniversalAccessFromFileURLs = false
            settings.allowFileAccess = false
            settings.allowContentAccess = false

            webViewClient = object : WebViewClientCompat() {
                override fun shouldInterceptRequest(
                    view: WebView?,
                    request: WebResourceRequest
                ): WebResourceResponse? {
                    return if(useLocalAssets) {
                        assetLoader.shouldInterceptRequest(request.url)
                    } else {
                        super.shouldInterceptRequest(view, request)
                    }
                }

                @Suppress("OVERRIDE_DEPRECATION", "DEPRECATION")
                override fun shouldInterceptRequest(
                    view: WebView?,
                    url: String?
                ): WebResourceResponse? {
                    return if(useLocalAssets) {
                        assetLoader.shouldInterceptRequest(Uri.parse(url))
                    } else {
                        super.shouldInterceptRequest(view, url)
                    }
                }
            }

            addJavascriptInterface(TestInterface, "TestInterface")

            addJavascriptInterface(
                HyperTrackWebViewJsApi(this@MainActivity, webView), HyperTrackWebViewJsApi.API_NAME
            )
        }

        if (savedInstanceState == null) {
            if (!useLocalAssets) {
                webView?.loadUrl("${BuildConfig.SERVER_URL}/")
            } else {
                // Assets are hosted under http(s)://appassets.androidplatform.net/assets/... .
                // If the application's assets are in the "main/assets" folder this will read the file
                // from "main/assets/www/index.html" and load it as if it were hosted on:
                // https://appassets.androidplatform.net/assets/www/index.html
                webView?.loadUrl("https://appassets.androidplatform.net/assets/index.html")
            }
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

    override fun onPause() {
        super.onPause()
        webView?.onPause()
    }

    override fun onResume() {
        super.onResume()
        webView?.onResume()
    }

    override fun onDestroy() {
        webView?.destroy()
        super.onDestroy()
    }

}
