IF NOT EXIST ..\..\..\logs\executor.out (
    mkdir ..\..\..\logs
    copy nul ..\..\..\logs\executor.out
)

forever -o ..\..\..\logs\executor.out start ..\..\..\Plataforma-Executor\js\app.js