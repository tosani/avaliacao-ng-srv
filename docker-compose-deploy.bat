@echo off
echo -------------------------------------------------------
echo Preparando o ambiente
echo -------------------------------------------------------

call docker-compose -f docker-compose.yml -p avaliacao build 
call docker-compose -f docker-compose.yml -p avaliacao up -d

start "" http://localhost
start "" http://localhost:8080/swagger-ui.html


echo -------------------------------------------------------
echo Pronto
echo .: Paulo Tosani :.
echo -------------------------------------------------------
pause