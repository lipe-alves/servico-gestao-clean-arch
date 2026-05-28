const { exec } = require('node:child_process');

setup();

async function setup() {
  console.log('Iniciando atualizacao do sistema...');

  console.log('Executando o script SQL de bootstrap (bootstrap.sql)...');
  await instalarBancoDeDados();
  console.log('Configuracao do banco de dados concluida!');

  await instalarDependencias();
  console.log('Dependencias instaladas com sucesso!');

  console.log('Build do projeto...');
  await buildSistema();
  console.log('Build concluido!');

  console.log('Setup concluido!');
}

function instalarBancoDeDados() {
  return new Promise((resolve, reject) => {
    exec(
      `mysql -h ${process.env.DB_HOST} -u ${process.env.DB_USERNAME} -p${process.env.DB_PASSWORD} < dumps/bootstrap.sql`,
      (error, stdout, stderr) => {
        if (error) {
          reject(`Erro ao executar o script SQL: ${error.message}`);
          return;
        }
        if (stderr) {
          reject(`Erro no script SQL: ${stderr}`);
          return;
        }
        resolve('Configuracao do banco de dados concluida!');
      }
    );
  });
}

function instalarDependencias() {
  return new Promise((resolve, reject) => {
    exec(
      'npm install',
      (error, stdout, stderr) => {
        if (error) {
          reject(`Erro ao instalar dependencias: ${error.message}`);
          return;
        }
        if (stderr) {
          reject(`Erro na instalacao de dependencias: ${stderr}`);
          return;
        }
        resolve('Dependencias instaladas com sucesso!');
      }
    );
  });
}

function buildSistema() {
  return new Promise((resolve, reject) => {
    exec(
      'npm run build',
      (error, stdout, stderr) => {
        if (error) {
          reject(`Erro ao buildar o sistema: ${error.message}`);
          return;
        }
        if (stderr) {
          reject(`Erro no build do sistema: ${stderr}`);
          return;
        }
        resolve('Build do sistema concluido!');
      }
    );
  });
}
