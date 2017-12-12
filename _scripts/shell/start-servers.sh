#!/bin/bash
chmod +x *.sh
./start-Eventmanager.sh
./start-PresentationApp.sh

cd ../../../Plataforma-PresentationApp/crud-contas/
ng server -o