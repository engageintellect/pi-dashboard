#!/usr/bin/env bash

cd /home/pi/pi-dashboard/client
git pull
pnpm run build
pm2 stop 0
pm2 delete 0
pm2 start npm --name "pi-dashboard"
pm2 save