#!/bin/bash
chmod +x *.sh

if [[ ! -f "core.bd" ]]; then
    "echo Init Core Storage"
    node ../../services/_init/_initCoreStorage.js
fi

./start-EventManager.sh &
./start-PresentationApp.sh &
./start-Executor.sh &
./start-ProcessMemory.sh &

cd ../../../Plataforma-PresentationApp/crud-contas/
ng server -o
