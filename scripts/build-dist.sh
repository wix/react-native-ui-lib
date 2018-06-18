#!/bin/bash -e
# create dist-ts and move all js files to it
# find ./dist-ts -iname "*.js" -type f | cut -d/ -f3- | while read b; do mkdir -p "dist/`dirname $b`" && cp dist-ts/$b dist/$b ; done
find ./dist-ts -iname "*.png" -type f | cut -d/ -f3- | while read b; do mkdir -p "dist/`dirname $b`" && cp dist-ts/$b dist/$b ; done