#!/bin/bash
if [ ! -d "logs/event/" ]; then
    mkdir logs/event
fi

pm2 start ../../../Plataforma-EventManager/app.js --name event --watch ../../../Plataforma-EventManager/ --log logs/event/event.log