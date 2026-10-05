#!/bin/bash

for file in ./*.md; do
    [ -f "$file" ] || continue
    printf '%s\n' 'This is a new line.' >> "$file"
done
