#!/usr/bin/env sh

cd preprocessor
cat | lua main.lua $@
