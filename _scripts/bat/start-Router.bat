IF NOT EXIST .\logs\router\ (
    mkdir .\logs\router\
)

pm2 start ..\..\..\Plataforma-Router\app.js --name router --watch ..\..\..\Plataforma-Router\ --log .\logs\router\router.log