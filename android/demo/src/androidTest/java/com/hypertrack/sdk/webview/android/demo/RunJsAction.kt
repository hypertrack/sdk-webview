package com.hypertrack.sdk.webview.android.demo

import android.view.View
import android.webkit.WebView
import androidx.test.espresso.UiController
import androidx.test.espresso.ViewAction
import androidx.test.espresso.matcher.ViewMatchers
import kotlinx.coroutines.flow.callbackFlow
import org.hamcrest.Matcher

class RunJsAction(
    private val jsCode: String,
    private val callback: () -> Unit
) : ViewAction {
    override fun getConstraints(): Matcher<View> {
        return ViewMatchers.isAssignableFrom(View::class.java)
    }

    override fun getDescription(): String {
        return "Run JS code"
    }

    override fun perform(uiController: UiController?, view: View?) {
        (view as WebView).evaluateJavascript(jsCode) { callback() }
    }
}
