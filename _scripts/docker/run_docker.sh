#!/bin/bash
echo "Cria base do core"
node ../../services/_init/_initCoreStorage.js
echo "Base do core criada"
echo "Domain app Cli"
cd ../../../Plataforma-Domain/Platform.Cli/
npm install 
node atom.js
echo "Domain app criada"
echo "docker-compose up"
cd ../../Plataforma-SDK/_scripts/docker/
sudo docker-compose up