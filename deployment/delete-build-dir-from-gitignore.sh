#!/bin/bash

echo "Deleting build directory from gitignore"
cat .gitignore | grep -v "build" > .gitignore.without.build.tmp
cat .gitignore.without.build.tmp > .gitignore
rm .gitignore.without.build.tmp