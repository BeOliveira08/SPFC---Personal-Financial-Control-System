@echo off
REM Instalador automático para o Gerenciador Financeiro
echo Instalando dependências...

REM Verifica se o Node.js está instalado
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo Erro: Node.js não está instalado!
    echo Baixe em: https://nodejs.org
    pause
    exit /b
)

REM Instala as dependências com versões específicas
npm install chalk@4
npm install inquirer@8
npm install console-table-printer@2

REM Verifica se a instalação foi bem-sucedida
if %errorlevel% equ 0 (
    echo Dependências instaladas com sucesso!
    echo Iniciando a aplicação...
    timeout /t 2 >nul
    node finance-manager.js
) else (
    echo Falha na instalação das dependências.
    pause
)