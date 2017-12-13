#!/bin/bash
if [ ! -f "../../../logs/event.out" ]; then
    mkdir ../../../logs
    touch ../../../logs/event.out
fi

forever -o ../../../logs/event.out start ../../../Plataforma-EventManager/app.js