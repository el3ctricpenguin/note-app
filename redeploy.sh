#!/bin/bash
pm2 stop note-app
git pull
npm run build
pm2 start note-app