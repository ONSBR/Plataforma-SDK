IF NOT EXIST ..\..\..\logs\presentation.out (
    mkdir ..\..\..\logs
    copy nul ..\..\..\logs\presentation.out
)

forever -o ..\..\..\logs\presentation.out -e ..\..\..\logs\presentation.out start ..\..\..\Plataforma-PresentationApp\server\app.js