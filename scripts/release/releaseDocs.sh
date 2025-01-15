#!/usr/bin/env bash

pushd docuilib
yarn
yarn build
yarn releaseDocs
popd
