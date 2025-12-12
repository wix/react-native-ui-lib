#!/usr/bin/env bash

pushd packages/uilib-docs
yarn
yarn build
yarn releaseDocs
popd
