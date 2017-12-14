IF NOT EXIST .\logs\executor\ (
    mkdir .\logs\executor\
)

pm2 start ..\..\..\Plataforma-Executor\js\app.js --name executor --watch ..\..\..\Plataforma-Executor\js\ --log .\logs\executor\executor.log