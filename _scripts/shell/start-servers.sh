#!/bin/bash
chmod +x *.sh
./start-EventManager.sh &
./start-PresentationApp.sh &
./start-Executor.sh &
./start-ProcessMemory.sh &

cd ../../../Plataforma-PresentationApp/crud-contas/
ng server -o
