#!/usr/bin/env bash

echo "UI-Lib podspec link"
if [[ "$PWD" =~ node_modules ]]; then
    ln lib/ReactNativeUiLib.podspec ReactNativeUiLib.podspec
fi
