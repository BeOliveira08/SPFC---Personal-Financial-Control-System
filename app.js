const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const { Table } = require('console-table-printer');;

// Configurações
const DATA_FILE = path.join(__dirname, 'finance-data.json');
const CATEGORIES = [
  'Alimentação', 'Transporte', 'Moradia', 'Lazer', 'Saúde', 'Educação', 'Outros'
];

// Funções de persistência
function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    }
    return { transactions: [], balance: 0 };
  } catch (error) {
    console.error(chalk.red('Erro ao carregar dados:'), error.message);
    return { transactions: [], balance: 0 };
  }
}

function saveData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    console.log(chalk.green('✓ Dados salvos com sucesso!'));
  } catch (error) {
    console.error(chalk.red('Erro ao salvar dados:'), error.message);
  }
}

// Função para adicionar transação
async function addTransaction(data) {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: 'Tipo de transação:',
      choices: ['Receita', 'Despesa']
    },
    {
      type: 'input',
      name: 'amount',
      message: 'Valor:',
      validate: input => {
        const value = parseFloat(input);
        if (isNaN(value) || value <= 0) return 'Digite um valor numérico positivo';
        return true;
      }
    },
    {
      type: 'list',
      name: 'category',
      message: 'Categoria:',
      choices: CATEGORIES
    },
    {
      type: 'input',
      name: 'description',
      message: 'Descrição (opcional):'
    }
  ]);

  const transaction = {
    id: Date.now(),
    date: new Date().toISOString().split('T')[0],
    type: answers.type,
    amount: parseFloat(answers.amount),
    category: answers.category,
    description: answers.description || ''
  };

  data.transactions.push(transaction);
  data.balance += transaction.type === 'Receita' ? transaction.amount : -transaction.amount;
  saveData(data);
}

// Função para gerar relatório
function generateReport(data) {
  console.log(chalk.bold.blue('\n📊 Relatório Financeiro'));

  // Saldo Atual
  console.log(
    chalk.bold(
      `Saldo: ${
        data.balance >= 0
          ? chalk.green(`R$ ${data.balance.toFixed(2)}`)
          : chalk.red(`R$ ${data.balance.toFixed(2)}`)
      }`
    )
  );

  // Tabela de Transações
  const table = new Table({
    columns: [
      { name: 'date', title: 'Data', alignment: 'left' },
      { name: 'type', title: 'Tipo' },
      { name: 'category', title: 'Categoria' },
      { name: 'description', title: 'Descrição' },
      { name: 'amount', title: 'Valor', alignment: 'right' }
    ]
  });

  data.transactions.forEach(t => {
    table.addRow({
      date: t.date,
      type: t.type === 'Receita' ? chalk.green(t.type) : chalk.red(t.type),
      category: t.category,
      description: t.description || '-',
      amount:
        t.type === 'Receita'
          ? chalk.green(`+R$ ${t.amount.toFixed(2)}`)
          : chalk.red(`-R$ ${t.amount.toFixed(2)}`)
    });
  });

  table.printTable();

  // Resumo por Categoria
  console.log(chalk.bold.blue('\n📌 Resumo por Categoria:'));
  CATEGORIES.forEach(cat => {
    const total = data.transactions
      .filter(t => t.category === cat && t.type === 'Despesa')
      .reduce((sum, t) => sum + t.amount, 0);
    console.log(`• ${cat}: ${chalk.red(`R$ ${total.toFixed(2)}`)}`);
  });
}

// Menu principal
async function main() {
  const data = loadData();

  while (true) {
    const { action } = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: 'Menu Principal:',
      choices: [
        'Adicionar Transação',
        'Ver Relatório',
        'Ver Saldo',
        'Sair'
      ]
    });

    switch (action) {
      case 'Adicionar Transação':
        await addTransaction(data);
        break;
      case 'Ver Relatório':
        generateReport(data);
        break;
      case 'Ver Saldo':
        console.log(
          chalk.bold(
            `\nSaldo Atual: ${
              data.balance >= 0
                ? chalk.green(`R$ ${data.balance.toFixed(2)}`)
                : chalk.red(`R$ ${data.balance.toFixed(2)}`)
            }`
          )
        );
        break;
      case 'Sair':
        console.log(chalk.yellow('\nAté logo! 👋'));
        process.exit(0);
    }
  }
}

main();