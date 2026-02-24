@echo off
set "ENV_FILE=.env"
set "DB_HOST=sql10.freesqldatabase.com"
set "DB_PORT=3306"
set "DB_USER=sql10806891"
set "DB_PASS=vpg11Nb4LH"
set "DB_NAME=sql10806891"

echo Iniciando atualizacao do sistema...

echo Executando o script SQL de bootstrap (bootstrap.cloud.sql)...
mysql -h %DB_HOST% -u %DB_USER% -p%DB_PASS% %DB_NAME% < bootstrap.cloud.sql

echo Configuracao do banco de dados concluida!

echo Criando o arquivo %ENV_FILE% com as credenciais do banco de dados...

(
echo DB_CONNECTION=mysql
echo DB_HOST=%DB_HOST%
echo DB_PORT=%DB_PORT%
echo DB_NAME=%DB_NAME%
echo DB_USERNAME=%DB_USER%
echo DB_PASSWORD=%DB_PASS%
) > %ENV_FILE%

echo Arquivo %ENV_FILE% criado com sucesso no diretorio atual.

echo Setup concluido!
