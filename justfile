alias b := build
alias ca := copy-js-to-android

build:
    yarn
    yarn build

copy-js-to-android: build
    mkdir -p android/demo/src/main/assets/js
    cp -r dist ../android/demo/src/main/assets/