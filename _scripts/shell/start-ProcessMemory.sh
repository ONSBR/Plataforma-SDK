#!/bin/bash

if [ ! -f "../../../logs/memory.out" ]; then
    mkdir ../../../logs
    touch ../../../logs/memory.out
fi

forever -o ../../../logs/memory.out start ../../../Plataforma-ProcessMemory/index.js