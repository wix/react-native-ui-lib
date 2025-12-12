#!/usr/bin/env bash

pushd packages/eslint-rules
yarn
yarn test
yarn releaseEslint
popd
