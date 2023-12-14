package com.hypertrack.sdk.webview.android.demo

import androidx.test.espresso.Espresso.onView
import androidx.test.espresso.assertion.ViewAssertions.matches
import androidx.test.espresso.idling.CountingIdlingResource
import androidx.test.espresso.matcher.ViewMatchers.isDisplayed
import androidx.test.espresso.matcher.ViewMatchers.withId
import androidx.test.espresso.web.sugar.Web.onWebView
import androidx.test.espresso.web.webdriver.DriverAtoms.findElement
import androidx.test.espresso.web.webdriver.DriverAtoms.webClick
import androidx.test.espresso.web.webdriver.Locator
import androidx.test.ext.junit.rules.activityScenarioRule
import androidx.test.platform.app.InstrumentationRegistry.getInstrumentation
import junit.framework.TestCase.assertEquals
import org.junit.Rule
import org.junit.Test
import com.hypertrack.sdk.webview.android.demo.test.R as TestR

class MainActivityTest {

    private val idlingResource = CountingIdlingResource("MyIdlingResource")

    @get:Rule
    var activityScenarioRule = activityScenarioRule<MainActivity>()

    @Test
    fun test() {
//        idlingResource.increment()
        val jsCode = getInstrumentation()
            .context
            .resources
            .openRawResource(TestR.raw.tests)
            .bufferedReader()
            .use { it.readText() }
        
        onView(withId(R.id.webView))
            .check(matches(isDisplayed()))
            .perform(RunJsAction(jsCode) {
                //        idlingResource.decrement()
            })

        // Block the JS thread to make sure all the JS tests are finished
        onWebView()
            .withElement(findElement(Locator.ID, "test"))
            .perform(webClick())

        assertEquals(Success, TestInterface.testResult)
    }

}
