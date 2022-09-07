#!/usr/bin/env bash

# Test if there are currently untracked files and notify the user they exist (do not move things around for the user)
FILES_TO_CLEAN=$(git clean -n)
if [ ! -z "$FILES_TO_CLEAN" ]
then
    echo "Please note that a byproduct is deleting ALL untracked files from your folder:"
    echo "${FILES_TO_CLEAN}"
    select yn in "Yes" "No"; do
        case $yn in
            Yes ) break;;
            No ) exit;;
        esac
    done
fi

# Build javascript files
npm run build
# Package into a tar
npm pack
# Clean ALL untracked files
git clean -f
