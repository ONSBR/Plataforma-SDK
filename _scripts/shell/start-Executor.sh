#!/bin/bash
if [ ! -d "logs/executor/" ]; then
    mkdir logs/executor
fi

pm2 start ../../../Plataforma-Executor/js/app.js --name executor --watch ../../../Plataforma-Executor/js/ --log logs/executor/executor.log