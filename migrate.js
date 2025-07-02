#!/usr/bin/env node

const { execSync } = require('child_process');
const readline = require('readline');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const runCommand = (command) => {
  console.log(`Running: ${command}`);
  try {
    const output = execSync(command, { encoding: 'utf8' });
    console.log(output);
    return true;
  } catch (error) {
    console.error(`Command failed: ${error.message}`);
    if (error.stdout) console.error(error.stdout);
    if (error.stderr) console.error(error.stderr);
    return false;
  }
};

const confirm = (message) => {
  return new Promise((resolve) => {
    rl.question(`${message} (y/N): `, (answer) => {
      resolve(answer.toLowerCase() === 'y');
    });
  });
};

const showHelp = () => {
  console.log(`
Migration Commands:
  migrate       - Run all pending migrations
  status        - Check migration status
  rollback      - Undo the most recent migration
  rollback-all  - Undo all migrations (dangerous!)
  help          - Show this help message

Example:
  node migrate.js migrate
`);
};

const main = async () => {
  const command = process.argv[2];
  const nodeEnv = process.env.NODE_ENV || 'development';
  
  console.log(`Environment: ${nodeEnv}`);

  try {
    switch (command) {
      case 'migrate':
        console.log('Running pending migrations...');
        runCommand(`npx sequelize-cli db:migrate --env ${nodeEnv}`);
        break;

      case 'status':
        console.log('Checking migration status...');
        runCommand(`npx sequelize-cli db:migrate:status --env ${nodeEnv}`);
        break;

      case 'rollback':
        const confirmRollback = await confirm('This will undo the most recent migration. Are you sure?');
        if (confirmRollback) {
          runCommand(`npx sequelize-cli db:migrate:undo --env ${nodeEnv}`);
        } else {
          console.log('Rollback cancelled.');
        }
        break;

      case 'rollback-all':
        const confirmRollbackAll = await confirm('WARNING: This will undo ALL migrations. Are you absolutely sure?');
        if (confirmRollbackAll) {
          const confirmAgain = await confirm('This action cannot be undone easily. Type "y" again to confirm:');
          if (confirmAgain) {
            runCommand(`npx sequelize-cli db:migrate:undo:all --env ${nodeEnv}`);
          } else {
            console.log('Rollback cancelled.');
          }
        } else {
          console.log('Rollback cancelled.');
        }
        break;

      case 'help':
      default:
        showHelp();
        break;
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    rl.close();
  }
};

main();
