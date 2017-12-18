#!/bin/bash
if [ ! -d "logs/presentation/" ]; then
    mkdir logs/presentation
fi

pm2 start ../../../Plataforma-PresentationApp/server/app.js --name presentation --watch ../../../Plataforma-PresentationApp/server/ --log ./logs/presentation/presentation.log