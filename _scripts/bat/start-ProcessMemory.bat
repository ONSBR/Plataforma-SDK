IF NOT EXIST ..\..\..\logs\memory.out (
    mkdir ..\..\..\logs
    copy nul ..\..\..\logs\memory.out
)

forever -o ..\..\..\logs\memory.out -e ..\..\..\logs\memory.out start ..\..\..\Plataforma-ProcessMemory\index.js