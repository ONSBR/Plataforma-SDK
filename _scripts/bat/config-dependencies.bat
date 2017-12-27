echo create link from core
cd ../../../Plataforma-core/
npm link

echo create link from eventmanager
cd ../Plataforma-EventManager/
npm link

echo create link from executor
cd ../Plataforma-Executor/js/
npm link

echo create link from presentationapp
cd ../../Plataforma-PresentationApp/server
npm link

echo create link from processapp
cd ../../Plataforma-ProcessApp/
npm link

echo create link from sdk
cd ../Plataforma-SDK/
npm link

echo import link to eventmanager
cd ../Plataforma-EventManager/
npm link plataforma-core
npm link plataforma-processmemory
npm link plataforma-sdk

echo import link to executor
cd ../../Plataforma-Executor/js
npm link plataforma-core
npm link plataforma-sdk

echo import link to presentation
cd ../../../Plataforma-PresentationApp/
npm link plataforma-core
npm link plataforma-core
