# HyperTrack SDK for WebView

[![GitHub](https://img.shields.io/github/license/hypertrack/sdk-react-native?color=orange)](./LICENSE)

[HyperTrack](https://www.hypertrack.com) lets you add live location tracking to your mobile app. Live location is made available along with ongoing activity, tracking controls and tracking outage with reasons.

HyperTrack SDK for WebView is a wrapper around native iOS and Android WebViews that allows to integrate HyperTrack into your Web apps.

[HyperTrack SDK for Android WebView](./android/)

## Installation

### Android

1. Add the following to your Project `build.gradle` file:

```groovy
allprojects {
    repositories {
        ...
        maven {
            name 'hypertrack'
            url  'https://s3-us-west-2.amazonaws.com/m2.hypertrack.com/'
        }
        ...
    }
}
```

2. Add the following to your App `build.gradle` file:

```groovy
dependencies {
    ...
    implementation 'com.hypertrack:sdk-webview:<version>'
    ...
}
```

### Web (JS)

Add the HyperTrack SDK Wrapper for Web to your project:

```bash
npm install hypertrack-sdk-webview
```

## Usage

```js
import { HyperTrack } from "hypertrack-sdk-webview";

let deviceId = HyperTrack.getDeviceId();
```

## API Reference

[API Reference](js-library/docs/index.html)
