
START /B CMD /C CALL start-Eventmanager.bat
START /B CMD /C CALL start-PresentationApp.bat

cd ..\..\..\
cd .\Plataforma-PresentationApp\crud-contas\
ng server -o