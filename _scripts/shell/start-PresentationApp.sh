#!/bin/bash
if [ ! -f "../../../logs/presentation.out" ]; then
    mkdir ../../../logs
    touch ../../../logs/presentation.out
fi

forever forever -o ../../../logs/presentation.out start ../../../Plataforma-PresentationApp/server/app.js