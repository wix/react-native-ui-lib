#!/bin/bash -e
# copy all js files to dist-ts, prepare for transformation
# find ./src -iname "*.js" -type f | cut -d/ -f3- | while read b; do mkdir -p "dist-ts/`dirname $b`" && cp src/$b dist-ts/$b ; done
find ./src -type f | cut -d/ -f3- | while read b; do mkdir -p "dist-ts/`dirname $b`" && cp src/$b dist-ts/$b ; done
# transform only js files inside /components/
# find ./dist-ts -iname "*.js"  -ipath "*/components/*" -type f | while read file; do react-js-to-ts $file; done
find ./dist-ts -iname "*.js" -type f | while read file; do react-js-to-ts $file; done