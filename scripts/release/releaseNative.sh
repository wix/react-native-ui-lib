#!/usr/bin/env bash

pushd packages/uilib-native
yarn
yarn releaseNative
popd
