IF NOT EXIST .\logs\event\ (
    mkdir .\logs\event\
)

pm2 start ..\..\..\Plataforma-EventManager\app.js --name event --watch ..\..\..\Plataforma-EventManager\ --log .\logs\event\event.log
