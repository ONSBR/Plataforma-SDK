IF NOT EXIST .\core.bd (
    node ..\..\services\_init\_initCoreStorage.js
)

CALL start-Eventmanager.bat
CALL start-PresentationApp.bat
CALL start-Executor.bat
CALL start-ProcessMemory.bat
CALL start-Router.bat

cd ..\..\..\
cd .\Plataforma-PresentationApp\crud-contas\
ng server
