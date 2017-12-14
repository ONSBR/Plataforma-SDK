#!/bin/bash
if [ ! -f "../../../logs/event.out" ]; then
    touch ../../../logs/event.out
fi

forever -o ../../../logs/event.out -e ../../../logs/event.out start ../../../Plataforma-EventManager/app.js