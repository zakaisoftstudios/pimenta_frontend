#!/bin/sh
echo "Starting Frontend"
echo "FRONTEND_HOST=$FRONTEND_HOST"
for i in $(grep -rli c2su-api-dev /usr/share/nginx/html/*);do
    sed -i "s/c2su-api-dev.g.pimenta.cloud/$FRONTEND_HOST/g" $i
done
grep -rli c2su-api-dev /usr/share/nginx/html/*
nginx -g 'daemon off;'