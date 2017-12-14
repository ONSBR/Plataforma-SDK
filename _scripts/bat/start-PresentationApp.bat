IF NOT EXIST .\logs\presentation\ (
    mkdir .\logs\presentation\
)

pm2 start ..\..\..\Plataforma-PresentationApp\server\app.js --name presentation --watch ..\..\..\Plataforma-PresentationApp\server\ --log .\logs\presentation\presentation.log