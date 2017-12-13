IF NOT EXIST ..\..\..\logs\event.out (
    mkdir ..\..\..\logs
    copy nul ..\..\..\logs\event.out
)

forever -o ..\..\..\logs\event.out start ..\..\..\Plataforma-EventManager\app.js