IF NOT EXIST .\logs\memory\ (
    mkdir .\logs\memory\
)

pm2 start ..\..\..\Plataforma-ProcessMemory\index.js --name memory --watch ..\..\..\Plataforma-ProcessMemory\ --log .\logs\memory\memory.log