#!/bin/bash

echo "Deleting build directory from gitignore"
sed --expression '/build/ d' --in-place='~' ".gitignore"
