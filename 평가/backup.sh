#!/bin/bash
year=$(date +%Y)
month=$(date +%m)
day=$(date +%d)
hour=$(date +%H)
mkdir -p /backup/$year/$month/$day
fname="backup_$year.$month.$day.$hour.tar.xz"
tar cfJ /backup/$year/$month/$day/$fname /home
