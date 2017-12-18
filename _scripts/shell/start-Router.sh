#!/bin/bash
if [ ! -d "logs/router/" ]; then
    mkdir logs/router
fi

pm2 start ../../../Plataforma-Router/app.js --name router --watch ../../../Plataforma-Router/ --log logs/router/router.log