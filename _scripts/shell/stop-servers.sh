#!/bin/bash
pm2 stop all
pm2 delete all

cd ../../../Plataforma-PresentationApp/crud-contas/
npm stop