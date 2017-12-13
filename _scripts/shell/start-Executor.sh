#!/bin/bash
if [ ! -f "../../../logs/executor.out" ]; then
    mkdir ../../../logs
    touch ../../../logs/executor.out
fi

forever -o ../../../logs/executor.out start ../../../Plataforma-Executor/js/app.js