#!/usr/bin/env bash

pushd eslint-rules
yarn
yarn test
yarn releaseEslint
popd
