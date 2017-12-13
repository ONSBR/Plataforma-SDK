#!/bin/bash
chmod +x *.sh
./start-EventManager.sh
./start-PresentationApp.sh

cd ../../../Plataforma-PresentationApp/crud-contas/
ng server -o
