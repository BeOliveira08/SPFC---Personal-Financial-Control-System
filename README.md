Sistema Pessoal de Controle Financeiro - SPCF (CLI)

[Node.js] (https://img.shields.io/badge/Node.js-16+-green)
[License] (https://img.shields.io/badge/License-MIT-blue)

Um aplicativo de terminal para gerenciar finanças pessoais com categorizacao, relatorios e persistencia de dados.

COMEÇANDO

PRE-REQUISITOS
- Node.js v16 ou superior
- npm (vem com o Node.js)

INSTALACAO RAPIDA

1. Baixe os arquivos:
   - finance-manager.js
   - install.bat (Windows)
   - Opcional: package.json

2. Execute o instalador:
   # Windows (duplo-clique ou):
   install.bat

   # Linux/macOS (execute no terminal):
   npm install chalk@4 inquirer@8 console-table-printer@2

3. Inicie a aplicacao:
   node finance-manager.js

FUNCIONALIDADES
- Adicionar receitas e despesas
- Categorizacao automatica
- Registro por data
- Relatorios completos
- Persistencia em JSON
- Interface colorida

ESTRUTURA DE ARQUIVOS
finance-manager/
├── finance-manager.js      # Codigo principal
├── finance-data.json      # Banco de dados (gerado automaticamente)
├── install.bat            # Instalador para Windows
└── package.json           # Configuracao do projeto (opcional)

DEPENDENCIAS
Pacote               Versao  Uso                     
chalk               4       Cores no terminal       
inquirer            8       Menus interativos       
console-table-printer 2    Exibicao de tabelas     

COMO USAR

1. Menu Principal:
   [1] Adicionar Transacao
   [2] Ver Relatorio
   [3] Ver Saldo
   [4] Sair

2. Adicionando uma transacao:
   - Escolha entre Receita/Despesa
   - Insira valor e categoria
   - Adicione descricao (opcional)

3. Gerando relatorios:
   - Visualize por periodo
   - Filtre por categoria
   - Veja saldo atual

ATUALIZACAO
Para atualizar as dependencias:
npm update chalk inquirer console-table-printer

CONTRIBUICAO
1. Faca um fork do projeto
2. Crie uma branch (git checkout -b feature/nova-feature)
3. Commit suas mudancas (git commit -m 'Adiciona nova feature')
4. Push para a branch (git push origin feature/nova-feature)
5. Abra um Pull Request

LICENCA
Distribuido sob a licenca MIT.

CONTATO
Desenvolvido por Bernardo Oliveira - [bchermont@outlook.com] - https://bernieoliveira.neocities.org

Dica: Para uma experiencia completa, execute no Terminal do VS Code ou em um terminal com suporte a cores!
