#!/bin/bash

total=$1
day=$2

day_dir=$(printf 'day%02d' "$day")

mkdir -p "$day_dir"

for ((i = 1; i <= total; i++)); do
    task_dir=$(printf 'task%02d' "$i")
    mkdir -p "$day_dir/$task_dir"
done
