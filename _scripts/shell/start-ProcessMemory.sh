#!/bin/bash
if [ ! -d "logs/memory/" ]; then
    mkdir logs/memory
fi

pm2 start ../../../Plataforma-ProcessMemory/index.js --name memory --watch ../../../Plataforma-ProcessMemory/ --log logs/memory/memory.log