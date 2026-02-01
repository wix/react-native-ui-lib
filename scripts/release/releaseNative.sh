#!/usr/bin/env bash

pushd packages/uilib-native
npm install
npm run releaseNative
popd
