#!/usr/bin/env bash

# Test if there are currently untracked files and notify the user they exist (do not move things around for the user)
FILES_TO_CLEAN=$(git clean -n)
if [ ! -z "$FILES_TO_CLEAN" ]
then
    echo "Please note that a byproduct is deleting ALL untracked files from your folder, these files will be deleted:"
    echo "${FILES_TO_CLEAN}"
    select yn in "Yes" "No"; do
        case $yn in
            Yes ) break;;
            No ) exit;;
        esac
    done
fi

PACKAGE_JSON=$(git diff package.json)
if [ ! -z "$PACKAGE_JSON" ]
then
    echo "Your changes to pacakge.json will be erased, continue?"
    select yn in "Yes" "No"; do
        case $yn in
            Yes ) break;;
            No ) exit;;
        esac
    done
fi

# Delete previous tar
rm -f ~/Downloads/react-native-ui-lib.tgz
# Build javascript files
yarn build
# Package into a tar
yarn pack
# Rename tar and move to Downloads
mv package.tgz ~/Downloads/react-native-ui-lib.tgz
# Clean ALL untracked files
git checkout package.json
cd ../../
git clean -fd